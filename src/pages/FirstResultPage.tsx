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
  const [isFetching, setIsFetching] = useState(false); // 중복 호출을 방지하기 위한 로직

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

  // useEffect(() => {
  //   const config = fetchConfig();
  //   if (config) {
  //     fetchData(story, config);
  //   }
  // }, [story]);

  // useEffect(() => {
  //   console.log("fetchData 호출 전:", story);
  //   const config = fetchConfig();
  //   if (config) {
  //     fetchData(story, config);
  //   }
  // }, []); // 의존성 배열을 빈 배열로 설정

  useEffect(() => {
    console.log("Pages 업데이트됨:", pages);
  }, [pages]);

  const handleViewCompletedBook = () => {
    // navigate(`/result${story}`); // ResultPage 컴포넌트에 story id를 파라미
    navigate("/result", { state: { story: story } });
  };

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

        // const lastPage = pages.length > 0 ? pages[pages.length - 1] : null;
        // if (!lastPage || lastPage.content !== parsedData.content) {
        //   dispatch(addPage({ ...parsedData }));
        //   console.log("Redux에 페이지 추가됨", parsedData);
        // }
        dispatch(addPage({ ...parsedData }));
        console.log("Redux에 페이지 추가됨", parsedData);

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
    console.log("Component mounted, fetching data for story:", story);
    if (!isFetching) {
      const config = fetchConfig();
      if (config) {
        setIsFetching(true);
        fetchData(story, config).finally(() => setIsFetching(false));
      }
    }
  }, [story]); // 스토리 ID가 변경되지 않는 경우, 이 useEffect는 실행되지 않습니다.

  // useEffect(() => {
  //   console.log("currentPage 변경됨, 이미지 생성 검토:", currentPage);
  //   if (currentPage && !currentPage.imageUrl) {
  //     createAndSaveImage(currentPage.pageId);
  //   }
  // }, [currentPage?.imageUrl, currentPage?.pageId]); // 의존성 배열 수정 (<< currentPage)

  useEffect(() => {
    if (currentPage && !currentPage.imageUrl && !isFetching) {
      console.log(
        "Creating and saving image for currentPage:",
        currentPage.pageId
      );
      setIsFetching(true);
      createAndSaveImage(currentPage.pageId).finally(() =>
        setIsFetching(false)
      );
    }
  }, [currentPage?.imageUrl, currentPage?.pageId]); // Trigger only if these specific fields change

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

  const handleChoice = useCallback(
    async (choice: string) => {
      dispatch(
        addUserChoice({ pageId: currentPage?.pageId || 0, userChoice: choice })
      );
      const config = fetchConfig();
      if (!config) return;

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
          // dispatch(
          //   updatePage({ pageId: currentPage?.pageId || 0, ...parsedData })
          // );
          dispatch(
            addPage({ ...parsedData }) // 새로운 페이지를 추가
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
    [dispatch, story, currentPage, fetchConfig] //FDF9F6
  );

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
          {/* {currentPage?.imageUrl ? (
            <img src={currentPage.imageUrl} alt="Story Illustration" />
          ) : (
            <p>이미지 로딩 중...</p>
          )} */}

          {currentPage?.imageUrl ? (
            loading ? (
              <LoadingSpinner />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <img
                  src={currentPage.imageUrl}
                  alt="Story Illustration"
                  onLoad={() => setLoading(false)}
                />
              </div>
            )
          ) : (
            <LoadingSpinner /> // 이미지 로딩 중 텍스트 대신 스피너 표시
          )}
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-[#FDF9F6] border-t border-gray-300 p-3">
        {/* 임시 방편 */}
        <p>{pages.length - 1}</p>
      </div>
      <div className="flex items-center justify-center">
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
