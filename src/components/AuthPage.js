import React, { useState, useContext  } from "react";
import Input from "./Input";
import Button from "./Button";
import { Notification } from "./Notification"
import { API_URL } from "../config/config";
// import useUser from "../customHooks/useUser"
import { UserContext, ModalContext } from "../App";

const AuthPage = ({
  togglePage,
  whichAuthPage,
  setIsModalOpen,
  setShowLoginBtn,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notifMsg, setNotifMsg] = useState("");
  // const { user, setUser } = useUser();
  const { user, setUser } = useContext(UserContext);
  const { showModal, setShowModal } = useContext(ModalContext);

  const validateEmail = (email) => {
     
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password should be at least 8 characters long
    return password.length >= 8;
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "email") {
      setEmail(value);
      setEmailError(validateEmail(value) ? "" : "Invalid email address");
    } else {
      setPassword(value);
      setPasswordError(
        validatePassword(value)
          ? ""
          : "Password must be at least 8 characters long"
      );
    }

    // check if button needs to be disabled or enabled
    //  setIsButtonDisable(!validateEmail(email) || !validatePassword(password));
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
   
    const postData = {
      email: email,
      password: password,
    };

    let url = "";
    if (whichAuthPage === "register") {
      url = `${API_URL}/auth/register`;
    } else {
      url = `${API_URL}/auth/login`;
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers if needed
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        // Handle the successful response data
        console.log("Data:", data);
         let name = "auth";
         let value = data?.tokens.access.token;
         let expiry = data?.tokens.access.expires;
         // set the cookie with token returned from api
         document.cookie = `${name}=${value};expires=${expiry};path=/`;
         localStorage.setItem("craftnest_user", JSON.stringify(data?.user));
        setUser(data.user)
        setShowNotification(true);
        setNotifMsg(data.message);
        setShowModal(false)
        setIsModalOpen(false);
        setShowLoginBtn(false)
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col ml-8 mt-8">
        <h1 className="font-bold text-[30px] ">
          {whichAuthPage === "login"
            ? " Sign into your account"
            : "Join our family of CraftNest"}
        </h1>
        <p className="font-semibold text-[15px] ">
          {whichAuthPage === "login"
            ? "  New to Craftnest ?"
            : "Already a member ?"}

          <span
            className="text-white underline font-bold cursor-pointer"
            onClick={() => {
              if (whichAuthPage === "login") {
                togglePage("register");
              } else {
                togglePage("login");
              }
            }}
          >
            {whichAuthPage === "login" ? "  Sign up here" : "Log In"}
          </span>
        </p>
      </div>

      <div className="flex flex-col ml-4 p-4 text-lg gap-4 font-semibold text-black">
        <Input
          type="email"
          label="Email"
          name="email"
          placeholder="test@gmail.com"
          value={email}
          onChange={handleInputChange}
        />
        {emailError && <span className="text-red-500">{emailError}</span>}
        <Input
          type="password"
          label="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
          className="mt-2"
        />
        {passwordError && <span className="text-red-500">{passwordError}</span>}
        <Button
          name={whichAuthPage === "login" ? "Login" : "Register"}
          type="form-btn"
          handleSubmit={handleSubmit}
          isButtonDisable={isButtonDisable}
        />
      </div>

      {/* {showNotification ? (<Notification msg={ notifMsg } />) : null}  */}
    </div>
  );
};

export default AuthPage;
