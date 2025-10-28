// src/pages/Register.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../services/api"; // ✅ new helper API call

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"job_seeker" | "recruiter">("job_seeker");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleRegister = async () => {
    if (!email || !password || !name) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill out all fields.",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser({ email, password, name, role }); // ✅ use API service
      await login(email, password); // ✅ immediately log in new user

      await Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Welcome aboard!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-[1.01]">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-800 placeholder-gray-400"
              disabled={loading}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-800 placeholder-gray-400"
              disabled={loading}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-800 placeholder-gray-400"
              disabled={loading}
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "job_seeker" | "recruiter")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-800"
              disabled={loading}
            >
              <option value="job_seeker">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
            </select>

            <button
              onClick={handleRegister}
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-lg hover:shadow-xl"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  <span>Registering...</span>
                </>
              ) : (
                <span>Register</span>
              )}
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline font-medium">
                Sign in
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          © 2025 YourApp. All rights reserved.
        </p>
      </div>
    </div>
  );
}
