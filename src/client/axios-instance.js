import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://windows-project.herokuapp.com/',
  headers: {
    authorization: localStorage.getItem('token')
  }
});

export default instance;
