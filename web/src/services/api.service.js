import axios from "axios";

const http = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
});

http.interceptors.request.use(function (config) {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response.status === 401 &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      localStorage.removeItem("token");
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export function createUser(data) {
  return http.post('/users', data);
};

export function updateUser(id, data) {
  return http.patch(`/users/${id}`, data);
};

export function login(data) {
  return http.post('/login', data).then((response) => {
      localStorage.setItem('token', response.data.accessToken);
      return response;
    });
};

export function getProfile() {
  return http.get('/profile');
};

export function like(productId) {
  const data = { product: productId }
  return http.post('/like', data);
}

export function createProduct(data) {
  return http.post('/products', data);
};

export function getProducts(query) {
  return http.get('/products', { params: query });
};

export function getProductDetail(id) {
  return http.get(`/products/${id}`);
};

export function updateProduct(id, data) {
  return http.patch(`/products/${id}`, data);
};

export function logout() {
  localStorage.removeItem('token');
};

export function createRating(userId, data) {
  return http.post(`/users/${userId}/ratings`, data);
};

export function getRatings(userId) {
  return http.get(`/users/${userId}/ratings`);
};

export function createRequest(data) {
  return http.post('/requests', data);
};

export function getRequests(userId) {
  return http.get(`/users/${userId}/requests`);
}

export function updateRequest(id, data) {
  return http.patch(`/requests/${id}`, data);
};