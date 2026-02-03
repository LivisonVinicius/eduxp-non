import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

api.interceptors.request.use((config) => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    const user = JSON.parse(storedUser);

    config.headers["x-user-id"] = user.id;
    config.headers["x-user-role"] = user.role;
  }

  return config;
});
