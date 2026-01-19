import { apiClient } from "@/lib/axios";
import { LoginFormValues, SignupFormValues } from "@/types/authType";

const authService = {
  register: async (payload: SignupFormValues) => {
    try {
      const response = await apiClient.post("/auth/register", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  login: async (payload: LoginFormValues) => {
    try {
      const response = await apiClient.post("/auth/login", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      await apiClient.get("/auth/logout");
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
