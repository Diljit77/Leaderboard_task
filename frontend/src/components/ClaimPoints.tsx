import { useState } from "react";
import { Gift } from "lucide-react";
import type { ClaimResponse } from "../types";

import { claimPoints } from "../utils/Api";
import { useUserStore } from "../store/useUserstore";

export default function ClaimPoints() {
  const [selected, setSelected] = useState<string>("");
  const [lastClaim, setLastClaim] = useState<ClaimResponse | null>(null);
  const { users, fetchUsers } = useUserStore();

  const handleClaim = async () => {
    if (!selected) return;
    const res = await claimPoints(selected);
    setLastClaim(res);
    fetchUsers();
  };

  return (
    <div className="card bg-base-100 shadow-lg p-5 border border-base-content/10">
      <h2 className="card-title text-primary mb-4">
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-content font-bold">
          🎁
        </div>
        Claim Points
      </h2>
      
      <div className="mb-3">
        <label className="text-base-content font-medium block mb-1">Select User</label>
        <select
          className="select select-bordered w-full bg-base-200 border border-base-content/20 text-base-content focus:border-primary focus:outline-none"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">Choose a user</option>
          {Array.isArray(users) &&
            users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
        </select>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <button 
          onClick={handleClaim} 
          className="btn btn-secondary flex gap-1 sm:w-auto justify-center"
          disabled={!selected}
        >
          <Gift size={18} /> Claim Points
        </button>
      </div>

      {lastClaim && (
        <div className="alert alert-success mt-4 bg-success/30 text-success-content border border-success/40">
          <span className="text-xl">🎉</span>
          <span>
            <span className="font-bold">{lastClaim.user.name}</span> claimed{" "}
            <span className="font-bold">{lastClaim.points}</span> points!
          </span>
        </div>
      )}
    </div>
  );
}