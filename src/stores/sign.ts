import { UserProfile } from "@/interfaces/User";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SignStore {
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
}

export const useSignStore = create<SignStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    { name: "sign" }
  )
);