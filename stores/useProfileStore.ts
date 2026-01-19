import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Chef {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProfileState {
  chef: Chef | null;

  setChef: (chef: Chef) => void;
  updateChef: (data: Partial<Chef>) => void;
  logout: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      chef: null,

      setChef: (chef) => {
        set({ chef });
      },

      updateChef: (data) => {
        const currentChef = get().chef;
        if (!currentChef) return;

        set({
          chef: {
            ...currentChef,
            ...data,
          },
        });
      },

      logout: () => {
        set({ chef: null });
      },
    }),
    {
      name: "chef_profile",
    },
  ),
);
