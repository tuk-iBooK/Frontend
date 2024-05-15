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
    <div className="result-page">
      <h1>완성된 이야기</h1>
      {pages.length > 0 ? (
        <>
          <div className="page">
            <h2>{pages[currentPageIndex].pageId}</h2>
            <p>
              <strong>{pages[currentPageIndex].title}</strong>
            </p>
            <p>
              <strong>{pages[currentPageIndex].content}</strong>
            </p>
            {pages[currentPageIndex].imageUrl && (
              <img
                src={pages[currentPageIndex].imageUrl}
                alt="Page illustration"
              />
            )}
          </div>
          <div>
            {currentPageIndex > 0 && (
              <button onClick={prevPage}>이전 페이지</button>
            )}
            {currentPageIndex < pages.length - 1 && (
              <button onClick={nextPage}>다음 페이지</button>
            )}
          </div>
        </>
      ) : (
        <p>지정된 ID의 페이지가 없습니다.</p>
      )}
    </div>
  );
};

export default ResultPage;

// 이건 잘댐

// import React from "react";
// import { useSelector } from "react-redux";

// interface Page {
//   pageId: number;
//   title?: string;
//   content: string;
//   choices?: string[];
//   imageUrl?: string;
// }

// const ResultPage: React.FC = () => {
//   const pages = useSelector((state: any) =>
//     state.story.pages.filter((page: Page) => [2, 3, 4, 5].includes(page.pageId))
//   );

//   return (
//     <div className="result-page">
//       <h1>완성된 이야기</h1>
//       {pages.length > 0 ? (
//         pages.map((page: Page, index: number) => (
//           <div key={index} className="page">
//             <h2>{page.pageId}</h2>
//             <p>
//               <strong>{page.title}</strong>
//             </p>
//             <p>
//               <strong> {page.content}</strong>
//             </p>
//             {page.imageUrl && (
//               <img src={page.imageUrl} alt="Page illustration" />
//             )}
//           </div>
//         ))
//       ) : (
//         <p>No pages found for the specified IDs.</p>
//       )}
//     </div>
//   );
// };

// export default ResultPage;

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
