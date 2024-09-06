import React, { useState, useEffect, useRef } from "react";
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

const MainPage: React.FC = () => {
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

  function handleClick() {
    navigate("/result");
  }

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      {/* 헤더바 */}
      <div className="w-full p-4"> {/* Header will go here */}</div>
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        exit={{ opacity: 0, y: 20 }}
        className="flex bg-[#FFF0A3] items-center justify-center"
        style={{ height: "400px", minHeight: "400px" }}
      > */}
      <div className="flex h-screen bg-[#FFF0A3] items-center justify-center">
        <div className="flex-1 flex flex-col ml-36 justify-start items-start p-12 pt-16">
          <p className="text-5xl mt-4 mb-4 font-bold text-black">
            나만의 그림 동화책
          </p>
          <div className="flex w-full justify-end items-end">
            <p className="text-6xl font-bold text-[#FFD600] mr-0 mb-6">
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
      <div className="flex justify-center">
        <div className="w-3/4 border-2 border-gray-300 mt-8 p-8 rounded-2xl">
          <div className="p-4 border-b text-xl font-bold text-left">
            인기 작품 미리보기
          </div>

          <div className="relative flex overflow-hidden group">
            <div className="flex animate-infiniteSlide">
              {/* 더미 이미지들 */}
              {[
                image1,
                image2,
                image3,
                image4,
                image5,
                image1,
                image2,
                image3,
                image4,
                image5,
              ].map((image, index) => (
                <div key={index} className="flex-shrink-0 w-60 mx-4">
                  <img
                    src={image}
                    className="w-full rounded-t-lg bg-gray-100 aspect-square p-2"
                    alt={`Image ${index + 1}`}
                  />
                  <p className="w-full p-1 font-bold text-center shadow-lg rounded-b-lg bg-gray-100">
                    제목 {index + 1}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
