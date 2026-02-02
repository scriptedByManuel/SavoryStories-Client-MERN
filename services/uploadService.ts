import { apiClient } from "@/lib/axios"

const uploadService = {
    uploadImage: async (formData: FormData) => {
        try {
            const response = await apiClient.post('/upload', formData)
            return response.data
        } catch (error) {
            throw error
        }
    }
}

export default uploadService