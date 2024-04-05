import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addGenre,
  removeGenre, // setSelectedGenres 제거
} from "../features/genreSlice"; // 상대 경로 확인 필요

const GenreSettingPage: React.FC = () => {
  const [additionalGenre, setAdditionalGenre] = useState<string>("");
  const selectedGenres = useSelector(
    (state: any) => state.genre.selectedGenres
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGenreClick = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      dispatch(removeGenre(genre));
    } else {
      dispatch(addGenre(genre));
    }
  };

  const handleAddGenre = () => {
    if (additionalGenre.trim() !== "") {
      dispatch(addGenre(additionalGenre.trim()));
      setAdditionalGenre(""); // 입력값 초기화
    }
  };

  // handleRemoveGenre 함수를 Redux 액션을 디스패치하는 방식으로 수정
  // 기존의 setSelectedGenres 호출 부분 제거

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Selected genres:", selectedGenres);
    navigate("/period", { state: { genre: selectedGenres } });
  };

  const handleNextPage = () => {
    navigate("/period", {
      state: {
        genre: selectedGenres,
      },
    });
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
            <div className="bg-[#FFF0A3] p-4 rounded-2xl w-1/5 flex justify-center items-center"></div>
            <div className="flex flex-col w-4/5 space-y-4 p-4 bg-white border border-gray-300 justify-center items-center rounded-2xl">
              {[
                "환상", //마법의 숲, 숨겨진 마을, 용의 동굴
                "모험", //해적선, 신비한 섬, 장대한 산맥
                "동물", //야생 사바나, 북극의 빙판, 동물원
                "전래동화", //옛날 마을, 고대 숲 속의 오두막, 전설의 호수
                "과학", //우주 정거장, 과학 실험실, 미래 도시
                "자연", //울창한 열대우림, 거대한 폭포, 산속의 계곡
                "교훈", //고대 사원, 농촌, 전설의 시간
                "일상", //학교, 가정집, 도시 공원
              ].map((genre, index) => (
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
          선택한 장르 :{" "}
          {selectedGenres.map((genre: string, index: number) => (
            <button
              key={index}
              className="px-6 py-1 bg-[#FFF0A3] text-black rounded-2xl m-2"
              onClick={() => dispatch(removeGenre(genre))}
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
