import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GenreSettingPage: React.FC = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [additionalGenre, setAdditionalGenre] = useState<string>("");
  const navigate = useNavigate();

  const handleGenreClick = (genre: string) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  const handleAddGenre = () => {
    if (additionalGenre.trim() !== "") {
      const trimmedGenre = additionalGenre.trim();
      if (!selectedGenres.includes(trimmedGenre)) {
        setSelectedGenres((prevGenres) => [...prevGenres, trimmedGenre]);
      }
      // setAdditionalGenre(""); // 입력값 초기화
    }
  };

  const handleRemoveGenre = (genre: string) => {
    setSelectedGenres((prevGenres) => prevGenres.filter((g) => g !== genre));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Selected genres:", selectedGenres);
  };

  const handleNextPage = () => {
    navigate("/settingfirst");
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-3/4 mt-24 flex-1 justify-between items-center">
        <div className="bg-[#FFF0A3] p-4 mb-8 rounded-2xl shadow-lg">
          <div className="text-xl font-bold text-black font-['Inria'] p-4">
            1. 원하는 이야기의 장르를 선택 혹은 입력하세요
          </div>
          <div className="">
            <input
              type="text"
              value={additionalGenre}
              onChange={(e) => setAdditionalGenre(e.target.value)}
              placeholder="원하는 장르를 입력하여 직접 추가하세요"
              className="w-3/5 py-2 p-4 border border-gray-300 rounded-2xl"
              onKeyDown={(e) => {
                if (e.key === "Enter" && additionalGenre.trim() !== "") {
                  handleAddGenre();
                }
              }}
            />
          </div>
          <div className="flex justify-center items-center m-4">
            <div className="bg-[#FFF0A3] p-4 rounded-2xl w-1/5 flex justify-center items-center">
              {/* <button
                className="w-12 h-12 bg-blue-500 text-white rounded-full flex justify-center items-center"
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
              </button> */}
            </div>
            <div className="flex flex-col w-4/5 space-y-4 p-4 bg-white border border-gray-300 justify-center items-center rounded-2xl">
              {["환상", "모험", "동화", "신화", "공상과학"].map(
                (genre, index) => (
                  <button
                    key={index}
                    className={`py-2 px-4 rounded-full w-40 h-10  shadow-lg ${
                      selectedGenres.includes(genre)
                        ? "bg-[#FFF0A3] text-black shadow-none"
                        : "bg-[#EBEBEB] text-black"
                    } hover:bg-[#FFF0A3] hover:shadow-none`}
                    onClick={() => handleGenreClick(genre)}
                  >
                    {genre}
                  </button>
                )
              )}
            </div>
            <div className="p-4 mb-8 rounded-2xl w-1/5 flex justify-center items-center">
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
          선택한 장르 :{" "}
          {selectedGenres.map((genre, index) => (
            <button
              key={index}
              className="px-6 py-1 bg-[#FFF0A3] text-black rounded-2xl m-2"
              onClick={() => handleRemoveGenre(genre)}
            >
              <div className="flex">
                <span className="ml-2">{genre}</span>
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

export default GenreSettingPage;
