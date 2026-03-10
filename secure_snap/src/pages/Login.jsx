import { useNavigate } from "react-router-dom";
import { useState } from "react";
import bgImage from "../assets/login-bg.png";

export default function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () => {

    try{

      const res = await fetch("http://localhost:5000/api/auth/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      if(data.success){

        localStorage.setItem("token",data.token);

        navigate("/home");

      }else{

        alert(data.message);

      }

    }catch(err){

      console.log(err);
      alert("Server error");

    }

  };

  return (
    <div className="login-bg min-h-screen flex items-center justify-center bg-cover bg-center relative"
    style={{backgroundImage:`url(${bgImage})`}}>

      <div className="absolute inset-0 bg-black/80"></div>

      <div className="relative z-10 bg-card p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-800">

        <h1 className="text-3xl font-extrabold text-primary text-center mb-2">
          Secure Snap
        </h1>

        <p className="text-textMuted text-center mb-6">
          Your Identity. Your Consent. Always.
        </p>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-background border border-gray-700 text-textMain"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full mb-6 p-3 rounded bg-background border border-gray-700 text-textMain"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-primary py-3 rounded text-white font-semibold mb-3"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="w-full bg-background border border-primary py-3 rounded text-primary font-semibold"
        >
          Create Account
        </button>

      </div>

    </div>
  );
}