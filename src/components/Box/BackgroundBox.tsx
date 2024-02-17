import React, { useState } from "react";
// import addLogo from "/images/add.png";

interface BackgroundBoxProps {
  selectedBackgrounds: string[];
  onBackgroundClick: (genre: string) => void;
  onBackgroundSubmit: (genre: string) => void;
}

const BackgroundBox: React.FC<BackgroundBoxProps> = ({
  selectedBackgrounds,
  onBackgroundClick,
  onBackgroundSubmit,
}) => {
  const [newBackground, setNewBackground] = useState("");
  const [enterPressed, setEnterPressed] = useState(false);
  const [backgrounds, setBackgrounds] = useState<string[]>([
    "한국",
    "미국",
    "영국",
    "독일",
    "로마",
    "일본",
    "회사",
    "고등학교",
    "대학교",
    "길거리",
    "집",
    "숲 속",
  ]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!enterPressed) {
      setNewBackground(event.target.value);
    }
  };

  const handleAddBackground = () => {
    if (newBackground.trim() !== "") {
      onBackgroundSubmit(newBackground.trim());
      setBackgrounds([...backgrounds, newBackground.trim()]);
      setNewBackground("");
    }
  };

  const handleBackgroundClick = (background: string) => {
    onBackgroundClick(background);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!enterPressed) {
        setEnterPressed(true);
        handleAddBackground();
      }
    } else {
      setEnterPressed(false);
    }
  };

  const renderBackgroundButtons = () => {
    return backgrounds.map((background, index) => (
      <div
        key={index}
        style={{
          backgroundColor: selectedBackgrounds.includes(background)
            ? "#9B8F8F"
            : "#E3DDD7",
          width: "78.6px",
          height: "40.1px",
          borderRadius: "20px",
          margin: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => handleBackgroundClick(background)}
      >
        <p
          style={{
            color: selectedBackgrounds.includes(background)
              ? "#ffffff"
              : "#000000",
          }}
        >
          {background}
        </p>
      </div>
    ));
  };

  return (
    <div
      className="h-full bg-white flex flex-col"
      style={{
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div
        className="flex items-center bg-white p-18 mb-2"
        style={{
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div className="w-full flex">
          <p className="text-18 p-2 px-3 text-white bg-[#C8C0B8]">배경</p>
          <div className="flex items-center ml-auto flex-1">
            <input
              type="text"
              value={newBackground}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              placeholder="원하는 배경을 추가하세요"
              className="w-11/12 h-[44px] text-15 ml-[10px] flex-1"
            />
          </div>
          <button
            className="flex items-center pr-1"
            onClick={handleAddBackground}
          >
            {/* <img
              src={addLogo}
              alt="추가 버튼"
              className="w-8 h-8 cursor-pointer"
            /> */}
            <img
              src={process.env.PUBLIC_URL + "/images/add.png"}
              className="w-8 h-8 curdor-pointer"
            />
          </button>
        </div>
      </div>
      <div className="w-auto h-auto flex flex-wrap justify-center mt-1 overflow-scroll">
        {renderBackgroundButtons()}
      </div>
    </div>
  );
};

export default BackgroundBox;
