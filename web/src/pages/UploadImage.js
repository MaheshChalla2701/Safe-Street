// import React, { useState } from 'react';
// import axios from 'axios';

// function UploadImage() {
//   const [file, setFile] = useState(null);

//   const handleUpload = () => {
//     navigator.geolocation.getCurrentPosition(async (position) => {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("latitude", position.coords.latitude);
//       formData.append("longitude", position.coords.longitude);

//       const response = await axios.post("http://localhost:5000/api/report", formData);
//       alert("Report submitted! Check Dashboard.");
//     });
//   };

//   return (
//     <div>
//       <h2>Upload Road Image</h2>
//       <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//       <button onClick={handleUpload}>Submit</button>
//     </div>
//   );
// }

// export default UploadImage;


import React, { useState } from 'react';
import axios from 'axios';

function UploadImage() {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("latitude", position.coords.latitude);
      formData.append("longitude", position.coords.longitude);

      const response = await axios.post("http://localhost:5000/api/report", formData);
      alert("Report submitted! Check Dashboard.");
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📷 Upload Road Image</h2>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.input}
        />
        <button onClick={handleUpload} style={styles.button}>
          🚀 Submit
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    background: 'linear-gradient(to right, #30cfd0, #330867)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffffcc',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    fontFamily: 'Montserrat, sans-serif',
    color: '#222',
  },
  input: {
    marginBottom: '20px',
    fontSize: '16px',
    padding: '8px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#0077ff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default UploadImage;

