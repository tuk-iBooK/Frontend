import React, { useState } from "react";
// import addLogo from "/images/add.png";

interface EraBoxProps {
  selectedEras: string[];
  onEraClick: (era: string) => void;
  onEraSubmit: (era: string) => void;
}

const EraBox: React.FC<EraBoxProps> = ({
  selectedEras,
  onEraClick,
  onEraSubmit,
}) => {
  const [newEra, setNewEra] = useState("");
  const [enterPressed, setEnterPressed] = useState(false);
  const [eras, setEras] = useState<string[]>([
    "현대",
    "근대",
    "미래",
    "중세",
    "르네상스",
    "고대",
    "조선",
    "고려",
  ]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!enterPressed) {
      setNewEra(event.target.value);
    }
  };

  const handleAddEra = () => {
    if (newEra.trim() !== "") {
      onEraSubmit(newEra.trim());
      setEras([...eras, newEra.trim()]);
      setNewEra("");
    }
  };

  const handleEraClick = (era: string) => {
    onEraClick(era);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!enterPressed) {
        setEnterPressed(true);
        handleAddEra();
      }
    } else {
      setEnterPressed(false);
    }
  };

  const renderEraButtons = () => {
    return eras.map((era, index) => (
      <div
        key={index}
        style={{
          backgroundColor: selectedEras.includes(era) ? "#9B8F8F" : "#E3DDD7",
          width: "78.6px",
          height: "40.1px",
          borderRadius: "20px",
          margin: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => handleEraClick(era)}
      >
        <p
          style={{ color: selectedEras.includes(era) ? "#ffffff" : "#000000" }}
        >
          {era}
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
          <p className="text-18 p-2 px-3 text-white bg-[#C8C0B8]">시대</p>
          <div className="flex items-center ml-auto flex-1">
            <input
              type="text"
              value={newEra}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              placeholder="원하는 시대를 추가하세요"
              className="w-11/12 h-[44px] text-15 ml-[10px] flex-1"
            />
          </div>
          <button className="flex items-center pr-1" onClick={handleAddEra}>
            <img
              src={process.env.PUBLIC_URL + "/images/add.png"}
              className="w-8 h-8 cursor-pointer"
            />
          </button>
        </div>
      </div>
      <div className="w-auto h-auto flex flex-wrap justify-center mt-1 overflow-scroll">
        {renderEraButtons()}
      </div>
    </div>
  );
};

export default EraBox;
