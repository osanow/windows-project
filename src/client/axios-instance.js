import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://windows-project.herokuapp.com/' // 'http://localhost:8080/' // 
});

export default instance;
