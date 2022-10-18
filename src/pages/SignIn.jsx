import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <section>
      <h1 className="text-3xl text-center mt-10 font-bold">Sign In</h1>
      <div className="flex justify-center items-center flex-wrap px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[70%] lg:w-[50%] mb-12 md:mb-6">
          <lottie-player
            src="https://assets4.lottiefiles.com/packages/lf20_CgL682.json"
            background="transparent"
            speed="1"
            loop
            autoplay
            className="w-full"
          ></lottie-player>
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form>
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
                placeholder="Password"
                value={password}
                onChange={onChange}
              />
              {showPassword ? (
                <AiFillEyeInvisible className="absolute right-3 top-3 text-xl cursor-pointer" 
                onClick={() => setShowPassword
                  ((prevState) => !prevState)} />
              ) : (
                <AiFillEye className="absolute right-3 top-3 text-xl cursor-pointer" 
                onClick={() => setShowPassword
                  ((prevState) => !prevState)} />
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
