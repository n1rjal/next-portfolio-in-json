import { ProfileData, getJsonData } from "@/utils/getJsonData";
import { create } from "zustand";

export interface ProfileStoreInterface {
  host: string | null;
  data: ProfileData | null;
  setHost: (host: string) => void;
  setData: (host: string) => Promise<void>;
}

export const useProfileStore = create<ProfileStoreInterface>((set) => ({
  host: null,
  data: null,
  setHost: (host: string) => set({ host }),
  setData: async (host: string) => {
    const data = await getJsonData(host);
    set({
      data,
    });
  },
}));
