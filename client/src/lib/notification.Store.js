import axios from 'axios'
import { create } from 'zustand'

export const usenotificationstore = create((set) => ({
    number: 0,
    fetch: async () => {
      try {
        const res = await axios.get("/api/v1/user/notification");
        console.log(res.data.number);
        set({ number: res.data.number});
      } catch (error) {
        console.error("Error fetching notification:", error);
      }
    },
    decrease: () => {
      set((state) => ({ number: state.number - 1 }));
    },
    reset: () => {
      set({ number: 0 });
    },
  }));
  