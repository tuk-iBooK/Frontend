import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setSummary } from "../features/summarySlice";
import Loading from "../components/Loading";
import StepIndicator from "../components/StepIndicator"; // 상단에 추가
import QuestionIcon from "../assets/public/question.png"; // 이 경로가 올바른지 확인하세요.

const SummarySettingPage: React.FC = () => {
  const story = useSelector((state: any) => state.story.value) as number;
  const summary = useSelector((state: any) => state.summary.value) as string;
  const genre = useSelector(
    (state: any) => state.genre.selectedGenres
  ) as string[];
  const back_ground = useSelector(
    (state: any) => state.background.selectedBackgrounds
  ) as string[];
  const time_period = useSelector(
    (state: any) => state.period.selectedPeriods
  ) as string[];
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleModal = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // 로딩 중이면 함수 실행을 차단

    setLoading(true);

    console.log("Sending data:", {
      story,
      genre,
      time_period,
      back_ground,
      summary,
    });

    //api 요청 부분
    try {
      const token = localStorage.getItem("id");
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
        "http://localhost:8000/api/story/register/background/",
        {
          story,
          genre: "fantasy",
          // genre: genre.join(","), //배열이면 문자열로 변환
          time_period: time_period.join(", "),
          back_ground: back_ground.join(", "),
          summary,
        },
        config
      );

      if (response.status === 201) {
        console.log("API 요청이 성공했습니다.");
        navigate("/firstresult");
      } else {
        console.error("API 요청이 실패했습니다.");
        setLoading(false);
      }
    } catch (error) {
      console.error("API 요청 중 오류가 발생했습니다:", error);
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/character");
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <StepIndicator currentStep={0} />
      <div className="w-3/4 flex-1 justify-between items-center">
        <div className="bg-[#FFF0A3] p-4 mb-8 rounded-tr-2xl rounded-b-2xl shadow-lg">
          <div className="text-xl font-bold text-black font-['Inria'] p-4">
            5. 원하는 이야기의 줄거리를 간단히 설정하세요
          </div>
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
              <div className="w-full space-y-4">
                <textarea
                  value={summary}
                  onChange={(e) => dispatch(setSummary(e.target.value))}
                  placeholder="원하는 줄거리를 간단히 입력하세요."
                  className="w-full py-4 px-6 border border-gray-300 rounded-2xl"
                  style={{ height: "200px" }}
                />
              </div>
            </div>
            <div className="p-4 rounded-2xl w-1/5 flex justify-center items-center"></div>
          </div>
          <div className="mr-4 flex justify-end">
            <button onClick={toggleModal}>
              <img src={QuestionIcon} alt="Question" className="w-10 h-10" />
            </button>
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="w-2/3 bg-white p-8 rounded-lg shadow-xl">
                  <h2 className="text-2xl mb-8 font-bold">
                    줄거리 이렇게 작성해보세요!
                  </h2>
                  <h3 className="text-xl font-bold">
                    1. 간단하고 명확한 문자
                    <h4 className="font-normal">
                      예 : “길동이는 호기심이 많은 소년이었어요. 그는 학교
                      도서관에서 낡은 일기장을 발견했어요.”
                    </h4>
                  </h3>
                  <h3 className="text-xl mt-4 font-bold">
                    2. 흥미로운 시작
                    <h4 className="font-normal">
                      예 : “어느 날, 길동이는 도서관에서 오래된 일기장을
                      발견했어요. 그 일기장은 신비한 비밀을 담고 있었어요.”
                    </h4>
                  </h3>
                  <h3 className="text-xl mt-4 font-bold">
                    3. 상상력을 자극하는 요소
                    <h4 className="font-normal">
                      예 : “일기장에는 마법의 주문과 함께 50년 전 학교에서
                      일어난 신비로운 사건이 적혀 있었어요.”
                    </h4>
                  </h3>
                  <button
                    onClick={toggleModal}
                    className="mt-8 bg-gray-300 text-white p-2 rounded"
                  >
                    닫기
                  </button>
                </div>
              </div>
            )}
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

export default SummarySettingPage;
