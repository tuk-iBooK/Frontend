import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addPage,
  addUserChoice,
  updatePage,
  setImage,
} from "../features/storySlice";

import axios, { AxiosRequestConfig } from "axios";
import Loading from "../components/Loading";

const FirstResultPage: React.FC = () => {
  const dispatch = useDispatch();
  const story = useSelector((state: any) => state.story.value as number);
  const pages = useSelector((state: any) => state.story.pages || []);

  const currentPage = useSelector((state: any) => {
    return state.story.pages.length > 0
      ? state.story.pages[state.story.pages.length - 1]
      : undefined; // null 대신 undefined 사용, 초기값 조정 필요시 조정
  }); //pages 배열이 비어 있으면 undefined를 반환
  const pageId = currentPage?.pageId ?? 0; //약 currentPage가 null이거나 undefined일 경우, pageId는 0으로 설정

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
    const config = fetchConfig();
    if (config) {
      fetchData(story, config);
    }
  }, [story]);

  useEffect(() => {
    console.log("Pages updated:", pages);
  }, [pages]);

  // const fetchData = async (story: number, config: AxiosRequestConfig) => {
  //   setLoading(true);
  //   // API 요청 : 이야기 생성
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/api/story/register/chatgpt/",
  //       { story_id: story },
  //       config
  //     );

  //     if (response.status === 200) {
  //       const parsedData = parseResponse(response.data.answer);
  //       console.log("추가된 데이터들 : ", parsedData);
  //       console.log("이야기 생성 api 요청 성공!");
  //       dispatch(addPage({ ...parsedData })); // 생성된 pageId 사용

  //       // API 요청 : 이야기 저장
  //       const saveStoryResponse = await axios.post(
  //         "http://localhost:8000/api/story/save_story/",
  //         { story_id: story, content: parsedData.content },
  //         config
  //       );
  //       console.log("이야기 저장 성공! :", saveStoryResponse);

  //       // 이미지 생성 API 요청
  //       const imageResponse = await axios.post(
  //         "http://localhost:8000/api/story/register/chatgpt/image/",
  //         { story_id: story, query: parsedData.content },
  //         config
  //       );
  //       console.log("이미지 생성 성공 :", imageResponse);

  //       if (imageResponse.status === 200 && imageResponse.data.image_url) {
  //         dispatch(
  //           setImage({
  //             pageId: currentPage?.pageId || 0,
  //             imageUrl: imageResponse.data.image_url,
  //           })
  //         );
  //         console.log("Pages updated:", pages);
  //         console.log("currentPage?.pageId : ", currentPage?.pageId);
  //         console.log("pageId : ", pageId);

  //         // if (currentPage && currentPage.pageId) {
  //         console.log("Saving image with pageId:", currentPage?.pageId);

  //         // 이미지 url 저장 요청
  //         await axios.post(
  //           "http://localhost:8000/api/story/save_image/",
  //           {
  //             story_id: story,
  //             page_number: currentPage?.pageId,
  //             image_url: imageResponse.data.image_url,
  //           },
  //           config
  //         );
  //         console.log("이미지 저장 성공:", imageResponse.data.image_url);
  //       } else {
  //         console.error("이미지 저장 실패:", imageResponse);
  //       }
  //     } else {
  //       console.error("API 요청 실패 :", response);
  //     }
  //   } catch (error) {
  //     console.error("API 요청 중 오류 발생 :", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchData = async (story: number, config: AxiosRequestConfig) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/story/register/chatgpt/",
        { story_id: story },
        config
      );
      if (response.status === 200) {
        const parsedData = parseResponse(response.data.answer);
        dispatch(addPage({ ...parsedData }));
        console.log("Redux에 페이지 추가됨");

        // API 요청 : 이야기 저장
        const saveStoryResponse = await axios.post(
          "http://localhost:8000/api/story/save_story/",
          { story_id: story, content: parsedData.content },
          config
        );
        console.log("이야기 저장 성공! :", saveStoryResponse);
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
    console.log("currentPage 변경됨, 이미지 생성 검토:", currentPage);
    if (currentPage && !currentPage.imageUrl) {
      createAndSaveImage(currentPage.pageId);
    }
  }, [currentPage]);

  const createAndSaveImage = async (pageId: number) => {
    const config = fetchConfig();
    if (!config) return;

    // 이미지 생성 요청
    try {
      const imageResponse = await axios.post(
        "http://localhost:8000/api/story/register/chatgpt/image/",
        { story_id: story, query: pages[pages.length - 1].content },
        config
      );
      console.log("이야기 생성 성공 :", imageResponse);

      // 이미지 저장 요청
      if (imageResponse.status === 200 && imageResponse.data.image_url) {
        dispatch(setImage({ pageId, imageUrl: imageResponse.data.image_url }));
        console.log("Redux 상태에 이미지 URL 설정");

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

  // useEffect(() => {
  //   if (currentPage && currentPage.imageUrl) {
  //     console.log("New Image URL:", currentPage.imageUrl);
  //   }
  // }, [currentPage]);

  const handleChoice = useCallback(
    async (choice: string) => {
      dispatch(
        addUserChoice({ pageId: currentPage?.pageId || 0, userChoice: choice })
      );
      const config = fetchConfig();
      if (!config) return;

      setLoading(true);
      try {
        // 두 번째 API 요청: 이야기 생성
        const updateResponse = await axios.post(
          "http://localhost:8000/api/story/register/chatgpt/",
          { story_id: story, user_choice: choice },
          config
        );
        console.log("두 번째 API 요청 성공 :", updateResponse);

        if (updateResponse.status === 200 && updateResponse.data.answer) {
          const parsedData = parseResponse(updateResponse.data.answer);
          dispatch(
            updatePage({ pageId: currentPage?.pageId || 0, ...parsedData })
          );

          // 두번째 API 요청 : 이야기 저장
          const saveStoryResponse = await axios.post(
            "http://localhost:8000/api/story/save_story/",
            { story_id: story, content: parsedData.content },
            config
          );
          console.log("저장된 이야기 내용 :", saveStoryResponse);

          // 이미지 생성 요청
          const imageResponse = await axios.post(
            "http://localhost:8000/api/story/register/chatgpt/image/",
            { story_id: story, query: parsedData.content },
            config
          );

          if (imageResponse.status === 200 && imageResponse.data.image_url) {
            dispatch(
              setImage({
                pageId: currentPage?.pageId,
                imageUrl: imageResponse.data.image_url,
              })
            );
            console.log("이미지 생성 성공:", imageResponse.data.image_url);

            // 이미지 저장 요청
            await axios.post(
              "http://localhost:8000/api/story/save_image/",
              {
                story_id: story,
                page_number: currentPage?.pageId,
                image_url: imageResponse.data.image_url,
              },
              config
            );
            console.log("이미지 저장 성공");
          } else {
            console.error("이미지 생성 요청 실패:", imageResponse);
          }
        } else {
          console.error("이야기 저장 요청 실패 :", updateResponse);
        }
      } catch (error) {
        console.error("API 요청 중 오류가 발생했습니다:", error);
      } finally {
        setLoading(false);
      }
    },
    [pages, dispatch, story, currentPage, fetchConfig, pages.length]
  );

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
          {currentPage?.imageUrl ? (
            <img src={currentPage.imageUrl} alt="Story Illustration" />
          ) : (
            <p>이미지 로딩 중...</p>
          )}
        </div>
      </div>
      <div className="w-full bg-[#FDF9F6] border-t border-gray-300 p-3">
        <p>{pages.length + 1}</p>
      </div>
    </div>
  );
};

export default FirstResultPage;
