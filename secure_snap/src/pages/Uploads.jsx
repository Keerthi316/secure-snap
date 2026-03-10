import { useState, useEffect } from "react";

export default function Uploads(){

  const [uploads,setUploads] = useState([]);

  const token = localStorage.getItem("token");

  const loadUploads = async () => {

    try{

      const res = await fetch("http://localhost:5000/api/images",{

        headers:{
          Authorization:`Bearer ${token}`
        }

      });

      const data = await res.json();

      if(data.success){

        setUploads(data.images);

      }

    }catch(err){

      console.log(err);

    }

  };

  useEffect(()=>{
    loadUploads();
  },[]);


  return(

    <div className="min-h-screen bg-slate-900 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl text-white mb-8">
          My Uploads
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {uploads.map((upload) => (
  <div
    key={upload._id}
    className="group bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700 overflow-hidden hover:border-cyan-400 transition-all"
  >
    <div className="relative">

      <img
        src={upload.s3Url}
        alt={upload.originalName}
        className="w-full h-64 object-cover"
      />

    </div>

    <div className="p-4">

      <p className="text-white text-sm truncate">
        {upload.originalName}
      </p>

    </div>

  </div>
))}

        </div>

      </div>

    </div>

  );

}