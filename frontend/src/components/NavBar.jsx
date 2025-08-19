import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.jpg";

const searchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="absolute top-1/2 right-1 size-7 -translate-y-1/2 cursor-pointer"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );
};

const categoryIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);

//cart
const cartIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6 cursor-pointer"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    />
  </svg>
);

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between bg-gray-300 px-10">
      {/* logo */}
      <Link to="/">
        <img src={logo} alt="Logo" className="h-12 w-16" />
      </Link>
      {/* thanh tìm kiếm */}
      <div className="relative flex h-12 items-center justify-center">
        <input
          type="text"
          placeholder="Search ..."
          className="h-full w-72 rounded-sm border-0 bg-white pr-10 pl-3 text-black focus:outline-none md:w-[400px]"
        />

        {searchIcon()}
      </div>

      {/* chức năng bên phải */}
      <div className="flex items-center justify-between gap-10">
        {" "}
        {/* thể loại */}
        <div className="text-white">
          <button className="flex h-10 w-32 cursor-pointer items-center justify-center gap-2 rounded-sm bg-blue-400">
            {categoryIcon}
            Category
          </button>
        </div>
        {/* đăng nhập/ kí */}
        <div className="text-sm">
          <p className="text-center">Welcome </p>
          <div className="flex items-center justify-between gap-2">
            <Link to="/login" className="border-r-2 border-gray-400 pr-3">
              Login
            </Link>
            <Link to="/register" className="">
              Register
            </Link>
          </div>
        </div>
        {/* cart */}
        <Link to="/cart" className="rounded-full bg-gray-200 p-2.5">
          {cartIcon}
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
