import React, { useContext } from "react";
import { UserDataContext } from "../context/UserContxt";

function Card({ image }) {
const {
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
    serverUrl,
    userData,
    setUserData,
  } = useContext(UserDataContext);

  return (
    <div className={`group w-[150px] h-[250px] bg-[#020314] border-2 border-blue-500/40 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950 hover:border-white hover:scale-[1.02]  ${selectedImage==image?"border-4 border-white shadow-2xl shadow-blue-950":null}`}  onClick={()=>setSelectedImage(image)}>
      <img
        src={image}
        alt="Customize option"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        onClick={() => setSelectedImage(image)}
      />
    </div>
  );
}

export default Card;
