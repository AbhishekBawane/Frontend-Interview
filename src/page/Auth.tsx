import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "@/lib/auth";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";

export default function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");

    if (!email || !password || (!isLogin && !username)) {
      setError("All fields are required");
      return;
    }

    if (isLogin) {
      // 🔐 LOGIN
      const user = loginUser(email, password);
      if (!user) {
        setError("Invalid email or password");
        return;
      }
      navigate("/");
    } else {
      registerUser({
        id: uuid(),
        username,
        email,
        password,
      });
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow space-y-4">

        <h2 className="text-xl font-bold text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        {!isLogin && (
          <input
            className="border p-2 w-full rounded"
            placeholder="Name"
            onChange={(e) => setUsername(e.target.value)}
          />
        )}

        <input
          className="border p-2 w-full rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {isLogin ? "Login" : "Register"}
        </Button>

        <p className="text-sm text-center text-gray-600">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}
          <button
            className="ml-1 text-blue-600 font-medium"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
