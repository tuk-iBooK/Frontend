import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUserChoice, updateStory, AppState } from "../features/appSlice";
import axios from "axios";
import Loading from "../components/Loading";

const FirstResultPage: React.FC = () => {
  const dispatch = useDispatch();

  const story = useSelector((state: any) => state.story.value as number);
  const userChoices = useSelector((state: AppState) => state.userChoices);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [choices, setChoices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // API 호출 설정을 추출 및 중복을 제거하기 위한 함수
  const fetchConfig = () => {
    const token = localStorage.getItem("id");
    if (!token) {
      console.error("토큰이 없습니다.");
      return null;
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  };

  const fetchData = useCallback(async () => {
    const config = fetchConfig();
    if (!config) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/story/register/chatgpt/",
        { story },
        config
      );

      if (response.status === 200) {
        const { answer } = response.data;
        // const answer = response.data.answer;
        const titleMatch = answer.match(/제목: (.*)\n/);
        if (titleMatch) setTitle(titleMatch[1]);

        const contentStart =
          answer.indexOf("제목: ") + (titleMatch ? titleMatch[0].length : 0);
        const choiceStart = answer.lastIndexOf("\nA. ");
        if (choiceStart > -1) {
          setContent(answer.substring(contentStart, choiceStart));
          const choiceText = answer.substring(choiceStart);
          const choicesArray = choiceText
            .split("\n")
            .filter(
              (line: string) =>
                line.startsWith("A.") ||
                line.startsWith("B.") ||
                line.startsWith("C.")
            );
          setChoices(choicesArray);
        } else {
          setContent(answer.substring(contentStart));
        }
      } else {
        console.error("API 요청이 실패했습니다.");
        setLoading(true);
      }
    } catch (error) {
      console.error("API 요청 중 오류가 발생했습니다:", error);
      setLoading(true);
    }
  }, [story]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChoice = async (choice: string) => {
    const config = fetchConfig();
    if (!config) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/story/register/chatgpt/",
        { story, user_choice: choice }, //선택지 내용 전체를 서버로 전송하게 수정
        config
      );

      if (response.status === 200 && response.data.answer) {
        const { answer } = response.data;

        setContent(response.data.answer.content);
        setChoices(response.data.answer.choices);

        dispatch(addUserChoice(choice));
        dispatch(updateStory(answer.id));
        console.log("API 요청이 성공했습니다.");
      } else {
        console.error("API 요청이 실패했습니다.", response); //response값을 따로 저장해서 나중에 보내야함 ++ 수정 : 그림생성api를 따로 생성 저장
        setLoading(true);
      }
    } catch (error) {
      console.error("API 요청 중 오류가 발생했습니다:", error);
      setLoading(true);
    }
  };

  return (
    <div className="flex flex-col max-w-7xl bg-[#E7E3E0] opacity-75 h-screen mx-auto my-8 p-4 shadow-2xl">
      <div className="flex flex-grow">
        <div className="flex-1 p-2 border-r border-gray-300 bg-[#FDF9F6] overflow-y-auto shadow-4xl">
          <div className="prose">
            <h1>{title || ""}</h1>
            <p>{content}</p>
          </div>
          {choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(choice)}
              className="w-3/4 py-2 mb-4 rounded-2xl text-black text-ml bg-[#FFF0A3] hover:bg-[#FFF8D6] text-center shadow-lg hover:shadow-none"
            >
              {choice}
            </button>
          ))}
        </div>
        <div className="flex-1 p-4 bg-[#FDF9F6] overflow-y-auto">
          {/* 이미지 */}
          <p>이미지</p>
        </div>
      </div>
      <div className="w-full bg-[#FDF9F6] border-t border-gray-300 p-3">
        {/* 페이지 번호 */}
        <p>1</p>
      </div>
    </div>
  );
};

export default FirstResultPage;
