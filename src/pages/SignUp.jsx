import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { db } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SIgnUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy[password]; //delete the password from setFormData

      //add data to the database
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Account created successfully");
      navigate("/"); //redirect to home page
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <section>
      <div className="flex justify-center items-center flex-wrap px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[70%] lg:w-[50%] mb-12 md:mb-6">
          <lottie-player
            src="https://assets2.lottiefiles.com/packages/lf20_8jjkg2ut.json"
            background="transparent"
            speed="1"
            loop
            autoplay
            className="w-full"
          ></lottie-player>
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <h1 className="text-3xl text-center mt-10 font-bold mb-6 uppercase">
            Sign Up
          </h1>
          <form onSubmit={onSubmit}>
            <input
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              type="text"
              id="name"
              placeholder="Full Name"
              value={name}
              onChange={onChange}
            />
            <input
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={onChange}
            />
            <div className="relative mb-6">
              <input
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password (at least 6 characters)"
                value={password}
                onChange={onChange}
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Have an account?
                <Link
                  to="/sign-in"
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-4"
                >
                  Sign In
                </Link>
              </p>
              <p>
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                >
                  Forgot Password
                </Link>
              </p>
            </div>
            {password.length < 6 ? (
              <button
                className="w-full bg-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md"
                type="submit"
                disabled
              >
                Sign Up
              </button>
            ) : (
              <button
                className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md
             hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
                type="submit"
              >
                Sign Up
              </button>
            )}
            <div
              className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-300
          after:border-t after:flex-1 after:border-gray-300"
            >
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
