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
      setSelectedGenres((prevGenres) => [
        ...prevGenres,
        additionalGenre.trim(),
      ]);
      setAdditionalGenre("");
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
        <div className="bg-[#E9E7E4] p-4 mb-8 rounded-2xl">
          <div className="text-xl font-bold text-[#6B3A18] font-['Inria'] p-4">
            1. 원하는 이야기의 장르를 선택 혹은 입력하세요
          </div>
          <div className="">
            <input
              type="text"
              value={additionalGenre}
              onChange={(e) => setAdditionalGenre(e.target.value)}
              placeholder="원하는 장르를 입력하여 직접 추가하세요"
              className="mt-2 w-2/5 py-2 p-4 border border-gray-300 rounded-2xl"
            />
            <button
              className="ml-4 px-4 py-2 rounded-full text-white bg-[#9B8F8F] hover:bg-[#E9E7E4] hover:text-[#898181] text-center shadow-lg shadow-black-800/80 dark:shadow-lg dark:shadow-black-800/80"
              onClick={handleAddGenre}
            >
              추가
            </button>
          </div>
          <div className="flex justify-center items-center m-4">
            <div className="bg-[#E9E7E4] p-4 rounded-2xl w-1/5 flex justify-center items-center">
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
            <div className="flex flex-col w-4/5 space-y-4 p-4 bg-white justify-center items-center rounded-2xl">
              {["환상", "모험", "동화", "신화", "공상과학"].map(
                (genre, index) => (
                  <button
                    key={index}
                    className={`py-2 px-4 rounded-full w-60 h-10 ${
                      selectedGenres.includes(genre)
                        ? "bg-[#9B8F8F] text-white font-bold"
                        : "bg-[#E3DDD7] text-gray-800"
                    }`}
                    onClick={() => handleGenreClick(genre)}
                  >
                    {genre}
                  </button>
                )
              )}
            </div>
            <div className="bg-[#E9E7E4] p-4 mb-8 rounded-2xl w-1/5 flex justify-center items-center">
              <button
                className="w-12 h-12 bg-[#9B8F8F] text-white rounded-full flex justify-center items-center"
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

      <div className="w-3/4 flex p-4 bg-[#E9E7E4] rounded-2xl justify-center">
        <div className=" w-3/4 bg-white text-m font-bold text-[#6B3A18] font-['Inria'] p-6 rounded-2xl">
          선택한 장르 :{" "}
          {selectedGenres.map((genre, index) => (
            <button
              key={index}
              className="px-4 py-1 bg-[#9B8F8F] text-white rounded-2xl m-2"
              onClick={() => handleRemoveGenre(genre)}
            >
              {genre} &#10006;
            </button>
          ))}
        </div>
      </div>
      <button
        className="mb-4 mt-8 px-16 py-3 pr-16 font-bold text-white bg-[#9B8F8F] hover:bg-[#E9E7E4] hover:text-[#898181] rounded-2xl text-center shadow-lg shadow-black-800/80 dark:shadow-lg dark:shadow-black-800/80"
        onClick={handleSubmit}
      >
        선택 완료
      </button>
    </div>
  );
};

export default GenreSettingPage;
