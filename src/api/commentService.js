import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_COMMENT = import.meta.env.VITE_API_URL_COMMENT;

export const createComment = async (userData) => {
  console.log("userData", userData);
  try {
    const response = await axios.post(`${API_URL_COMMENT}/comment`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getComments = async () => {
  try {
    const response = await axios.get(`${API_URL_COMMENT}/comment`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await axios.delete(
      `${API_URL_COMMENT}/comment/${commentId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllComents = async () => {
  try {
    const response = await axios.get(`${API_URL_COMMENT}/`, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};
