import React from "react";

const Login = () => {
  return (
    <div className="mx-auto mt-8 max-w-md rounded-xl border">
      <form
        action=""
        className="mx-auto flex h-auto w-[450px] flex-col gap-5 bg-yellow-200 py-10"
      >
        <h1 className="text-center text-3xl font-semibold">Welcome</h1>
        <input type="text" name="" id="" placeholder="username" />
        <input type="password" name="" id="" placeholder="password" />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
