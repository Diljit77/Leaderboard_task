// types/index.ts - Updated types
export interface User {
  _id: string;
  name: string;
  totalPoints: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClaimResponse {
  user: User;
  points: number;
}

export interface LeaderboardResponse {
  users: User[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    hasNext: boolean;
    hasPrev: boolean;
    limit: number;   // 👈 add this
  };
}


export interface HistoryItem {
  _id: string;
  userId: string;
  points: number;
  createdAt: string;
  updatedAt: string;
}