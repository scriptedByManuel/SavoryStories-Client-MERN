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
    changePassword: () => {},
    getProfileInfo: () => {},
}

export default profileService 