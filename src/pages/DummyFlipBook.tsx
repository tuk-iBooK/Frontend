import React, { ForwardedRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import image1 from "../assets/public/01.png";
import image2 from "../assets/public/02.png";
import image3 from "../assets/public/03.png";
import image4 from "../assets/public/04.png";
import image5 from "../assets/public/05.png";
import image6 from "../assets/public/06.png";
import image7 from "../assets/public/07.png";
import image8 from "../assets/public/08.png";
import image9 from "../assets/public/09.png";

interface PageProps {
  children?: React.ReactNode;
  number?: number;
}

interface PageCoverProps {
  children?: React.ReactNode;
  number?: number;
}

const PageCover = React.forwardRef<HTMLDivElement, PageCoverProps>(
  ({ children }, ref) => {
    const [title, imageUrl] = React.Children.toArray(children);
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
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        )}
      </div>
    );
  }
);

const Page = React.forwardRef<HTMLDivElement, PageProps>(
  ({ number, children }, ref) => (
    <div
      className="page bg-[#FDF9F6] p-8 shadow-2xl rounded-lg h-full"
      ref={ref}
    >
      <div className="flex flex-col items-center justify-between h-full">
        <div className="flex-grow w-full mb-4 text-lg mt-8">{children}</div>
        {number && (
          <div className="w-full text-center text-sm mt-auto">{number}</div>
        )}
      </div>
    </div>
  )
);

const DummyFlipBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const bookId = parseInt(id || "1", 10); // 문자열을 숫자로 변환, 기본값은 1
  const navigate = useNavigate();

  const books = [
    {
      id: 1,
      title: "마법의 숲 공주의 비밀",
      coverImageUrl: image1,
      pages: [
        {
          page: 1,
          image: image1,
          content: "첫 번째 이야기의 시작입니다.",
        },
        {
          page: 2,
          image: image7,
          content: "모험은 계속됩니다.",
        },
        {
          page: 3,
          image: image6,
          content: "모험은 계속됩니다.",
        },
        {
          page: 4,
          image: image8,
          content: "모험은 계속됩니다.",
        },
        {
          page: 5,
          image: image9,
          content: "모험은 계속됩니다.",
        },
      ],
    },
    {
      id: 2,
      title: "꿈 같은 곳에서",
      coverImageUrl: image2,
      pages: [
        {
          page: 1,
          image: "https://example.com/page1-1.png",
          content: "첫 번째 이야기의 시작입니다.",
        },
        {
          page: 2,
          image: "https://example.com/page1-2.png",
          content: "모험은 계속됩니다.",
        },
        {
          page: 3,
          image: "https://example.com/page1-2.png",
          content: "모험은 계속됩니다.",
        },
        {
          page: 4,
          image: "https://example.com/page1-2.png",
          content: "모험은 계속됩니다.",
        },
        {
          page: 5,
          image: "https://example.com/page1-2.png",
          content: "모험은 계속됩니다.",
        },
      ],
    },
    {
      id: 3,
      title: "숲의 인도자",
      coverImageUrl: image3,
      pages: [
        {
          page: 1,
          image: "https://example.com/page1-1.png",
          content: "첫 번째 이야기의 시작입니다.",
        },
        {
          page: 2,
          image: "https://example.com/page1-2.png",
          content: "모험은 계속됩니다.",
        },
        {
          page: 3,
          image: "https://example.com/page1-2.png",
          content: "모험은 계속됩니다.",
        },
        {
          page: 4,
          image: "https://example.com/page1-2.png",
          content: "모험은 계속됩니다.",
        },
        {
          page: 5,
          image: "https://example.com/page1-2.png",
          content: "모험은 계속됩니다.",
        },
      ],
    },
    {
      id: 4,
      title: "요정들의 시계탑",
      coverImageUrl: image8,
      pages: [
        {
          page: 1,
          image: "https://example.com/page1-1.png",
          content: "첫 번째 이야기의 시작입니다.",
        },
        {
          page: 2,
          image: "https://example.com/page1-2.png",
          content: "모험은 계속됩니다.",
        },
        {
          page: 3,
          image: "https://example.com/page1-2.png",
          content: "모험은 계속됩니다.",
        },
        {
          page: 4,
          image: "https://example.com/page1-2.png",
          content: "모험은 계속됩니다.",
        },
        {
          page: 5,
          image: "https://example.com/page1-2.png",
          content: "모험은 계속됩니다.",
        },
      ],
    },
    {
      id: 5,
      title: "신비로운 모험",
      coverImageUrl: image5,
      pages: [
        {
          page: 1,
          image: "https://example.com/page1-1.png",
          content: "첫 번째 이야기의 시작입니다.",
        },
        {
          page: 2,
          image: "https://example.com/page1-2.png",
          content: "모험은 계속됩니다.",
        },
        {
          page: 3,
          image: "https://example.com/page1-2.png",
          content: "모험은 계속됩니다.",
        },
        {
          page: 4,
          image: "https://example.com/page1-2.png",
          content: "모험은 계속됩니다.",
        },
        {
          page: 5,
          image: "https://example.com/page1-2.png",
          content: "모험은 계속됩니다.",
        },
      ],
    },
  ];

  // books 배열에서 전달된 bookId에 맞는 책을 찾음
  const selectedBook = books.find((book) => book.id === bookId);

  // selectedBook이 없는 경우 처리
  if (!selectedBook) {
    return <p>해당 책을 찾을 수 없습니다.</p>;
  }

  return (
    <div className="bg-[#FAF0E6] min-h-screen h-screen flex justify-center items-center overflow-hidden">
      <HTMLFlipBook
        width={550}
        height={650}
        flippingTime={1000}
        style={{ margin: "0 auto" }}
        maxShadowOpacity={0.5}
        className="album-web"
        showCover={true}
      >
        {/* 표지 */}
        <PageCover>
          <h2>{selectedBook.title}</h2>
          {selectedBook.coverImageUrl && (
            <img
              src={selectedBook.coverImageUrl}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          )}
        </PageCover>

        {/* 페이지 */}
        {selectedBook.pages.map((page, index) => (
          <Page number={page.page} key={index}>
            <div>
              <img
                src={page.image}
                alt={`Page ${page.page}`}
                className="w-full h-64 object-cover mb-4"
              />
              <p>{page.content}</p>
            </div>
          </Page>
        ))}

        {/* 마지막 페이지 */}
        <PageCover>
          <div className="flex flex-col items-center justify-center">
            <button
              className="w-full py-2 text-base mb-8 p-4 bg-[#FFF0A3] hover:bg-[#FFE55A] hover:text-white hover:shadow-none rounded-2xl text-center shadow-lg"
              onClick={() => navigate("/")}
            >
              홈으로 돌아가기
            </button>
          </div>
        </PageCover>
      </HTMLFlipBook>
    </div>
  );
};

export default DummyFlipBook;
