import { apiClient } from "@/lib/axios"

const profileService = {
    changeNameAndBio: async (payload: {name: string, bio: string}) => {
        try {
            const response = await apiClient.patch('/profile', payload)
            return response.data
        } catch (error) {
            throw error
        }
    },
    changePassword: async (payload: {currentPassword: string, newPassword: string}) => {
        try {
            const response = await apiClient.patch('/profile/password', payload)
            return response.data
        } catch (error) {
            throw error
        }
    },
    deleteAccount: async () => {
        try {
            const response = await apiClient.delete('/profile/delete-account')
            return response.data
        } catch (error) {
            throw error
        }
    }
}

export default profileService 