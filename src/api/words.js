import api from "./api";

export const getOwnWords = () => {
  return api.get("/words/own");
};

export const getCategories = () => {
  return api.get("/words/categories");
};

export const addWordRequest = (word) => {
  return api.post("/words/create", word);
};

export const editWordRequest = (id, data) => {
  return api.patch(`/words/edit/${id}`, data);
};

export const deleteWordRequest = (id) => {
  return api.delete(`/words/delete/${id}`);
};
