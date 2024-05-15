import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("id");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("id");
    setIsLoggedIn(false);
    navigate("/"); // 로그아웃 후 홈으로 이동
  };

  return (
    <div className=" p-4 pl-12 justift-end">
      <Link
        to="/Login"
        className="text-gray-500 hover:underline hover:text-black mr-4"
      >
        로그인
      </Link>
      <Link
        to="/SignUp"
        className="text-gray-500 hover:underline hover:text-black"
      >
        회원가입
      </Link>
      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="mr-4 text-gray-500 hover:underline hover:text-black"
          >
            로그아웃
          </button>
        ) : (
          <></>
        )}{" "}
      </div>
      <div className="flex justify-between items-center p-2">
        <Link to="/" className="text-5xl ml-12 font-bold text-[#FFD600]">
          I-Book
        </Link>
        <input
          type="text"
          placeholder="책 제목 혹은 작가의 닉네임을 입력하세요."
          className="w-1/2 py-3 rounded-full p-8 bg-gray-100"
        />
        {/* 내 책장 버튼 */}
        <Link
          to="/my-books"
          className="px-12 py-2 font-bold text-black bg-[#FFF0A3] hover:bg-[#FFFAE1]   rounded-full text-center"
        >
          내 책장
        </Link>
        {/* 내 프로필 버튼 */}
        <Link
          to="/profile"
          className="px-12 py-2 font-bold text-black bg-[#FFF0A3] hover:bg-[#FFFAE1]  rounded-full text-center"
        >
          내 프로필
        </Link>
        {/* 모든 책장 버튼 */}
        <Link
          to="/all-books"
          className="px-12 py-2 font-bold text-black bg-[#FFF0A3] hover:bg-[#FFFAE1]  rounded-full text-center  mr-12"
        >
          모든 책장
        </Link>{" "}
      </div>
    </div>
  );
};

export default Header;
