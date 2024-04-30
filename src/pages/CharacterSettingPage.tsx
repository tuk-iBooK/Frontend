import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCharacter, removeCharacter } from "../features/characterSlice";
import axios from "axios";

interface Character {
  age: number;
  gender: string;
  name: string;
  personality: string;
}

const CharacterSettingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const characters = useSelector(
    (state: any) => state.character.characters as Character[]
  );

  // const settingInfo = { ...location.state };

  const story = useSelector((state: any) => state.story.value as number);

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(1);
  const [gender, setGender] = useState<string>("남");
  const [personality, setPersonality] = useState<string>("");

  const handleAddCharacter = () => {
    if (
      characters.length < 3 &&
      name.trim() !== "" &&
      personality.trim() !== ""
    ) {
      dispatch(addCharacter({ name, age, gender, personality }));
    }
  };

  const handleRemoveCharacter = (index: number) => {
    dispatch(removeCharacter(index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("전송될 데이터:", {
      story,
      age,
      name,
      personality,
      gender,
    });

    try {
      const token = localStorage.getItem("id");
      console.log("사용자 토큰:", token);
      if (!token) {
        console.error("토큰이 없습니다.");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:8000/api/story/register/character/",
        {
          story,
          age,
          gender,
          name,
          personality,
        },
        config
      );

      console.log("사용자 토큰:", token);
      if (response.status === 201) {
        console.log("API 요청이 성공했습니다.");
        navigate("/summary");
      } else {
        console.error("API 요청이 실패했습니다.");
      }
    } catch (error) {
      console.error("API 요청 중 오류가 발생했습니다:", error);
    }
  };
  const handleGoBack = () => {
    navigate("/period");
  };

  const handleNextPage = () => {
    navigate("/summary");
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-3/4 mt-24 flex-1 justify-between items-center">
        <div className="bg-[#FFF0A3] p-4 mb-8 rounded-2xl shadow-lg">
          <div className="text-xl font-bold text-black font-['Inria'] p-4">
            4. 원하는 이야기의 등장인물을 설정하세요
          </div>
          {/* /여기부터 */}
          <div className="bg-[#FFF0A3] p-4 rounded-2xl flex justify-center items-center">
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

            <div className="flex flex-col w-4/5 space-y-4 p-8 bg-white border border-gray-300 justify-center items-center rounded-2xl">
              <div className="w-full space-y-4 ">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="등장인물의 이름을 입력하세요"
                  className="w-full py-2 p-4 border border-gray-300 rounded-2xl"
                />

                <div className="flex w-full space-x-4">
                  <div className="flex items-center space-x-2">
                    <span>성별:</span>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="py-2 px-4 border border-gray-300 rounded-2xl"
                    >
                      <option value="남">남</option>
                      <option value="여">여</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>나이:</span>
                    <select
                      value={age}
                      onChange={(e) => setAge(parseInt(e.target.value))}
                      className="py-2 px-4 border border-gray-300 rounded-2xl"
                    >
                      {Array.from({ length: 100 }, (_, index) => (
                        <option key={index} value={index + 1}>
                          {index + 1} 살
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="">
                  <textarea
                    value={personality}
                    onChange={(e) => setPersonality(e.target.value)}
                    placeholder="등장인물의 성격을 입력하세요"
                    className="w-full py-6 px-6 border border-gray-300 rounded-2xl"
                  />
                </div>
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

          <div className="flex justify-center items-center m-4">
            <button
              onClick={handleAddCharacter}
              className="w-12 h-12 bg-white text-gray-500 rounded-full flex justify-center items-center shadow-lg hover:shadow-none hover:bg-[#EBEBEB] hover:text-white"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="w-full flex p-4 bg-[#FFF0A3] rounded-2xl justify-center shadow-lg">
          <div className="w-3/4 bg-white border border-gray-300 text-m text-black font-['Inria'] p-6 rounded-2xl">
            설정한 등장인물 :
            <div className="space-y-4">
              {characters.map((character, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <span>
                      {character.name} ({character.age} 살, {character.gender})
                      - {character.personality}
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={() => handleRemoveCharacter(index)}
                      className="px-4 py-2 bg-[#EBEBEB] text-black rounded-2xl hover:bg-[#FFF0A3]"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <button
            className="mb-4 mt-8 px-16 py-3 pr-16 font-bold text-black bg-[#FFF0A3] hover:bg-[#FFE55A] hover:text-white hover:shadow-none rounded-2xl text-center shadow-lg"
            onClick={handleSubmit}
          >
            선택 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterSettingPage;
