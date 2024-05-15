import React, { useState } from "react";
import { useSelector } from "react-redux";

interface Page {
  pageId: number;
  title?: string;
  content: string;
  imageUrl?: string;
}

const ResultPage: React.FC = () => {
  // Redux 스토어에서 pages 상태 직접 접근
  const pages = useSelector((state: any) =>
    state.story.pages.filter((page: Page) => [2, 3, 4, 5].includes(page.pageId))
  );
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // 현재 페이지 인덱스

  const nextPage = () => {
    setCurrentPageIndex((prev) => (prev + 1 < pages.length ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPageIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };

  return (
    <div className="result-page flex flex-col items-center justify-center min-h-screen bg-[#FDF9F6]">
      {pages.length > 0 ? (
        <>
          <div className="flex items-center justify-center  mt-8 mb-4">
            <h2 className="text-2xl font-bold text-black">
              {pages[currentPageIndex].title}
            </h2>
          </div>
          <div className="flex items-center justify-center w-full px-8">
            <div className="flex w-5/6 rounded-lg">
              <div className="w-1/6 flex items-center justify-center">
                {currentPageIndex > 0 && (
                  <button
                    className="w-12 h-12  bg-white text-gray-500 rounded-full flex justify-center items-center shadow-lg hover:shadow-none hover:bg-[#EBEBEB] hover:text-white"
                    onClick={prevPage}
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
                  src={pages[currentPageIndex].imageUrl}
                  alt="Page illustration"
                  className="w-2/3 h-full object-cover rounded-t-lg bg-white"
                />
              </div>
              <div className="w-1/6 flex items-center justify-center">
                {currentPageIndex < pages.length - 1 && (
                  <button
                    className="w-12 h-12 bg-white text-gray-500 rounded-full flex justify-center items-center shadow-lg hover:shadow-none hover:bg-[#EBEBEB] hover:text-white"
                    onClick={nextPage}
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

// api 조회 요청
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// interface Page {
//   pageId: number;
//   title: string;
//   content: string;
//   imageUrl?: string;
// }

// const ResultPage: React.FC = () => {
//   const location = useLocation();
//   const [pages, setPages] = useState<Page[]>([]);
//   //   const pages = useSelector((state: any) => state.story.pages || []);
//   const [loading, setLoading] = useState(false);

//   const story = location.state?.story;
//   console.log("story:", story);

//   const fetchPages = async () => {
//     if (!story) return;

//     try {
//       const response = await axios.get(
//         `http://localhost:8000/api/story-content/list?story_id=${story}`
//       );
//       if (response.status === 200) {
//         setPages(response.data.pages);
//         console.log("story", story);
//         console.log("페이지 불러오기 성공!", response.data.pages);
//       } else {
//         console.log("페이지 fetch 실패");
//       }
//     } catch (err) {
//       console.error("API 요청 중 오류 발생:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPages();
//   }, [story]); // story가 변경되면 fetchPages 실행

//   return (
//     <div className="result-page">
//       <h1>완성된 이야기</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           {pages.map((page, index) => (
//             <div key={index}>
//               <h2>Page {page.pageId}</h2>
//               <p>Title: {page.title}</p>
//               <p>{page.content}</p>
//               {page.imageUrl && (
//                 <img src={page.imageUrl} alt="Page illustration" />
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResultPage;
