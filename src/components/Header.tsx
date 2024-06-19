import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authActions";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("id");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 실행되는 로직.
    // localStorage에 로그인 정보가 남아있으면 redux의 로그인 상태를 true로 한다.
    if (localStorage.getItem("id") !== null) {
      dispatch(loginSuccess());
    }
  }, []);

  const handleLogout = () => {
    // 컴포넌트가 처음 렌더링될 때 실행되는 로직.
    localStorage.removeItem("id");
    setIsLoggedIn(false);
    alert("로그아웃되었습니다.");
    navigate("/");
  };

  return (
    <div>
      <div className="pl-12 p-4 items-end justify-end">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="mr-4 text-gray-500 hover:underline hover:text-black"
          >
            로그아웃
          </button>
        ) : (
          <>
            <Link
              to="/Login"
              className="mr-4 text-gray-500 hover:underline hover:text-black"
            >
              로그인
            </Link>
            <Link
              to="/SignUp"
              className="text-gray-500 hover:underline hover:text-black"
            >
              회원가입
            </Link>
          </>
        )}
      </div>
      <div className="flex justify-between items-center p-2 mt-2">
        <Link to="/" className="text-5xl ml-12 font-bold text-[#FFD600]">
          I-Book
        </Link>
        <input
          type="text"
          placeholder="책 제목 혹은 작가의 닉네임을 입력하세요."
          className="w-1/2 py-3 rounded-full p-8 bg-gray-100"
        />
        {/* 내 책장 버튼 */}
        <div className="px-12 py-2 font-bold text-black bg-[#FFF0A3] hover:bg-[#FFFAE1]   rounded-full text-center">
          <Link to="/mybooks">내 책장 </Link>
        </div>
        {/* 내 프로필 버튼 */}
        <Link
          to="/profile"
          className="px-12 py-2 font-bold text-black bg-[#FFF0A3] hover:bg-[#FFFAE1]  rounded-full text-center"
        >
          내 프로필
        </Link>
        <Link
          to="/allbooks"
          className="px-12 py-2 font-bold text-black bg-[#FFF0A3] hover:bg-[#FFFAE1]  rounded-full text-center  mr-12"
        >
          모든 책장
        </Link>{" "}
      </div>
    </div>
  );
};

export default Header;
