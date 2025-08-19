import { Trophy, Award, Medal, ChevronLeft, ChevronRight, History } from "lucide-react";
import { useState } from "react";
import { useUserStore } from "../store/useUserstore";

export default function Leaderboard() {
  const { users, pagination, fetchUsers, loading, getUserHistory } = useUserStore();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [userHistory, setUserHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const rankIcon = (rank: number) => {
    if (rank === 1) return <Award className="text-accent" size={20} />;
    if (rank === 2) return <Medal className="text-neutral" size={20} />;
    if (rank === 3) return <Medal className="text-secondary" size={20} />;
    return <span className="ml-1 font-bold">{rank}</span>;
  };

  const rankColor = (rank: number) => {
    if (rank === 1) return "bg-accent/20 border-l-4 border-accent";
    if (rank === 2) return "bg-neutral/20 border-l-4 border-neutral";
    if (rank === 3) return "bg-secondary/20 border-l-4 border-secondary";
    return "border-l-4 border-base-content/10";
  };

  const handleViewHistory = async (userId: string, userName: string) => {
    setSelectedUser(userName);
    try {
      const history = await getUserHistory(userId);
      setUserHistory(history);
      setShowHistory(true);
    } catch (error) {
      console.error("Error fetching user history:", error);
    }
  };

const handlePageChange = (newPage: number) => {
  if (newPage >= 1 && newPage <= pagination.totalPages) {
    fetchUsers(newPage, pagination.limit); // 👈 use stored limit
  }
};

  if (loading) {
    return (
      <div className="card bg-base-100 shadow-lg border border-base-content/10">
        <div className="card-body flex items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p>Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (showHistory) {
    return (
      <div className="card bg-base-100 shadow-lg border border-base-content/10">
        <div className="card-body p-0">
          <div className="p-5 pb-3 bg-primary/10 rounded-t-2xl flex justify-between items-center">
            <h2 className="card-title flex gap-2 text-primary items-center text-xl">
              <History className="text-accent" /> Point History for {selectedUser}
            </h2>
            <button 
              className="btn btn-sm btn-ghost"
              onClick={() => setShowHistory(false)}
            >
              Back to Leaderboard
            </button>
          </div>
          <div className="overflow-x-auto p-4">
            {userHistory.length === 0 ? (
              <p className="text-center py-8 text-base-content/70">No history found for this user.</p>
            ) : (
              <table className="table w-full">
                <thead>
                  <tr className="bg-base-200">
                    <th className="font-bold">Date</th>
                    <th className="font-bold">Points Claimed</th>
                  </tr>
                </thead>
                <tbody>
                  {userHistory.map((history, index) => (
                    <tr key={index} className="hover:bg-base-200/50">
                      <td>{new Date(history.createdAt).toLocaleDateString()}</td>
                      <td className="font-bold text-accent">+{history.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-lg border border-base-content/10">
      <div className="card-body p-0">
        <div className="p-5 pb-3 bg-primary/10 rounded-t-2xl">
          <h2 className="card-title flex gap-2 text-primary items-center text-xl">
            <Trophy className="text-accent" /> Leaderboard
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-primary/10 text-primary">
                <th className="px-5 py-3 font-bold">Rank</th>
                <th className="font-bold">Name</th>
                <th className="text-right pr-5 font-bold">Total Points</th>
                <th className="text-center font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) && users.length > 0 ? (
                users.map((u, idx) => (
                  <tr key={u._id} className={`hover:bg-base-200/50 ${rankColor(idx + 1)}`}>
                    <td className="px-5 py-4 font-bold">
                      <div className="flex items-center gap-2">
                        {rankIcon((pagination.currentPage - 1) * 5 + idx + 1)}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center space-x-3">
                     
                        <div>
                          <div className="font-bold text-base-content">{u.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right pr-5">
                      <span className="font-bold text-base-content text-lg">{u.totalPoints}</span> 
                      <span className="text-sm text-base-content/80 ml-1">pts</span>
                    </td>
                    <td className="text-center">
                      <button 
                        className="btn btn-sm btn-outline"
                        onClick={() => handleViewHistory(u._id, u.name)}
                      >
                        <History size={14} className="mr-1" />
                        History
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-base-content/70">
                    No users found. Add some users to see the leaderboard!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls - Only show if we have more than 5 users */}
        {pagination.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center py-4 px-5 border-t border-base-content/10 gap-4">
            <div className="join">
              <button 
                className="join-item btn btn-sm"
                disabled={!pagination.hasPrev}
                onClick={() => handlePageChange(pagination.currentPage - 1)}
              >
                <ChevronLeft size={16} />
              </button>
              
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let pageNum;
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (pagination.currentPage <= 3) {
                  pageNum = i + 1;
                } else if (pagination.currentPage >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i;
                } else {
                  pageNum = pagination.currentPage - 2 + i;
                }
                
                return (
                  <button 
                    key={pageNum}
                    className={`join-item btn btn-sm ${pagination.currentPage === pageNum ? 'btn-primary' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button 
                className="join-item btn btn-sm"
                disabled={!pagination.hasNext}
                onClick={() => handlePageChange(pagination.currentPage + 1)}
              >
                <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="text-sm text-base-content/70 text-center">
              Showing {(pagination.currentPage - 1) * 5 + 1} to{" "}
              {Math.min(pagination.currentPage * 5, pagination.totalUsers)} of{" "}
              {pagination.totalUsers} users
            </div>
          </div>
        )}
      </div>
    </div>
  );
}