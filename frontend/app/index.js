import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';

export default function UploadScreen() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  console.log('📍 Current image state:', image); // Debug

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Denied', 'App needs access to your media library.');
      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    console.log('📸 Image Picker Result:', res); // Debug

    if (!res.canceled && res.assets && res.assets.length > 0) {
      const uri = res.assets[0].uri;
      console.log('✅ Selected URI:', uri);
      setImage(uri);
    } else {
      Alert.alert('No image selected or cancelled.');
    }
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert('No image selected to upload.');
      return;
    }

    const fixedUri = Platform.OS === 'android' ? image : image.replace('file://', '');

    const formData = new FormData();
    formData.append('file', {
      uri: fixedUri,
      name: 'upload.jpg',
      type: 'image/jpeg',
    });

    console.log('📤 Uploading from:', fixedUri); // Debug

    try {
      const response = await axios.post('http://192.168.43.66:8000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('✅ Response:', response.data);
      setResult(response.data);

      Alert.alert(
        'Prediction Result',
        `Type: ${response.data.type}\nSeverity: ${response.data.severity}\nRepair Priority: ${response.data.repair_priority}`
      );
    } catch (error) {
      console.error('❌ Upload failed:', error.message);
      Alert.alert('Upload failed', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Pick an image" onPress={pickImage} />

      {image && (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <Button title="Upload" onPress={uploadImage} />
        </>
      )}

      {result && (
        <View style={styles.result}>
          <Text style={styles.text}>Type: {result.type}</Text>
          <Text style={styles.text}>Severity: {result.severity}</Text>
          <Text style={styles.text}>Repair Priority: {result.repair_priority}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
    alignSelf: 'center',
    borderRadius: 8,
  },
  result: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#eef2f3',
    borderRadius: 10,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
  },
});



//npx expo install expo@53.0.12 expo-system-ui@~5.0.9 expo-web-browser@~14.2.0 react-native@0.79.4
//npx expo start
// http://192.168.43.66:8000/predict sriyamy moto hotspot
//ipconfig
//http://192.168.0.106:8081/docs homw wifi
