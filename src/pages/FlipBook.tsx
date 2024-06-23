import HTMLFlipBook from "react-pageflip";
import React, { useState, useEffect, ForwardRefRenderFunction } from "react";
import "src/App.css";
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

  const [inputText, setInputElement] = useState<string>("");
  const [text, setText] = useState<string>("이게머냐구");

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
      style={{ backgroundColor: "lightgray", height: "100vh", padding: "20px" }}
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
          <PageCoverWithRef>try</PageCoverWithRef>
          {pages.map((page, index) => (
            <PageWithRef number={page.page} key={index}>
              <img
                src={page.image}
                alt={`Page ${page.page}`}
                className="w-full h-64 object-cover mb-4 rounded"
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

{
  /* <HTMLFlipBook
        width={550}
        height={650}
        flippingTime={1000}
        style={{ margin: "0 auto" }}
        maxShadowOpacity={0.5}
        className="flipbook"
        showCover={true} // 표지 표시
      >
        <PageCoverWithRef>try</PageCoverWithRef>
        <PageCoverWithRef> </PageCoverWithRef>
        <PageWithRef number="1">
          <hr></hr>
          <p contentEditable="true">이게뭐양</p>
        </PageWithRef>
        <PageWithRef number="2">
          <hr></hr>
          <p>{text}</p>
        </PageWithRef>
        <PageWithRef number="3">
          <hr></hr>
        </PageWithRef>
        <PageWithRef number="4">
          <hr></hr>
        </PageWithRef>
        <PageCoverWithRef> </PageCoverWithRef>
        <PageCoverWithRef>담에 봐유</PageCoverWithRef>
      </HTMLFlipBook>
      <br></br>
      <br></br>
    </div>
  );
}; */
}

export default Flipbook;
