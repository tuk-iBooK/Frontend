import HTMLFlipBook from "react-pageflip";
import React, { useState, useEffect, ForwardRefRenderFunction } from "react";
import "src/App.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";

type PageProps = {
  children: React.ReactNode;
  number?: number;
};

interface PageData {
  page: number;
  content: string;
  image: string;
}

const PageCover: ForwardRefRenderFunction<
  HTMLDivElement,
  { children: React.ReactNode }
> = (props, ref) => {
  return (
    <div className="cover bg-white" ref={ref} data-density="hard">
      <div>
        <h2>{props.children}</h2>
      </div>
    </div>
  );
};

const Page: ForwardRefRenderFunction<HTMLDivElement, PageProps> = (
  props,
  ref
) => {
  return (
    <div className="page bg-white" ref={ref}>
      <h1 className="text-xl font-bold mb-4">Page Header</h1>
      <p>{props.children}</p>
      <p>{props.number}</p>
    </div>
  );
};

const PageCoverWithRef = React.forwardRef(PageCover);
const PageWithRef = React.forwardRef(Page);

const Flipbook: React.FC = () => {
  const location = useLocation();
  const [pages, setPages] = useState<PageData[]>([]);
  const reduxPages = useSelector((state: any) => state.story.pages);
  const titlePage = reduxPages.find((page: any) => page.pageId === 1); // pageId가 1인 페이지 가져오기
  const title = titlePage ? titlePage.title : ""; // 제목 가져오기
  const coverImageUrl = titlePage ? titlePage.imageUrl : ""; // 표지 가져오기

  const story = location.state?.story;
  console.log("story:", story);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get<PageData[]>(
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
  }, [story]);

  return (
    <div
      style={{ backgroundColor: "#E7E3E0", height: "100vh", padding: "60px" }}
    >
      {pages.length > 0 ? (
        <HTMLFlipBook
          width={550}
          height={650}
          flippingTime={1000}
          style={{ margin: "0 auto" }}
          maxShadowOpacity={0.5}
          className="album-web"
          showCover={true}
        >
          <PageCoverWithRef>
            <h2>{title}</h2>
            {coverImageUrl && (
              <img
                src={coverImageUrl}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            )}
          </PageCoverWithRef>
          {pages.map((page, index) => (
            <PageWithRef number={page.page} key={index}>
              <img
                src={page.image}
                alt={`Page ${page.page}`}
                className="w-full h-72 object-cover mb-4"
              />
              <p>{page.content}</p>
            </PageWithRef>
          ))}
          <PageCoverWithRef>see you</PageCoverWithRef>
        </HTMLFlipBook>
      ) : (
        <p>지정된 ID의 페이지가 없습니다.</p>
      )}
    </div>
  );
};

export default Flipbook;
