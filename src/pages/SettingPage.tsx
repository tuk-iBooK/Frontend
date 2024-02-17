import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import addLogo from "/images/add.png";
// import deleteLogo from "/images/delete.png";
// import { useSelector } from "react-redux";
// import Loading from "../components/Loading";

interface Character {
  name: string;
  personality: string;
}

interface NovelData {
  genre: string[];
  time_period: string[];
  time_projection: string[];
  summary: string;
  character: Character[];
}

const SettingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  //   const authState = useSelector((state: any) => state);

  const [summary, setSummary] = useState<string>("");
  const [characterInputs, setCharacterInputs] = useState<Character[]>([
    { name: "", personality: "" },
  ]);
  const [genre, setGenre] = useState<string[]>([]);
  const [time_period, setTimePeriod] = useState<string[]>([]);
  const [time_projection, setTimeProjection] = useState<string[]>([]);
  const [novel_id, setNovelID] = useState<number | null>(null); //api응답값 = response.data
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     if (!authState.isLoggedIn) {
  //       alert("로그인이 필요합니다.");
  //       navigate("/");
  //     }
  //   }, []);

  useEffect(() => {
    const { state } = location;

    const { genre = [], time_period = [], time_projection = [] } = state || {};
    setGenre(genre);
    setTimePeriod(time_period);
    setTimeProjection(time_projection);
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //     try {
    //       const requestData: NovelData = {
    //         genre: genre,
    //         time_period: time_period,
    //         time_projection: time_projection,
    //         character: characterInputs,
    //         summary: summary,
    //       };
    //       setLoading(true);
    //       const response = await axios.post(
    //         "http://www.techeer-team-a.store:8000/api/v1/novels/",
    //         requestData,
    //         {
    //           headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json",
    //             id: localStorage.getItem("id"),
    //           },
    //         }
    //       );

    //       if (response.status === 201) {
    //         setNovelID(response.data);
    //         navigate("/choice", { state: { novel: response.data.novel } });
    //       } else {
    //         console.log(response);
    //         console.log("API 요청 실패");
    //         setLoading(false);
    //       }
    //     } catch (error) {
    //       console.error("api 요청 중 오류가 발생했습니다", error);
    //       setLoading(false);
    //     }
  };

  const handleAddInput = () => {
    if (characterInputs.length < 5) {
      setCharacterInputs([...characterInputs, { name: "", personality: "" }]);
    }
  };

  const handleInputChange = (
    index: number,
    field: "name" | "personality",
    value: string
  ) => {
    setCharacterInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs[index][field] = value;
      return updatedInputs;
    });
  };

  const handleDeleteInput = (index: number) => {
    setCharacterInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs.splice(index, 1);
      return updatedInputs;
    });
  };

  const handleNextPageClick = async (e: React.FormEvent) => {
    try {
      await handleSubmit(e);
    } catch (error) {
      console.error("다음 페이지 클릭시 오류 발생:", error);
    }
  };

  return (
    <div className="h-fit flex flex-col items-center p-8">
      <div className="h-5/6 w-5/6 mt-24 mb-2 bg-[#E9E7E4] flex flex-col rounded-2xl ">
        {/* 등장인물 입력 부분 */}
        <div className="flex items-center w-128 h-8 ml-10 mt-10">
          <div className="w-28 h-7 bg-[#9B8F8F] rounded-xl font-bold text-lg text-white">
            등장인물
          </div>
          <div className="ml-4 content-around font-bold text-[#898181] text-lg">
            원하는 등장인물의 이름과 특징을 입력하세요.
          </div>
        </div>

        <div className="ml-10 mr-10 mt-4 flex flex-col">
          {characterInputs.map((input, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                className="w-auto h-10 rounded-3xl px-4 mb-2 ml-5 border border-[#9B8F8F]"
                placeholder="이름을 입력하세요."
                value={input.name}
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
              />
              <input
                className="w-full h-10 rounded-3xl px-4 mb-2 border border-[#9B8F8F]"
                placeholder="등장인물의 특징을 입력하세요. ex. 성격이 착함"
                value={input.personality}
                onChange={(e) =>
                  handleInputChange(index, "personality", e.target.value)
                }
              />
              {input.name === "" && (
                <button
                  className="cursor-default w-5 h-5"
                  style={{ pointerEvents: "none" }}
                ></button>
              )}
              {input.name !== "" && (
                <button
                  className="cursor-pointer items-center w-5 h-5 ml-0"
                  onClick={() => handleDeleteInput(index)}
                >
                  {/* <img
                    src={deleteLogo}
                    alt="삭제 버튼"
                    className="w-5 h-5 ml-2"
                  /> */}
                  <img src={process.env.PUBLIC_URL + "/images/delete.png"} />
                </button>
              )}
            </div>
          ))}

          {characterInputs.length < 5 && (
            <div className="flex justify-center items-center mt-2">
              <button
                className="cursor-pointer w-7 h-7"
                onClick={handleAddInput}
              >
                {/* <img src={addLogo} alt="추가 버튼" className="w-7 h-7" /> */}
                <img src={process.env.PUBLIC_URL + "/images/add.png"} />
              </button>
            </div>
          )}

          {/* 줄거리 입력칸 */}
          <div className="flex items-center w-128 h-8 ml-1 mr-0 mt-10">
            <div className="w-28 h-7 bg-[#9B8F8F] rounded-xl font-bold text-lg text-white">
              줄거리
            </div>
            <div className="ml-4 content-around font-bold text-[#898181] text-lg">
              소설의 시작부분 혹은 중심사건을 입력해주세요.
            </div>
          </div>
          <div className="ml-5 mr-5 mt-4 mb-0 flex flex-col">
            <textarea
              className="flex flex-col w-auto h-80 rounded-xl p-4 mb-10 border border-[#9B8F8F]"
              placeholder="ex. 커피 중독자 연진은 어느날 70년이라는 시한부를 선고받는다. 그녀를 짝사랑하는 하은이 이를 알게되고..., 하은은 그녀를 지키기로 결심한다."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
        </div>
      </div>
      {/* 시작버튼 */}
      <div className="h-5/6 w-5/6 flex flex-col items-end">
        <button
          type="button"
          className="px-16 py-3 pr-16 font-bold text-white bg-[#9B8F8F] hover:bg-[#E9E7E4] hover:text-[#898181] rounded-2xl text-center shadow-lg shadow-black-800/80 dark:shadow-lg dark:shadow-black-800/80"
          onClick={handleNextPageClick}
        >
          시작하기
        </button>
      </div>
      {/* {loading && <Loading />} */}
    </div>
  );
};

export default SettingPage;
