import { useNavigate } from "react-router-dom";
import { useState } from "react";
import bgImage from "../assets/login-bg.png";

export default function SignUp() {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const handleSignUp = async () => {

    if(password !== confirmPassword){
      alert("Passwords do not match");
      return;
    }

    try{

      const res = await fetch("http://localhost:5000/api/auth/register",{

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          name,
          email,
          password
        })

      });

      const data = await res.json();

      if(data.success){

        alert("Account created successfully");

        navigate("/");

      }else{

        alert(data.message);

      }

    }catch(err){

      console.log(err);
      alert("Server error");

    }

  };

  return (

    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >

      <div className="absolute inset-0 bg-black/80"></div>

      <div className="relative z-10 bg-card p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-800">

        <h1 className="text-3xl font-extrabold text-primary text-center mb-2">
          Secure Snap
        </h1>

        <p className="text-textMuted text-center mb-6">
          Create your account
        </p>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-background border border-gray-700 text-textMain"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-background border border-gray-700 text-textMain"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-background border border-gray-700 text-textMain"
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          className="w-full mb-6 p-3 rounded bg-background border border-gray-700 text-textMain"
        />

        {/* Sign Up Button */}
        <button
          onClick={handleSignUp}
          className="w-full bg-primary py-3 rounded text-white font-semibold hover:opacity-90 transition mb-3"
        >
          Sign Up
        </button>

        {/* Back to Login */}
        <button
          onClick={() => navigate("/")}
          className="w-full bg-background border border-primary py-3 rounded text-primary font-semibold hover:bg-primary hover:text-white transition"
        >
          Back to Login
        </button>

      </div>

    </div>

  );

}