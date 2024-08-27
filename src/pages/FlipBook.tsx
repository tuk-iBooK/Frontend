import HTMLFlipBook from "react-pageflip";
import React, { useState, useEffect, ForwardRefRenderFunction } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
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
  const [title, imageUrl] = React.Children.toArray(props.children);
  return (
    <div
      className="relative w-full h-full overflow-hidden shadow-2xl rounded-lg"
      ref={ref}
      data-density="hard"
    >
      {title && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-black text-center z-10">
          {title}
        </div>
      )}
      {imageUrl && React.isValidElement(imageUrl) && (
        <img
          src={imageUrl.props.src}
          alt="Cover"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
        />
      )}
    </div>
  );
};

const Page: ForwardRefRenderFunction<HTMLDivElement, PageProps> = (
  props,
  ref
) => {
  return (
    <div
      className="page bg-[#FDF9F6] p-8 shadow-2xl rounded-lg h-full"
      ref={ref}
    >
      <div className="flex flex-col items-center justify-between h-full">
        <div className="flex-grow w-full mb-4 text-lg mt-8">
          {props.children}
        </div>
        {props.number && (
          <div className="w-full text-center text-sm mt-auto">
            {props.number}
          </div>
        )}
      </div>
    </div>
  );
};

const PageCoverWithRef = React.forwardRef(PageCover);
const PageWithRef = React.forwardRef(Page);

const Flipbook: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
          `http://localhost:8000/api/story-content/list/?story_id=${story}`
        );
        if (Array.isArray(response.data)) {
          setPages(response.data);
          console.log("Fetched pages:", response.data);
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
    <div className="bg-[#FAF0E6] min-h-screen p-16 flex justify-center items-center">
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
              <div>
                <img
                  src={page.image}
                  alt={`Page ${page.page}`}
                  className="w-full h-64 object-cover mb-4"
                />
                <p>{page.content}</p>
              </div>
            </PageWithRef>
          ))}
          <PageCoverWithRef>
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-lg font-bold mb-12">
                이야기가 완성되었습니다!
              </h2>
              <button
                className="w-full py-2 text-base mb-8 p-4 bg-[#FFF0A3] hover:bg-[#FFE55A] hover:text-white hover:shadow-none rounded-2xl text-center shadow-lg"
                onClick={() => navigate("/")}
              >
                홈으로 돌아가기
              </button>
              <button
                className="w-full py-2 text-base p-4 bg-[#FFF0A3] hover:bg-[#FFE55A] hover:text-white hover:shadow-none rounded-2xl text-center shadow-lg"
                onClick={() => navigate("/profile")}
              >
                내 책장 바로가기
              </button>
            </div>
          </PageCoverWithRef>
        </HTMLFlipBook>
      ) : (
        <p>지정된 ID의 페이지가 없습니다.</p>
      )}
    </div>
  );
};

export default Flipbook;
