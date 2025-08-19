import React from "react";
import footerImg from "../assets/images/footer.jpg";

const Footer = () => {
  return (
    // flex w-full flex-wrap
    <footer className="bg-amber-200 pt-5 text-sm">
      {/* div tổng */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* flex flex-1 flex-col gap-y-3 px-12 */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Cột 1: Logo + liên hệ */}
          <div className="space-y-3">
            <img
              src={footerImg}
              alt="logo"
              className="h-16 w-auto object-contain"
            />
            <h4 className="font-semibold">Contact:</h4>
            <p>Email: test@gmail.com</p>
            <p>Phone: 123456789</p>
            <p>Address: HaNoi, VietNam</p>
          </div>
          {/* Cột 2: Giới thiệu */}
          <div className="flex flex-col gap-y-3">
            <h3 className="font-semibold">GIỚI THIỆU</h3>
            <a className="" href="/">
              Home
            </a>
            <a className="" href="/">
              Books Store
            </a>
            <a className="" href="/">
              Review Book
            </a>
            <a className="" href="/">
              Collection of Good Books
            </a>
            <a className="" href="/">
              Blog
            </a>
            <a className="" href="/">
              About us
            </a>
          </div>

          {/* Cột 3: Hướng dẫn, hỗ trợ */}
          <div className="">
            <h3 className="font-semibold">HƯỚNG DẪN, HỖ TRỢ</h3>
          </div>

          {/* Cột 4: page fb */}
          <div className="">
            <h3 className="font-semibold">FANPAGE FACEBOOK</h3>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
