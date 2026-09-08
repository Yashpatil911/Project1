import React, { createContext, useEffect, useState } from "react";
export const UserDataContext = createContext();
import axios from "axios";

function UserContxt({ children }) {
  const serverUrl = "http://localhost:8000";
  const [userData, setUserData] = React.useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGeminiResponse=async (command)=>{
    try {
    const result=await axios.post(`${serverUr1}/api/user/
    asktoassistant`, {command}, {withCredentials : true})
    return result.data
    } catch (error) {
    console.log(error)
    }
  }

  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    userData,
    setUserData,
    setBackendImage,
    backendImage,
    frontendImage,
    setFrontendImage,
    selectedImage,
    setSelectedImage,
    getGeminiResponse,
  };
  return (
    <div>
      <UserDataContext.Provider value={value}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
}

export default UserContxt;
