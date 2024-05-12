import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPage, addUserChoice, updatePage } from "../features/storySlice";
// import { RootState } from "../features/storySlice";
import axios from "axios";
import Loading from "../components/Loading";

const FirstResultPage: React.FC = () => {
  const dispatch = useDispatch();
  const story = useSelector((state: any) => state.story.value as number);
  const pages = useSelector((state: any) => state.story.pages || []);
  const currentPage = useSelector((state: any) => {
    return state.story.pages && state.story.pages.length > 0
      ? state.story.pages[state.story.pages.length - 1]
      : null;
  }); //story 객체 내부에 pages로 접근하도록!

  const [loading, setLoading] = useState(false);

  const fetchConfig = () => {
    const token = localStorage.getItem("id");
    console.log("현재 토큰 :", token);
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

  //서버 데이터 파싱하는 함수
  const parseResponse = (responseText: string) => {
    const titleMatch = responseText.match(/제목: (.*)\n/);
    const title = titleMatch ? titleMatch[1] : undefined;
    const contentStart = titleMatch
      ? responseText.indexOf("\n", titleMatch.index) + 1
      : 0;
    const choiceStart = responseText.lastIndexOf("\nA. ");
    const content = responseText.substring(
      contentStart,
      choiceStart > -1 ? choiceStart : undefined
    );
    const choices = responseText
      .substring(choiceStart)
      .split("\n")
      .filter(
        (line) =>
          line.startsWith("A.") ||
          line.startsWith("B.") ||
          line.startsWith("C.")
      )
      .map((line) => line.substring(line.indexOf(" ") + 1).trim()); // 접두사 제외 문장만

    return { title: title || "", content, choices };
  };

  useEffect(() => {
    const fetchData = async () => {
      const config = fetchConfig();
      if (!config) return;
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8000/api/story/register/chatgpt/",
          { story_id: story },
          config
        );

        if (response.status === 200) {
          const parsedData = parseResponse(response.data.answer);
          console.log("추가된 데이터들 : ", parsedData);
          console.log("api 요청 성공!");
          dispatch(addPage({ pageId: Date.now(), ...parsedData }));
          console.log("페이지 저장 성공!");
        } else {
          console.error("API 요청 실패 :", response);
        }
      } catch (error) {
        console.error("API 요청 중 오류 발생 :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, story]); // `fetchData` 함수를 직접 `useEffect` 내부에 정의

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  const handleChoice = useCallback(
    async (choice: string) => {
      dispatch(
        addUserChoice({ pageId: currentPage?.pageId || 0, userChoice: choice })
      );
      const config = fetchConfig();
      if (!config) return;

      setLoading(true);
      try {
        // 첫 번째 API 요청: 이야기 저장
        const saveResponse = await axios.post(
          "http://localhost:8000/api/story/save_story/",
          { story_id: story, content: choice },
          config
        );

        console.log("첫 번째 API 요청 응답 :", saveResponse);

        if (saveResponse.status === 200) {
          console.log("이야기 저장 성공");

          // 두 번째 API 요청: 이야기 생성
          const updateResponse = await axios.post(
            "http://localhost:8000/api/story/register/chatgpt/",
            { story_id: story, user_choice: choice },
            config
          );

          console.log("두 번째 API 요청 응답 :", updateResponse);

          if (updateResponse.status === 200 && updateResponse.data.answer) {
            const parsedData = parseResponse(updateResponse.data.answer);
            dispatch(
              updatePage({ pageId: currentPage?.pageId || 0, ...parsedData })
            );
            console.log("이야기 생성 요청이 성공했습니다.");
          } else {
            console.error("이야기 생성 요청 실패 :", updateResponse);
          }
        } else {
          console.error("이야기 저장 실패 :", saveResponse);
        }
      } catch (error) {
        console.error("API 요청 중 오류가 발생했습니다:", error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, story, currentPage, fetchConfig]
  );

  useEffect(() => {
    console.log("Current page updated:", currentPage);
  }, [currentPage]);
  useEffect(() => {
    console.log("Pages array:", pages);
  }, [pages]);

  return (
    <div className="flex flex-col max-w-7xl bg-[#E7E3E0] opacity-75 h-screen mx-auto my-8 p-4 shadow-2xl">
      <div className="flex flex-grow">
        <div className="flex-1 p-2 border-r border-gray-300 bg-[#FDF9F6] overflow-y-auto shadow-4xl">
          <div className="prose">
            <h1>{currentPage?.title || ""}</h1>
            <p>{currentPage?.content || ""}</p>
            {currentPage?.choices && currentPage.choices.length > 0 ? (
              currentPage.choices.map((choice: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleChoice(choice)}
                  className="w-3/4 py-2 mb-4 rounded-2xl text-black text-ml bg-[#FFF0A3] hover:bg-[#FFF8D6] text-center shadow-lg hover:shadow-none"
                >
                  {choice}
                </button>
              ))
            ) : (
              <p></p>
            )}
          </div>
        </div>
        <div className="flex-1 p-4 bg-[#FDF9F6] overflow-y-auto">
          <p>이미지</p>
        </div>
      </div>
      <div className="w-full bg-[#FDF9F6] border-t border-gray-300 p-3">
        <p>{pages.length}</p>
      </div>
    </div>
  );
};

export default FirstResultPage;
