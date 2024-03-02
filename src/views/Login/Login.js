import axios from "axios";
import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const Login = () => {
    if (
      email !== "" &&
      password !== "" &&
      email !== undefined &&
      password !== undefined
    ) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(
            "%cLogin.js line:15 userCredential.user",
            "color: white; background-color: #007acc;",
            userCredential.user
          );
          const userInfo = {
            email: userCredential.user.email,
            accessToken: userCredential.user.accessToken,
          };
          window.sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
          navigate("/dashboard");
        })

        .catch((error) => {
          console.log("\x1b[41m%s\x1b[0m", "Login.js line:16 err", error);
        });
    } else {
      setError("email aur password to daal bc!");
    }
  };

  useEffect(() => {
    if (email === "" && password === "") {
      setError("email aur password to daal bc!");
    } else {
      setError(false);
    }
  }, [email, password]);

  return (
    <div className="w-screen h-screen flex justify-center items-center relative z-10">
      <div
        className="h-1/2 w-1/4 flex flex-col justify-center items-center
      bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-400"
      >
        <input
          type="email"
          className="w-2/3 rounded-md border border-gray-500 bg-transparent my-1 px-2 py-1 outline-none transition-all
          duration-200 focus:border-gray-700 focus:scale-105"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-2/3 rounded-md border border-gray-500 bg-transparent my-1 px-2 py-1 outline-none transition-all
          duration-200 focus:border-gray-700 focus:scale-105"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => Login()}
          className="transition-all duration-200 border rounded-full border-gray-500 my-2 py-1 px-3 hover:scale-110"
        >
          Login
        </button>

        {typeof error === "string" && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
