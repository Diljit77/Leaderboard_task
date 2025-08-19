// utils/Api.ts - Updated API functions
import axios from "axios";
import type { ClaimResponse, User, LeaderboardResponse } from "../types";

const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL });

// Users
export const getLeaderboard = async (page = 1, limit = 10): Promise<LeaderboardResponse> => {
  const res = await API.get<LeaderboardResponse>(`/users/leaderboard?page=${page}&limit=${limit}`);
  return res.data;
};

export const addUser = async (data: { name: string }): Promise<User> => {
  const res = await API.post<User>("/users/add", data);
  return res.data;
};

export const claimPoints = async (id: string): Promise<ClaimResponse> => {
  const res = await API.post<ClaimResponse>(`/users/claim/${id}`);
  return res.data;
};

export const getUserHistory = async (id: string): Promise<any[]> => {
  const res = await API.get(`/users/history/${id}`);
  return res.data;
};
