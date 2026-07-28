import api from "./api";

export const signup = async (data) => {
  const response = await api.post("/users/signup", data);
  return response.data;
};

export const signin = async (data) => {
  const response = await api.post("/users/signin", data);
  return response.data;
};

export const signout = async () => {
  const response = await api.post("/users/signout");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/users/current");
  return response.data;
};
