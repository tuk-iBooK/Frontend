import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BackgroundSettingPage: React.FC = () => {
  const [selectedBackgrounds, setSelectedBackgrounds] = useState<string[]>([]);
  const [additionalBackground, setAdditionalBackground] = useState<string>("");
  const navigate = useNavigate();

  const handleBackgroundClick = (background: string) => {
    setSelectedBackgrounds((prevBackgrounds) =>
      prevBackgrounds.includes(background)
        ? prevBackgrounds.filter((g) => g !== background)
        : [...prevBackgrounds, background]
    );
  };

  const handleAddBackground = () => {
    if (additionalBackground.trim() !== "") {
      const trimmedbackground = additionalBackground.trim();
      if (!selectedBackgrounds.includes(trimmedbackground)) {
        setSelectedBackgrounds((prevBackgrounds) => [
          ...prevBackgrounds,
          trimmedbackground,
        ]);
      }
      // setAdditionalBackground(""); // 입력값 초기화
    }
  };

  const handleRemovebackground = (background: string) => {
    setSelectedBackgrounds((prevBackgrounds) =>
      prevBackgrounds.filter((g) => g !== background)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Selected backgrounds:", selectedBackgrounds);
  };

  const handleGoBack = () => {
    navigate("/genre");
  };

  const handleNextPage = () => {
    navigate("/character");
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-3/4 mt-24 flex-1 justify-between items-center">
        <div className="bg-[#FFF0A3] p-4 mb-8 rounded-2xl shadow-lg">
          <div className="text-xl font-bold text-black font-['Inria'] p-4">
            3. 원하는 이야기의 공간적 배경을 선택 혹은 입력하세요
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
            <div className="flex flex-col w-4/5 space-y-4 p-4 bg-white border border-gray-300 justify-center items-center rounded-2xl">
              {["숲", "뭐", "뭐지", "머", "배경"].map((background, index) => (
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
          {selectedBackgrounds.map((background, index) => (
            <button
              key={index}
              className="px-6 py-1 bg-[#FFF0A3] text-black rounded-2xl m-2"
              onClick={() => handleRemovebackground(background)}
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
