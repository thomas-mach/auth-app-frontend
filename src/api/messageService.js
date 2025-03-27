import axios from "axios";

const API_URL_MESSAGES = import.meta.env.VITE_API_URL_MESSAGES;

export const getMessages = async () => {
  try {
    const response = await axios.get(
      `${API_URL_MESSAGES}/`,

      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
