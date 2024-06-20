import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPage, addUserChoice, setImage } from "../features/storySlice";

import axios, { AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const FirstResultPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const story = useSelector((state: any) => state.story.value as number);
  const pages = useSelector((state: any) => state.story.pages || []);

  const currentPage = useSelector((state: any) => {
    return state.story.pages.length > 0
      ? state.story.pages[state.story.pages.length - 1]
      : undefined; // null 대신 undefined 사용, 초기값 조정 필요시 조정
  }); //pages 배열이 비어 있으면 undefined를 반환

  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false); // 중복 호출을 방지하기 위한 상태
  const [config, setConfig] = useState<AxiosRequestConfig | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState("");
  const toggleEditModal = () => setIsEditing(!isEditing);

  useEffect(() => {
    const token = localStorage.getItem("id");
    if (!token) {
      console.error("토큰이 없습니다.");
      return;
    }
    setConfig({
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }, []);

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

    const pageId = pages.length + 1; // 페이지 ID를 순차적으로 증가시키도록 설정 (예시)
    console.log("pageId", pageId);

    return { pageId, title: title || "", content, choices };
  };

  useEffect(() => {
    console.log("Pages 업데이트됨:", pages);
  }, [pages]);

  //결과 페이지로 이동 추후 수정
  const handleViewCompletedBook = () => {
    navigate("/result", { state: { story: story } });
  };

  const fetchData = async (story: number, config: AxiosRequestConfig) => {
    if (!config) return;
    setLoading(true);
    try {
      // API 요청 : 첫번째 이야기 생성
      const response = await axios.post(
        "http://localhost:8000/api/story/register/chatgpt/",
        { story_id: story },
        config
      );
      if (response.status === 200) {
        const parsedData = parseResponse(response.data.answer);
        dispatch(addPage({ ...parsedData }));
        console.log("Redux에 페이지 추가됨", parsedData);

        // API 요청 : 이야기 저장
        const saveStoryResponse = await axios.post(
          "http://localhost:8000/api/story/save_story/",
          { story_id: story, content: parsedData.content },
          config
        );
        console.log("이야기 저장 성공! :", saveStoryResponse);
        await createAndSaveImage(parsedData.pageId, parsedData.content);
      } else {
        console.error("API 요청 실패 :", response);
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생 :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (config && !isFetching) {
      setIsFetching(true);
      fetchData(story, config).finally(() => setIsFetching(false));
    }
  }, [story, config]);

  const createAndSaveImage = async (pageId: number, content: string) => {
    if (!config) return;
    // 선택에 따른 이미지 생성 요청
    try {
      const imageResponse = await axios.post(
        "http://localhost:8000/api/story/register/chatgpt/image/",
        // { story_id: story, query: pages[pages.length].content },
        { story_id: story, query: content },
        config
      );
      console.log("이야기 생성 성공 :", imageResponse);

      // 이미지 저장 요청
      if (imageResponse.status === 200 && imageResponse.data.image_url) {
        dispatch(setImage({ pageId, imageUrl: imageResponse.data.image_url }));
        console.log("리덕스에 저장된 url :", imageResponse.data.image_url);

        const saveImageResponse = await axios.post(
          "http://localhost:8000/api/story/save_image/",
          {
            story_id: story,
            page_number: pageId,
            image_url: imageResponse.data.image_url,
          },
          config
        );
        console.log("이미지 저장 성공!", saveImageResponse);
      } else {
        console.error("이미지 생성 실패:", imageResponse);
      }
    } catch (error) {
      console.error("이미지 저장 중 오류 발생:", error);
    }
  };

  const handleChoice = useCallback(
    async (choice: string) => {
      if (!config) return;
      dispatch(
        addUserChoice({ pageId: currentPage?.pageId || 0, userChoice: choice })
      );
      setLoading(true);
      try {
        // 다음 API 요청: 이야기 생성
        const updateResponse = await axios.post(
          "http://localhost:8000/api/story/register/chatgpt/",
          { story_id: story, user_choice: choice },
          config
        );
        console.log("두 번째 API 요청 성공 :", updateResponse);

        if (updateResponse.status === 200 && updateResponse.data.answer) {
          const parsedData = parseResponse(updateResponse.data.answer);
          dispatch(
            addPage({ ...parsedData }) // 새로운 페이지를 추가
          );

          // 다음 API 요청 : 이야기 저장
          const saveStoryResponse = await axios.post(
            "http://localhost:8000/api/story/save_story/",
            { story_id: story, content: parsedData.content },
            config
          );
          console.log("저장된 이야기 내용 :", saveStoryResponse);

          await createAndSaveImage(parsedData.pageId, parsedData.content);
        } else {
          console.error("이야기 저장 요청 실패 :", updateResponse);
        }
      } catch (error) {
        console.error("API 요청 중 오류가 발생했습니다:", error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, story, currentPage, config]
  );

  const handleEditContent = async () => {
    if (!config || !isEditing) return;
    setLoading(true); // 처리 중 표시
    try {
      //수정된 내용 업데이트
      const updateResponse = await axios.put(
        `http://localhost:8000/api/story-content/update?story_id=${story}&page=${currentPage?.pageId}`,
        {
          content: newContent,
        },
        {
          headers: config.headers,
        }
      );

      if (updateResponse.status === 200) {
        console.log("내용이 성공적으로 수정되었습니다! :", updateResponse);

        // 새로운 선택지 요청
        const newChoicesResponse = await axios.post(
          "http://localhost:8000/api/story/update/",
          { story_id: story },
          config
        );
        console.log("새로운 선택지 요청 성공 :", newChoicesResponse);

        dispatch(
          addPage({
            content: newContent,
            choices: newChoicesResponse.data.choices,
          })
        );

        setIsEditing(false);
        setNewContent("");
      } else {
        console.error("이야기 업데이트 요청 실패 :", updateResponse);
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생 :", error);
      alert("Error updating content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-1/3 bg-[#E7E3E0] opacity-75 mx-auto my-8 p-4 shadow-2xl">
      <div className="flex flex-grow">
        <div className="flex-1 p-2 border-r border-gray-300 bg-[#FDF9F6] shadow-4xl">
          <div className="w-full h-1/2 mt-30 items-center">
            <div className="p-6 m-4 text-2xl font-bold">
              <h1>{currentPage?.title || ""}</h1>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-12 mt-8 mb-12 text-lg">
              <p>{currentPage?.content || ""}</p>
            </div>

            {currentPage?.choices && currentPage.choices.length > 0 ? (
              currentPage.choices.map((choice: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleChoice(choice)}
                  className="w-3/4 py-2 mb-4 rounded-2xl text-black text-lg bg-[#FFF0A3] hover:bg-[#FFF8D6] text-center shadow-lg hover:shadow-none"
                >
                  {choice}
                </button>
              ))
            ) : (
              <p></p>
            )}
          </div>
        </div>
        <div
          className="flex-1 p-8 w-full items-center justify-center bg-[#FDF9F6] text-lg"
          style={{ height: "700px" }}
        >
          {currentPage?.imageUrl ? (
            loading ? (
              <LoadingSpinner />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <img
                  src={currentPage.imageUrl}
                  alt="Story Illustration"
                  onLoad={() => setLoading(false)}
                  onError={() => {
                    console.error("이미지 로드 실패:", currentPage.imageUrl);
                    setLoading(false);
                  }}
                />
              </div>
            )
          ) : (
            <LoadingSpinner /> // 이미지 로딩 중 텍스트 대신 스피너 표시
          )}
        </div>
      </div>
      <div className="flex w-full items-center justify-center bg-[#FDF9F6] border-t border-gray-300 p-3">
        <p>{pages.length}</p>
      </div>
      <div className="flex items-center justify-center">
        {currentPage?.pageId <= 4 && (
          <button
            className="w-1/3 py-4 mt-4 mb-4 ml-4 p-4 font-bold text-black bg-[#FFF0A3] hover:bg-[#FFE55A] hover:text-white hover:shadow-none rounded-2xl text-center shadow-lg"
            onClick={toggleEditModal}
          >
            수정하기
          </button>
        )}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="w-1/2 h-1/2 bg-white p-8 rounded-lg shadow-xl">
              <h2 className="text-xl mb-4">내용 수정하기</h2>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="textarea"
                placeholder="수정할 내용을 입력하세요"
              />
              <button
                onClick={handleEditContent}
                className="mt-4 bg-gray-300 text-white p-2 rounded"
              >
                완료
              </button>
              <button
                onClick={toggleEditModal}
                className="mt-4 bg-gray-300 text-white p-2 rounded"
              >
                닫기
              </button>
            </div>
          </div>
        )}

        {pages.length >= 5 && (
          <button
            className="w-1/3 py-4 mt-4 mb-4 p-4 font-bold text-black bg-[#FFF0A3] hover:bg-[#FFE55A] hover:text-white hover:shadow-none rounded-2xl text-center shadow-lg"
            onClick={handleViewCompletedBook}
          >
            완성된 이야기를 확인해보세요!
          </button>
        )}
      </div>
    </div>
  );
};

export default FirstResultPage;
