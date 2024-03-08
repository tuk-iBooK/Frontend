import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenreBox from "../components/Box/GenreBox";
import BackgroundBox from "../components/Box/BackgroundBox";
import EraBox from "../components/Box/EraBox";
// import { useSelector } from "react-redux";

const SettingPageFirst: React.FC = () => {
  const navigate = useNavigate();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedBackgrounds, setSelectedBackgrounds] = useState<string[]>([]);
  const [selectedEras, setSelectedEras] = useState<string[]>([]);
  //   const authState = useSelector((state: any) => state);

  const handleGenreClick = (genre: string) => {
    setSelectedGenres((prevGenres) => {
      if (prevGenres.includes(genre)) {
        return prevGenres.filter((g) => g !== genre);
      } else {
        return [...prevGenres, genre];
      }
    });
  };

  const handleGenreSubmit = (keyword: string) => {
    setSelectedGenres((prevKeywords) => [...prevKeywords, keyword]);
  };

  //---//
  const handleBackgroundClick = (background: string) => {
    setSelectedBackgrounds((prevBackgrounds) => {
      if (prevBackgrounds.includes(background)) {
        return prevBackgrounds.filter((b) => b !== background);
      } else {
        return [...prevBackgrounds, background];
      }
    });
  };

  const handleBackgroundSubmit = (keyword: string) => {
    setSelectedBackgrounds((prevKeywords) => [...prevKeywords, keyword]);
  };

  //--//
  const handleEraClick = (era: string) => {
    setSelectedEras((prevEras) => {
      if (prevEras.includes(era)) {
        return prevEras.filter((e) => e !== era);
      } else {
        return [...prevEras, era];
      }
    });
    console.log(era);
  };

  const handleEraSubmit = (keyword: string) => {
    setSelectedEras((prevKeywords) => [...prevKeywords, keyword]);
  };

  const handleNextPageClick = () => {
    navigate("/setting", {
      state: {
        genre: selectedGenres,
        time_period: selectedEras,
        time_projection: selectedBackgrounds,
      },
    });
  };

  //   useEffect(() => {
  //     if (!authState.isLoggedIn) {
  //       alert("로그인이 필요합니다.");
  //       navigate("/");
  //     }
  //   }, []);

  // useEffect(() => {}, [selectedGenres]);

  // useEffect(() => {}, [selectedBackgrounds]);

  // useEffect(() => {}, [selectedEras]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="items-center w-5/6 h-5/6 mt-12">
        <div className="text-5xl font-bold text-center text-[#6B3A18] font-['Inria']">
          Sketch Story
        </div>
        <div className="h-5/6 bg-[#E9E7E4] flex flex-row p-4 mt-8 mb-2 rounded-2xl overflow-scroll">
          <div className="flex-1 mx-4">
            <div className="h-full p-4 mb-4 rounded-xl">
              <GenreBox
                selectedGenres={selectedGenres}
                onGenreClick={handleGenreClick}
                onGenreSubmit={handleGenreSubmit}
              />
            </div>
          </div>
          <div className="flex-1 mx-4">
            <div className="h-full p-4 mb-4 rounded-xl">
              <BackgroundBox
                selectedBackgrounds={selectedBackgrounds}
                onBackgroundClick={handleBackgroundClick}
                onBackgroundSubmit={handleBackgroundSubmit}
              />
            </div>
          </div>
          <div className="flex-1 mx-4">
            <div className="h-full p-4 mb-4 rounded-xl">
              <EraBox
                selectedEras={selectedEras}
                onEraClick={handleEraClick}
                onEraSubmit={handleEraSubmit}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <button
            className="px-16 py-3 pr-16 font-bold text-white bg-[#9B8F8F] hover:bg-[#E9E7E4] hover:text-[#898181] rounded-2xl text-center shadow-lg shadow-black-800/80 dark:shadow-lg dark:shadow-black-800/80"
            onClick={handleNextPageClick}
          >
            다음으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingPageFirst;
