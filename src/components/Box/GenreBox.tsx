import React, { useState } from "react";
// import addLogo from "../../public/images/add.png";

interface GenreBoxProps {
  selectedGenres: string[];
  onGenreClick: (genre: string) => void;
  onGenreSubmit: (genre: string) => void;
}

const GenreBox: React.FC<GenreBoxProps> = ({
  selectedGenres,
  onGenreClick,
  onGenreSubmit,
}) => {
  const [newGenre, setNewGenre] = useState("");
  const [enterPressed, setEnterPressed] = useState(false);
  const [genres, setGenres] = useState<string[]>([
    "공포",
    "SF",
    "로맨스",
    "판타지",
    "코미디",
    "액션",
    "스포츠",
    "성장",
    "청춘",
    "드라마",
    "스릴러",
    "타임루프",
    "재난",
  ]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!enterPressed) {
      setNewGenre(event.target.value);
    }
  };

  const handleAddGenre = () => {
    if (newGenre.trim() !== "") {
      onGenreSubmit(newGenre.trim());
      setGenres([...genres, newGenre.trim()]);
      setNewGenre("");
    }
  };

  const handleGenreClick = (genre: string) => {
    onGenreClick(genre);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!enterPressed) {
        setEnterPressed(true);
        handleAddGenre();
      }
    } else {
      setEnterPressed(false);
    }
  };

  const renderGenreButtons = () => {
    return genres.map((genre, index) => (
      <div
        className="genreButton"
        key={index}
        style={{
          backgroundColor: selectedGenres.includes(genre)
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
        onClick={() => handleGenreClick(genre)}
      >
        <p
          style={{
            color: selectedGenres.includes(genre) ? "#FFFFFF" : "#000000",
          }}
        >
          {genre}
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
          <p className="text-18 p-2 px-3 text-white bg-[#C8C0B8]">장르</p>
          <div className="flex items-center ml-auto flex-1">
            <input
              type="text"
              value={newGenre}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              placeholder="원하는 장르를 추가하세요"
              className="w-11/12 h-[44px] text-15 ml-[10px] flex-1"
            />
          </div>
          <button className="flex items-center pr-1" onClick={handleAddGenre}>
            <img
              src={process.env.PUBLIC_URL + "/images/add.png"}
              className="w-8 h-8 curdor-pointer"
            />
          </button>
        </div>
      </div>
      <div className="w-auto h-auto flex flex-wrap justify-center mt-1 overflow-scroll">
        {renderGenreButtons()}
      </div>
    </div>
  );
};

export default GenreBox;
