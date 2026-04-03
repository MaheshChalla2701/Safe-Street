// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://localhost:5000/api', //  Change to your backend URL  // ✅ Make sure this matches your Express backend base UR
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default instance;


import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',  // your Express base URL
});

export default instance;














// // Login.js or a service file
// import api from '../services/api';

// const login = async (credentials) => {
//   const response = await api.post('/auth/login', credentials);
//   return response.data;
// };
