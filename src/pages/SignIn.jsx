import React, { useState } from "react";

export default function SignIn() {
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
            className="w-full" 
            type="email" 
            id="email" 
            placeholder="Email Address" 
            value={email}
            onChange={onChange}
            />
          </form>
        </div>
      </div>
    </section>
  );
}
