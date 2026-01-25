import { useState } from "react";
import { useAuth } from "../lib/AuthContext";
import { logoutUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [username, setName] = useState(user?.username || "");
  const [avatar, setAvatar] = useState<string | null>(null);

  if (!user) {
    return <p className="text-center mt-10">Please login first</p>;
  }

  // 📸 Handle image upload (local preview)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // ✏️ Save profile changes
  const handleSave = () => {
    const updatedUser = { ...user, username };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert("Profile updated");
  };

  // 🔐 Logout
  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* LEFT: Profile Card */}
      <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center gap-4">
        <div className="relative">
          <img
            src={avatar || "https://ui.shadcn.com/avatars/01.png"}
            className="w-32 h-32 rounded-full object-cover border"
          />
          <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer">
            ✎
            <input type="file" hidden onChange={handleImageUpload} />
          </label>
        </div>

        <h2 className="text-xl font-bold">{user.username}</h2>
        <p className="text-gray-500 text-sm">{user.email}</p>

        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* RIGHT: Settings */}
      <div className="md:col-span-2 bg-white p-6 rounded-xl shadow space-y-6">
        <h3 className="text-lg font-semibold">Profile Settings</h3>

        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Full Name</label>
          <input
            className="w-full border p-2 rounded"
            value={username}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input
            className="w-full border p-2 rounded bg-gray-100"
            value={user.email}
            disabled
          />
        </div>

        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
          Save Changes
        </Button>

        <hr />

        {/* FUTURE FEATURES */}
        <div className="space-y-3 text-sm text-gray-600">
          <p>🔒 Change Password (coming soon)</p>
          <p>🗑 Delete Account (coming soon)</p>
          <p>🧾 View My Blogs (coming soon)</p>
        </div>
      </div>
    </div>
  );
}
