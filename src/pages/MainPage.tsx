import React from "react";
import { Link } from "react-router-dom";

const MainPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">홈 페이지</h1>
        <div>
          <Link to="/Login" className="mr-4 text-blue-500 hover:underline">
            로그인
          </Link>
          <Link to="/SignUp" className="text-blue-500 hover:underline">
            회원가입
          </Link>
        </div>
        <Link to="/genre">
          <button
            type="button"
            className="px-12 py-3 mb-10 ml-4 rounded-full text-white text-2xl bg-[#9B8F8F] hover:bg-[#E9E7E4] hover:text-[#898181] text-center shadow-lg shadow-black-800/80 dark:shadow-lg dark:shadow-black-800/80"
            // onClick={() => {

            //   if (authState.isLoggedIn) {
            //     navigate("/settingfirst");
            //   } else {
            //     alert("로그인이 필요합니다.");
            //     navigate("/login");
            //   }
            // }}
          >
            시작하기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
