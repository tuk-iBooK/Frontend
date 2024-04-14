import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setSummary } from "../features/summarySlice";

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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

      console.log("사용자 토큰:", token);
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
      }
    } catch (error) {
      console.error("API 요청 중 오류가 발생했습니다:", error);
    }
  };

  const handleGoBack = () => {
    navigate("/character");
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-3/4 mt-24 flex-1 justify-between items-center">
        <div className="bg-[#FFF0A3] p-4 mb-8 rounded-2xl shadow-lg">
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
