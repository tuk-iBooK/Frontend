import React, { ForwardedRef } from "react";
import HTMLFlipBook from "react-pageflip";

// 타입 정의
interface PageProps {
  children?: React.ReactNode;
  number?: number;
}

interface PageCoverProps {
  children?: React.ReactNode;
  number?: number;
}

// 페이지 커버 컴포넌트 (표지)
const PageCover = React.forwardRef<HTMLDivElement, PageCoverProps>(
  ({ children }, ref) => (
    <div className="relative w-full h-full" ref={ref} data-density="hard">
      {children}
    </div>
  )
);

// 페이지 컴포넌트 (본문)
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
  const books = [
    {
      id: 1,
      title: "모험의 시작",
      coverImageUrl: "https://example.com/cover1.png",
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
          page: 2,
          image: "https://example.com/page1-2.png",
          content: "모험은 계속됩니다.",
        },
        {
          page: 2,
          image: "https://example.com/page1-2.png",
          content: "모험은 계속됩니다.",
        },
        {
          page: 2,
          image: "https://example.com/page1-2.png",
          content: "모험은 계속됩니다.",
        },
      ],
    },
    {
      id: 2,
      title: "숲 속의 비밀",
      coverImageUrl: "https://example.com/cover2.png",
      pages: [
        {
          page: 1,
          image: "https://example.com/page2-1.png",
          content: "어느 날 숲 속에서 발견한 비밀.",
        },
        {
          page: 2,
          image: "https://example.com/page2-2.png",
          content: "그 비밀을 찾아 떠난 여정.",
        },
      ],
    },
    {
      id: 3,
      title: "하늘을 나는 모험",
      coverImageUrl: "https://example.com/cover3.png",
      pages: [
        {
          page: 1,
          image: "https://example.com/page3-1.png",
          content: "하늘을 나는 이야기의 시작.",
        },
        {
          page: 2,
          image: "https://example.com/page3-2.png",
          content: "구름 위에서의 모험.",
        },
      ],
    },
    {
      id: 4,
      title: "바닷속 탐험",
      coverImageUrl: "https://example.com/cover4.png",
      pages: [
        {
          page: 1,
          image: "https://example.com/page4-1.png",
          content: "깊은 바닷속에서 펼쳐지는 이야기.",
        },
        {
          page: 2,
          image: "https://example.com/page4-2.png",
          content: "해저 생물들과의 만남.",
        },
      ],
    },
    {
      id: 5,
      title: "마법의 성",
      coverImageUrl: "https://example.com/cover5.png",
      pages: [
        {
          page: 1,
          image: "https://example.com/page5-1.png",
          content: "마법의 성에서 벌어지는 신비한 일들.",
        },
        {
          page: 2,
          image: "https://example.com/page5-2.png",
          content: "그 성에서의 모험.",
        },
      ],
    },
  ];

  // 더미 데이터 중 첫 번째 책을 선택하여 FlipBook으로 렌더링
  const selectedBook = books[0];

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
          <h2 className="text-lg font-bold">이야기가 끝났습니다!</h2>
        </PageCover>
      </HTMLFlipBook>
    </div>
  );
};

export default DummyFlipBook;
