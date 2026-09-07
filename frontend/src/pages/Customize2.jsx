import React, { useContext, useState } from "react";
import { UserDataContext } from "../context/UserContxt";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Customize2() {
  
  const { userData, backendImage, selectedImage, serverUrl,setUserData } =
    useContext(UserDataContext);
    const navigate = useNavigate();
  const [assistantName, setAssistantName] = useState(
    userData?.assistantName || "",
  );

  const handleUpdateAssistant = async () => {
    try {
      let formData = new FormData();
      formData.append("assistantName", assistantName);
      if (backendImage) {
        formData.append("assistantImage", backendImage);
      } else {
        formData.append("imageUrl", selectedImage);
      }
      const result = await axios.post(`${serverUrl}/api/user/update`,
        formData, { withCredentials: true },
      );

      console.log(result.data);
      setUserData(result.data);
      
      
    } catch (error) {
      console.log("Update Assistant error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] flex justify-center items-center flex-col p-[20px]">
      <h1 className="text-center text-white mb-[40px] text-[30px]">
        Select your <span className="text-blue-200">Assistant Name </span>{" "}
      </h1>
      <input
        type="text"
        placeholder="eg .shifra"
        className="w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
        required
        onChange={(e) => setAssistantName(e.target.value)}
        value={assistantName}
      />

      {assistantName && (
        <button
          className="min-w-[300px] h-[60px] mt-[30px] text-black font-semibold cursor-pointer bg-white rounded-full text-[19px]"
          onClick={() => {
           
            handleUpdateAssistant()
          }}
        >
          {" "}
          Finally Create Your Assistant{" "}
        </button>
      )}
    </div>
  );
}

export default Customize2;
