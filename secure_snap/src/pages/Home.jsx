import { useState, useEffect } from "react";

export default function Home() {

  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const token = localStorage.getItem("token");

  const loadImages = async () => {

    try{

      const res = await fetch("http://localhost:5000/api/images",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

      const data = await res.json();

      if(data.success){

        setImages(data.images);

      }

    }catch(err){

      console.log(err);

    }

  };

  useEffect(()=>{
    loadImages();
  },[]);


  const handleUpload = async (file) => {

    if (!file || !file.type.startsWith("image/")) {
      setUploadStatus({ type: "error", message: "Please upload an image file" });
      return;
    }

    try{

      const formData = new FormData();

      formData.append("image", file);

      const res = await fetch("http://localhost:5000/api/images/upload",{

        method:"POST",

        headers:{
          Authorization:`Bearer ${token}`
        },

        body:formData

      });

      const data = await res.json();

      if(data.success){

        setUploadStatus({ type:"success", message:"Image uploaded successfully!" });

        loadImages();

      }

    }catch(err){

      console.log(err);

      setUploadStatus({ type:"error", message:"Upload failed" });

    }

  };


  const handleFileInput = (e) => {

    const file = e.target.files[0];

    if(file) handleUpload(file);

  };

  const handleDrop = (e) => {

    e.preventDefault();

    setIsDragging(false);

    const file = e.dataTransfer.files[0];

    if(file) handleUpload(file);

  };

  const handleDragOver = (e) => {

    e.preventDefault();

    setIsDragging(true);

  };

  const handleDragLeave = () => {

    setIsDragging(false);

  };


  const alerts = images.filter(img => img.status === "pending").length;

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="text-center mb-12">

          <h1 className="text-5xl font-bold text-white">
            Secure Snap
          </h1>

          <p className="text-gray-400 mt-2">
            Your Identity. Your Consent. Always.
          </p>

        </div>

        {uploadStatus && (

          <div className="text-center mb-6 text-white">

            {uploadStatus.message}

          </div>

        )}


        <div className="grid lg:grid-cols-3 gap-8 mb-12">

          {/* Upload Box */}

          <div className="lg:col-span-2">

            <div
              className={`bg-slate-800/50 p-8 rounded-2xl border-2 ${
                isDragging ? "border-cyan-400" : "border-slate-700"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >

              <h2 className="text-2xl text-white mb-6">
                Upload Face Image
              </h2>

              <label className="block border-2 border-dashed border-gray-600 rounded-xl p-12 text-center cursor-pointer">

                <p className="text-gray-300 mb-2">

                  Click to upload or drag and drop

                </p>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />

              </label>

            </div>

          </div>


          {/* Status Cards */}

          <div className="space-y-6">

            <StatusCard
              title="Uploads"
              value={images.length}
            />

            <StatusCard
              title="Alerts"
              value={alerts}
            />

            <StatusCard
              title="Protection"
              value="ARMED"
            />

          </div>

        </div>


        {/* Gallery */}

        {images.length > 0 && (

          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">

            <h3 className="text-2xl text-white mb-6">
              Recent Uploads
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              {images.map((img) => (

  <div key={img._id}>

    <img
      src={img.s3Url}
      alt={img.originalName}
      className="w-full h-48 object-cover rounded-xl"
    />

  </div>

))}

            </div>

          </div>

        )}

      </div>

    </div>

  );

}


function StatusCard({title,value}){

  return(

    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">

      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <p className="text-3xl font-bold text-white">
        {value}
      </p>

    </div>

  );

}