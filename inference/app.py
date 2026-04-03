from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from PIL import Image
import torch
from transformers import ViTImageProcessor, ViTForImageClassification
import io

app = FastAPI()

# Updated image processor (instead of deprecated ViTFeatureExtractor)
extractor = ViTImageProcessor.from_pretrained("facebook/deit-small-patch16-224")

# Load model with custom number of labels
model = ViTForImageClassification.from_pretrained(
    "facebook/deit-small-patch16-224",
    num_labels=4,
    ignore_mismatched_sizes=True
)

# Load your fine-tuned model weights
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load and fix state_dict key mismatch
checkpoint = torch.load("best_vit_full_precision (1).pth", map_location=device)
new_checkpoint = {}

for k, v in checkpoint.items():
    if k == "classifier.1.weight":
        new_checkpoint["classifier.weight"] = v
    elif k == "classifier.1.bias":
        new_checkpoint["classifier.bias"] = v
    elif k.startswith("classifier."):
        continue  # skip other classifier layers (like classifier.0)
    else:
        new_checkpoint[k] = v

# Apply updated weights
model.load_state_dict(new_checkpoint)
model.to(device)
model.eval()

# Define class labels
class_labels = ['crack', 'patch', 'pothole', 'surface']

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")

        # Preprocess the image
        inputs = extractor(images=image, return_tensors="pt")
        inputs = {k: v.to(device) for k, v in inputs.items()}

        with torch.no_grad():
            outputs = model(**inputs)
            predicted_class = torch.argmax(outputs.logits, dim=1).item()

        label = class_labels[predicted_class]

        # Custom mappings
        severity_map = {
            "crack": "medium",
            "patch": "severe",
            "pothole": "severe",
            "surface": "minor"
        }

        repair_priority = {
            "crack": "low",
            "patch": "high",
            "pothole": "urgent",
            "surface": "low"
        }

        return JSONResponse({
            "type": label,
            "severity": severity_map[label],
            "repair_priority": repair_priority[label]
        })

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
    #uvicorn app:app --reload
    #Go to: http://127.0.0.1:8000/docs
    #uvicorn app:app --host 0.0.0.0 --port 8000 --reload



