import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ChartBarIcon } from "@heroicons/react/24/outline";


function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    // fake token
    const fakeToken = "demo-token-123"

    localStorage.setItem("token", fakeToken)

    navigate("/dashboard")
  }

  return ( 
    <div className="bg-linear-to-br from-white to-blue-100">
      <div className=" flex flex-col items-center justify-center min-h-screen">
        <div className="mb-4 text-center">
          <ChartBarIcon className="w-12 h-12 bg-blue-500 text-white mb-3 rounded-lg shadow-lg shadow-blue-300 mx-auto block"/>

          <h1 className="text-3xl font-bold mb-1 text-center">InsigtBoard</h1>
          <p>Secure analytics dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-xl p-8 w-96">

          <h1 className="text-2xl mb-6 font-bold">Sign in to your account</h1>
          <label className=" font-semibold">Email Address</label>
          <input 
            type="text"
            placeholder="you@example.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 mt-2 border border-gray-400 rounded-lg p-2 "
            required
          />
          <label className=" font-semibold">Password</label>
          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 mt-2 border border-gray-400 rounded-lg p-2 "
            required
          />

          <button 
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg py-2 mb-3 shadow-lg shadow-blue-300 ">
              Sign In
          </button>

          <p className="text-center text-sm">Don't have an account? <a href="#" className="text-blue-500 underline">Create One</a></p>

        </form>
      </div>
    </div>
    
   );
}

export default Login;