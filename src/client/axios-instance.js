import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/' // 'https://windows-project.herokuapp.com/'
});

export default instance;
