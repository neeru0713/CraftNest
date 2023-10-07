import { useState, useEffect } from "react";

export default function useUser() {
   
const getUser = () => {
  try {
    let myuser = localStorage.getItem("craftnest_user");
    if (myuser === null) {
      return null;
      }
      let parsedUser = JSON.parse(myuser);
    return parsedUser;
  } catch (error) {
    // Handle the error, e.g., log it and return a default user object
    // console.error("Error parsing user data:", error);
    return null;
  }
};

const [user, setUser] = useState(getUser())

const saveUser = (data) => {
        let name = "auth";
    let value = data?.tokens.access.token;
    let expiry = data?.tokens.access.expires;
    // set the cookie with token returned from api
    document.cookie = `${name}=${value};expires=${expiry};path=/`;
    localStorage.setItem("craftnest_user", JSON.stringify(data?.user));
    setUser(data?.user)
}
    
return {
    user,
    setUser: saveUser,
    };
    
}