import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";

// interface Page {
//   pageId: number;
//   title: string;
//   content: string;
//   imageUrl?: string;
// }

interface Page {
  page: number;
  content: string;
  image: string; // URL을 문자열로 가정
}

const ResultPage: React.FC = () => {
  const location = useLocation();
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const story = location.state?.story;
  console.log("story:", story);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get<Page[]>(
          `http://localhost:8000/api/story-content/list?story_id=${story}`
        );
        if (Array.isArray(response.data)) {
          setPages(response.data);
        } else {
          setPages([]); // 응답 데이터가 배열이 아닌 경우 빈 배열로 초기화
        }
      } catch (error) {
        console.error("Error fetching pages:", error);
        setPages([]); // 오류 발생 시 빈 배열로 초기화
      }
    };

    fetchPages();
  }, []);

  return (
    <div className="result-page flex flex-col items-center justify-center min-h-screen bg-[#FDF9F6]">
      {pages.length > 0 ? (
        <>
          <div className="flex items-center justify-center mt-8 mb-4">
            <h2 className="text-2xl font-bold text-black">
              {pages[currentPageIndex].page}
            </h2>
          </div>
          <div className="flex items-center justify-center w-full px-8">
            <div className="flex w-5/6 rounded-lg">
              <div className="w-1/6 flex items-center justify-center">
                {currentPageIndex > 0 && (
                  <button
                    className="w-12 h-12  bg-white text-gray-500 rounded-full flex justify-center items-center shadow-lg hover:shadow-none hover:bg-[#EBEBEB] hover:text-white"
                    onClick={() =>
                      setCurrentPageIndex((prev) => Math.max(prev - 1, 0))
                    }
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
                )}
              </div>
              <div className="w-full flex-grow flex justify-center items-center">
                <img
                  src={pages[currentPageIndex].image}
                  alt={`Page ${pages[currentPageIndex].page}`}
                  className="w-2/3 h-full object-cover rounded-t-lg bg-white"
                />
              </div>
              <div className="w-1/6 flex items-center justify-center">
                {currentPageIndex < pages.length - 1 && (
                  <button
                    className="w-12 h-12 bg-white text-gray-500 rounded-full flex justify-center items-center shadow-lg hover:shadow-none hover:bg-[#EBEBEB] hover:text-white"
                    onClick={() =>
                      setCurrentPageIndex((prev) =>
                        Math.min(prev + 1, pages.length - 1)
                      )
                    }
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
                )}
              </div>
            </div>
          </div>
          <div className="text-center text-black w-5/6 text-lg mt-0">
            <div className="bg-white shadow-lg rounded-lg p-12 w-full">
              <p>{pages[currentPageIndex].content}</p>
            </div>
          </div>
        </>
      ) : (
        <p>지정된 ID의 페이지가 없습니다.</p>
      )}
    </div>
  );
};

export default ResultPage;
