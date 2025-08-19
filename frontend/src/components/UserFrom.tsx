import { useState } from "react";
import { Plus } from "lucide-react";

import { addUser } from "../utils/Api";
import { useUserStore } from "../store/useUserstore";

export default function UserForm() {
  const [name, setName] = useState("");
  const fetchUsers = useUserStore((s) => s.fetchUsers);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await addUser({ name });
    setName("");
    fetchUsers();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <input
        type="text"
        placeholder="Enter user name"
        className="input input-bordered w-full bg-base-200 border border-base-content/20 text-base-content placeholder:text-base-content/60 focus:border-primary focus:outline-none"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn btn-primary flex gap-1 sm:w-auto">
        <Plus size={18} /> Add
      </button>
    </form>
  );
}