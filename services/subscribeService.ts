import { apiClient } from "@/lib/axios";

type SubscribePayload = {
  email: string;
}

const subscribeService = {
  subscribe: async (payload: SubscribePayload) => {
    try {
      const response = await apiClient.post('/subscribe', payload);
      return response.data; 
    } catch (error) {
      throw error;
    }
  }
};

export default subscribeService;