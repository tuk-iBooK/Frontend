import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const MainPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [story, setStory] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("id");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  useEffect(() => {
    const storedStory = localStorage.getItem("story");
    if (storedStory) {
      setStory(parseInt(storedStory));
    }
  }, []);

  const handleStart = async () => {
    try {
      const token = localStorage.getItem("id");
      if (!token) {
        console.error("토큰이 없습니다.");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "http://localhost:8000/api/story/register/",
        null,
        config
      );

      const { story } = response.data;
      console.log("생성된 story:", story);
      setStory(story);
      localStorage.setItem("story", story.toString()); // story 값을 로컬 스토리지에 저장
      navigate("/genre");
    } catch (error) {
      console.error("API 호출 중 오류가 발생했습니다:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("id");
    setIsLoggedIn(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <button
          type="button"
          className="px-12 py-3 mb-4 rounded-2xl text-black text-2xl bg-[#FFF0A3] hover:bg-[#FFF8D6] text-center shadow-lg hover:shadow-none"
          onClick={handleStart}
        >
          시작하기
        </button>
        <div>
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
      </div>
    </div>
  );
};

export default MainPage;
