import { apiClient } from "@/lib/axios"

const uploadService = {
    uploadImage: async (path: string, formData: FormData) => {
        try {
            const response = await apiClient.post(path, formData)
            return response.data
        } catch (error) {
            throw error
        }
    }
}

export default uploadService