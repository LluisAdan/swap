import axios from "axios";

let accessToken = "";

const http = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
});

export function storeAccessToken(token) {
  accessToken = token;
}

export function createUser(data) {
  return http.post('/users', data);
};

export function login(data) {
  return http.post('/login', data);
};

export function getProducts() {
  return http.get('/products');
};