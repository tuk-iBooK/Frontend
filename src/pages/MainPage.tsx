import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setStory } from "../features/storySlice";
import { useDispatch } from "react-redux";

const MainPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [story, setStory] = useState<number | null>(null);

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

      console.log("setStory 액션을 디스패치 하기 전", story);
      dispatch(setStory(story)); // redux 스토어의 story 상태 업데이트
      console.log("setStory 액션을 디스패치 후: ", story);

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
    <div className="flex flex-col h-screen overflow-y-auto">
      {/* Top-level full-width container for login/signup */}
      <div className="w-full p-4 pr-12 flex justify-end items-center">
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
      </div>

      {/* 헤더바 */}
      <div className="w-full p-4"> {/* Header will go here */}</div>

      <div
        className="flex bg-[#FFF0A3] items-center justify-center"
        style={{ height: "400px", minHeight: "400px" }}
      >
        <div className="flex-1 flex flex-col ml-36 justify-start items-start p-4">
          <p className="text-5xl mt-4 mb-4 font-bold text-black">
            나만의 그림 동화책
          </p>
          <div className="flex w-full justify-end items-end">
            <p className="text-7xl font-bold text-[#FFD600] mr-0 mb-6">
              I-BOOK
            </p>
          </div>
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-[#FFD600] rounded-full mr-4"></div>
            <p className="text-xl text-black">
              쉽고 간편하게 나만의 동화책을 만들어 보세요
            </p>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#FFD600] rounded-full mr-4"></div>
            <p className="text-xl text-black">
              지금 당장, 여러분의 상상력을 펼쳐보세요
            </p>
          </div>
        </div>

        {/* 오른쪽 도형 영역 */}
        <div className="relative flex justify-center items-center w-1/2 h-full overflow-hidden">
          {/* 원들 */}
          <div
            className="absolute w-60 h-60 rounded-full bg-[#FFFAE1] opacity-85"
            style={{
              top: "-20%",
              left: "90%",
              transform: "translateX(-220%)",
            }}
          ></div>
          <div
            className="absolute w-72 h-72 rounded-full bg-[#ffffff] opacity-50"
            style={{ top: "20%", left: "70%", transform: "translateX(-100%)" }}
          ></div>
          <div
            className="absolute w-96 h-96 rounded-full bg-[#FFE55A] opacity-75"
            style={{
              top: "50%",
              left: "60%",
              transform: "translateX(-100%)",
            }}
          ></div>

          {/* 시작하기 버튼 */}
          <button
            type="button"
            className="z-10 px-16 py-3 rounded-2xl text-black text-2xl bg-white hover:bg-[#FFF8D6] shadow-lg hover:shadow-none"
            onClick={handleStart}
            style={{
              position: "absolute",
              top: "55%",
              left: "30%",
              transform: "translate(-50%, -50%)",
            }}
          >
            시작하기
          </button>
        </div>
      </div>

      <div className="flex-grow w-3/4 self-center border-2 border-gray-300 mt-8 p-4 rounded-2xl">
        <div className="flex p-4 border-b text-xl font-bold">
          인기 작품 미리 보기
        </div>
        <div className="flex flex-wrap border-b border-gray-300">
          <div className="flex flex-col items-center w-1/3">
            <img
              src="example1.jpg"
              alt="Example 1"
              className="w-48 aspect-square"
            />
            <p>텍스트 설명 1</p>
          </div>

          <div className="flex flex-col items-center w-1/3">
            <img
              src="example2.jpg"
              alt="Example 2"
              className="w-48 aspect-square"
            />
            <p>텍스트 설명 2</p>
          </div>

          <div className="flex flex-col items-center w-1/3">
            <img
              src="example3.jpg"
              alt="Example 3"
              className="w-48 aspect-square"
            />
            <p>텍스트 설명 3</p>
          </div>
          <div className="flex flex-col items-center w-1/3">
            <img
              src="example1.jpg"
              alt="Example 1"
              className="w-48 aspect-square"
            />
            <p>텍스트 설명 1</p>
          </div>

          <div className="flex flex-col items-center w-1/3">
            <img
              src="example2.jpg"
              alt="Example 2"
              className="w-48 aspect-square"
            />
            <p>텍스트 설명 2</p>
          </div>

          <div className="flex flex-col items-center w-1/3">
            <img
              src="example3.jpg"
              alt="Example 3"
              className="w-48 aspect-square"
            />
            <p>텍스트 설명 3</p>
          </div>
          <div className="flex flex-col items-center w-1/3">
            <img
              src="example1.jpg"
              alt="Example 1"
              className="w-48 aspect-square"
            />
            <p>텍스트 설명 1</p>
          </div>

          <div className="flex flex-col items-center w-1/3">
            <img
              src="example2.jpg"
              alt="Example 2"
              className="w-48 aspect-square"
            />
            <p>텍스트 설명 2</p>
          </div>

          <div className="flex flex-col items-center w-1/3">
            <img
              src="example3.jpg"
              alt="Example 3"
              className="w-48 aspect-square"
            />
            <p>텍스트 설명 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
