import { useEffect } from "react";
import ClaimPoints from "./components/ClaimPoints";
import Leaderboard from "./components/Leaderboard";


import { Crown, Trees, Sparkles } from "lucide-react";
import UserForm from "./components/UserFrom";
import { useUserStore } from "./store/useUserstore";

function App() {
  const fetchUsers = useUserStore((s) => s.fetchUsers);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div data-theme="forest" className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      <div className="container mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="text-center mb-8 pt-2">
          <div className="flex justify-center items-center mb-3">
            <div className="relative">
              <Trees size={46} className="text-primary" />
              <Sparkles size={16} className="text-accent absolute -top-1 -right-2" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold flex justify-center items-center gap-3 text-primary">
            <Crown className="text-accent" size={36} />
            Leaderboard Challenge
          </h1>
          <p className="text-primary/90 mt-4 text-lg font-medium bg-primary/10 rounded-lg py-2 px-4 max-w-2xl mx-auto">
            Add users, claim random points, and see rankings update in real time ⚡
          </p>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/5 space-y-6">
            <div className="card bg-base-100 shadow-lg p-5 border border-base-content/10">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content text-sm font-bold">
                  👤
                </div>
                Add New User
              </h2>
              <UserForm />
            </div>
            <ClaimPoints />
          </div>

          <div className="w-full lg:w-3/5">
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;