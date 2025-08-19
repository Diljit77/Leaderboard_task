// store/useUserstore.ts
import { create } from 'zustand';
import { getLeaderboard, addUser, claimPoints, getUserHistory } from '../utils/Api';
import type { User, LeaderboardResponse } from '../types';

interface UserStore {
  users: User[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    hasNext: boolean;
    hasPrev: boolean;
    limit: number;
  };
  loading: boolean;
  fetchUsers: (page?: number, limit?: number) => Promise<void>;
  addUser: (name: string) => Promise<void>;
  claimPoints: (id: string) => Promise<any>;
  getUserHistory: (id: string) => Promise<any[]>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    hasNext: false,
    hasPrev: false,
    limit: 5,
  },
  loading: false,
  fetchUsers: async (page = 1, limit = 5) => {
    set({ loading: true });
    try {
      const response: LeaderboardResponse = await getLeaderboard(page, limit);
      set({
        users: response.users,
        pagination: {
          currentPage: response.pagination.currentPage,
          totalPages: response.pagination.totalPages,
          totalUsers: response.pagination.totalUsers,
          hasNext: response.pagination.hasNext,
          hasPrev: response.pagination.hasPrev,
          limit: limit
        }
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      set({ loading: false });
    }
  },
  addUser: async (name: string) => {
    try {
      await addUser({ name });
      get().fetchUsers(get().pagination.currentPage, get().pagination.limit);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  },
  claimPoints: async (id: string) => {
    try {
      const response = await claimPoints(id);
      get().fetchUsers(get().pagination.currentPage, get().pagination.limit);
      return response;
    } catch (error) {
      console.error('Error claiming points:', error);
      throw error;
    }
  },
  getUserHistory: async (id: string) => {
    try {
      const history = await getUserHistory(id);
      return history;
    } catch (error) {
      console.error('Error fetching user history:', error);
      throw error;
    }
  }
}));