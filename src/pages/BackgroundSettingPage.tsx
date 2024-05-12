import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addBackground, removeBackground } from "../features/backgroundSlice";

const BackgroundSettingPage: React.FC = () => {
  const location = useLocation();
  const settingInfo = location.state || { genre: [] };
  const [additionalBackground, setAdditionalBackground] = useState<string>("");
  const selectedBackgrounds = useSelector(
    (state: any) => state.background.selectedBackgrounds
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backgrounds = [
    "마법의 숲",
    "숨겨진 마을",
    "용의 동굴",
    "해적선",
    "신비한 섬",
    "장대한 산맥",
    "야생 사바나",
    "북극의 빙판",
    "동물원",
    "옛날 마을",
    "고대 숲 속의 오두막",
    "전설의 호수",
    "우주 정거장",
    "과학 실험실",
    "미래 도시",
    "울창한 열대우림",
    "거대한 폭포",
    "산속의 계곡",
    "고대 사원",
    "농촌",
    "전설의 시간",
    "학교",
    "가정집",
    "도시 공원",
  ];

  const handleBackgroundClick = (background: string) => {
    if (selectedBackgrounds.includes(background)) {
      dispatch(removeBackground(background));
    } else {
      dispatch(addBackground(background));
    }
  };
  const handleAddBackground = () => {
    if (additionalBackground.trim() !== "") {
      dispatch(addBackground(additionalBackground.trim()));
      setAdditionalBackground(""); // 입력값 초기화
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Selected genres:", `${settingInfo.genre}`);
    console.log("Selected backgrounds:", {
      state: { background: selectedBackgrounds },
    });
    navigate("/period", {
      state: { ...settingInfo, background: selectedBackgrounds },
    });
  };

  const handleGoBack = () => {
    navigate("/genre");
  };

  const handleNextPage = () => {
    navigate("/period", {
      state: { background: selectedBackgrounds },
    });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-3/4 mt-24 flex-1 justify-between items-center">
        <div className="bg-[#FFF0A3] p-4 mb-8 rounded-2xl shadow-lg">
          <div className="text-xl font-bold text-black font-['Inria'] p-4">
            2. 원하는 이야기의 공간적 배경을 선택 혹은 입력하세요
          </div>
          <div className="">
            <input
              type="text"
              value={additionalBackground}
              onChange={(e) => setAdditionalBackground(e.target.value)}
              placeholder="원하는 공간적 배경을 입력하여 직접 추가하세요"
              className="w-3/5 py-2 p-4 border border-gray-300 rounded-2xl"
              onKeyDown={(e) => {
                if (e.key === "Enter" && additionalBackground.trim() !== "") {
                  handleAddBackground();
                }
              }}
            />
          </div>
          <div className="flex justify-center items-center m-4">
            <div className="bg-[#FFF0A3] p-4 rounded-2xl w-1/5 flex justify-center items-center">
              <button
                className="w-12 h-12  bg-white text-gray-500 rounded-full flex justify-center items-center shadow-lg hover:shadow-none hover:bg-[#EBEBEB] hover:text-white"
                onClick={handleGoBack}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
            <div
              className="w-4/5 bg-white border border-gray-300 justify-center items-center rounded-2xl"
              style={{ height: "300px" }}
            >
              <div
                className="flex flex-wrap justify-center gap-6 overflow-y-auto p-8"
                style={{ maxHeight: "100%" }}
              >
                {backgrounds.map((background, index) => (
                  <button
                    key={index}
                    className={`py-2 px-4 rounded-full w-40 h-10  shadow-lg ${
                      selectedBackgrounds.includes(background)
                        ? "bg-[#FFF0A3] text-black shadow-none"
                        : "bg-[#EBEBEB] text-black"
                    } hover:bg-[#FFF0A3] hover:shadow-none`}
                    onClick={() => handleBackgroundClick(background)}
                  >
                    {background}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-2xl w-1/5 flex justify-center items-center">
              <button
                className="w-12 h-12 bg-white text-gray-500 rounded-full flex justify-center items-center shadow-lg hover:shadow-none hover:bg-[#EBEBEB] hover:text-white"
                onClick={handleNextPage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-3/4 flex p-4 bg-[#FFF0A3] rounded-2xl justify-center shadow-lg">
        <div className=" w-3/4 bg-white border border-gray-300 text-m text-black font-['Inria'] p-6 rounded-2xl">
          선택한 배경 :{" "}
          {selectedBackgrounds.map((background: string, index: number) => (
            <button
              key={index}
              className="px-6 py-1 bg-[#FFF0A3] text-black rounded-2xl m-2"
              onClick={() => dispatch(removeBackground(background))}
            >
              <div className="flex">
                <span className="ml-2">{background}</span>
                <div className="p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-300"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      fill="gray"
                      className="text-gray-400"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 15l6-6M15 15l-6-6"
                    />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <button
        className="mb-4 mt-8 px-16 py-3 pr-16 font-bold text-black bg-[#FFF0A3] hover:bg-[#FFE55A] hover:text-white hover:shadow-none rounded-2xl text-center shadow-lg"
        onClick={handleSubmit}
      >
        선택 완료
      </button>
    </div>
  );
};

export default BackgroundSettingPage;
