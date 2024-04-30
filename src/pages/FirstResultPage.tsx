import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const FirstResultPage: React.FC = () => {
  const story = useSelector((state: any) => state.story.value as number);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [choices, setChoices] = useState<string[]>([]);

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

    try {
      const response = await axios.post(
        "http://localhost:8000/api/story/register/chatgpt/",
        { story },
        config
      );

      if (response.status === 200) {
        const answer = response.data.answer;
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
      }
    } catch (error) {
      console.error("API 요청 중 오류가 발생했습니다:", error);
    }
  }, [story]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChoice = async (choice: string) => {
    // const choicePrefix = choice.trim().charAt(0);
    const config = fetchConfig();
    if (!config) return;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/story/register/chatgpt/",
        { story, user_choice: choice }, //선택지 내용 전체를 서버로 전송하게 수정
        config
      );

      if (response.status === 200 && response.data.next_story) {
        setTitle(response.data.next_story.title);
        setContent(response.data.next_story.content);
        setChoices(response.data.next_story.choices);
      } else {
        console.error("API 요청이 실패했습니다.", response); //response값을 따로 저장해서 나중에 보내야함 ++ 수정 : 그림생성api를 따로 생성 저장
      }
    } catch (error) {
      console.error("API 요청 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="container mx-auto my-8 p-4">
      <div className="prose">
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
      <div>
        {choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleChoice(choice)}
            className="m-2 p-2 bg-blue-500 text-white rounded"
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FirstResultPage;
