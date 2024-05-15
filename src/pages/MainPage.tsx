import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setStory } from "../features/storySlice";
import { useDispatch } from "react-redux";
//더미데이터
import image1 from "../assets/public/01.png";
import image2 from "../assets/public/02.png";
import image3 from "../assets/public/03.png";
import image4 from "../assets/public/04.png";
import image5 from "../assets/public/05.png";
import image6 from "../assets/public/06.png";
import image7 from "../assets/public/07.png";
import image8 from "../assets/public/08.png";
import image9 from "../assets/public/09.png";

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

  function handleClick() {
    navigate("/result");
  }

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      {/* Top-level full-width container for login/signup */}
      {/* <div className="w-full p-4 pr-12 flex justify-end items-center bg-black">
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
      </div> */}

      {/* 헤더바 */}
      <div className="w-full p-4"> {/* Header will go here */}</div>

      <div
        className="flex bg-[#FFF0A3] items-center justify-center"
        style={{ height: "400px", minHeight: "400px" }}
      >
        <div className="flex-1 flex flex-col ml-36 justify-start items-start p-4 ">
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
            className="z-10 px-16 py-3 rounded-2xl text-black text-2xl bg-white hover:bg-[#FFFAE1] shadow-lg hover:shadow-none"
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

      <div className="flex-grow w-2/3 self-center border-2 border-gray-300 mt-8 p-4 rounded-2xl">
        <div className="flex p-4 border-b text-xl font-bold">
          인기 작품 미리 보기
        </div>
        <div className="flex flex-wrap border-b border-gray-300 mt-8 mb-12 ">
          <div className="flex flex-col items-center w-1/3 mb-8">
            <img
              src={image1}
              className="w-60 rounded-t-lg bg-gray-100 aspect-square p-2 "
              onClick={handleClick}
            />
            <p className="w-60 p-1 font-bold shadow-lg rounded-b-lg bg-gray-100">
              호기심 많은 소녀
            </p>
          </div>

          <div className="flex flex-col items-center w-1/3">
            <img
              src={image2}
              className="w-60 rounded-t-lg bg-gray-100 aspect-square p-2 "
              onClick={handleClick}
            />
            <p className="w-60 p-1 font-bold shadow-lg rounded-b-lg bg-gray-100">
              끝없는 비밀의 길
            </p>
          </div>

          <div className="flex flex-col items-center w-1/3">
            <img
              src={image3}
              className="w-60 rounded-t-lg bg-gray-100 aspect-square p-2 "
              onClick={handleClick}
            />
            <p className="w-60 p-1 font-bold shadow-lg rounded-b-lg bg-gray-100">
              무서운 곰과 친구하기
            </p>
          </div>
          <div className="flex flex-col items-center w-1/3 mb-8">
            <img
              src={image4}
              className="w-60 rounded-t-lg bg-gray-100 aspect-square p-2 "
              onClick={handleClick}
            />
            <p className="w-60 p-1 font-bold shadow-lg rounded-b-lg bg-gray-100">
              신비로운 숲 속 비밀의 장소
            </p>
          </div>

          <div className="flex flex-col items-center w-1/3">
            <img
              src={image5}
              className="w-60 rounded-t-lg bg-gray-100 aspect-square p-2 "
              onClick={handleClick}
            />
            <p className="w-60 p-1 font-bold shadow-lg rounded-b-lg bg-gray-100">
              요정의 비밀
            </p>
          </div>

          <div className="flex flex-col items-center w-1/3">
            <img
              src={image6}
              className="w-60 rounded-t-lg bg-gray-100 aspect-square p-2 "
              onClick={handleClick}
            />
            <p className="w-60 p-1 font-bold shadow-lg rounded-b-lg bg-gray-100">
              해적선의 보물을 찾아서
            </p>
          </div>
          <div className="flex flex-col items-center w-1/3 mb-8">
            <img
              src={image7}
              className="w-60 rounded-t-lg bg-gray-100 aspect-square p-2 "
              onClick={handleClick}
            />
            <p className="w-60 p-1 font-bold shadow-lg rounded-b-lg bg-gray-100">
              맑은 하늘과 호수
            </p>
          </div>

          <div className="flex flex-col items-center w-1/3">
            <img
              src={image8}
              className="w-60 rounded-t-lg bg-gray-100 aspect-square p-2 "
              onClick={handleClick}
            />
            <p className="w-60 p-1 font-bold shadow-lg rounded-b-lg bg-gray-100">
              친구들과 숨바꼭질
            </p>
          </div>

          <div className="flex flex-col items-center w-1/3">
            <img
              src={image9}
              className="w-60 rounded-t-lg bg-gray-100 aspect-square p-2 "
              onClick={handleClick}
            />
            <p className="w-60 p-1 font-bold shadow-lg rounded-b-lg bg-gray-100">
              숲 속 오두막집의 비밀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
