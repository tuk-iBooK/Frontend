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
          content:
            "어느 날, 아무도 없는 숲 속에 한 나라에 추방된 공주가 살고 있었습니다. 오랜 시간 혼자였던 공주는 이 외로운 숲에서 나가고 싶었습니다. 숲을 벗어나기만 하면 새로운 사람들을 만나서 친구를 사귈 것만 같았기 때문입니다. 하지만 이 숲은 추방되기 전부터 굉장히 유명했던 악명 높은 숲이란 소문이 있었기 때문입니다. 그렇지만 공주에게는 아무에게도 말 못할 비밀이 있었습니다. 공주에겐 바로 신비로운 마법 능력이 있었습니다.",
        },
        {
          page: 2,
          image: image7,
          content:
            "그 마법을 들켜 추방된 것이었기 때문에, 그녀는 어디에서도 그 마법을 쓸 수 없었습니다. 하지만 이젠 그보다 외로움이 커졌기 때문에 공주는 결국 모험을 떠나기로 했습니다. 숲은 공주의 영향으로 마법의 숲으로 바뀌고 있었습니다. 모든 풀들은 움직이며 향기로운 향을 내고, 나비들은 감미로운 소리를 내며 노래를 부릅니다.",
        },
        {
          page: 3,
          image: image6,
          content:
            "그 향과 노래소리에 취해 공주는 그만 숲 속에서 길을 잃어버리고 맙니다. 그렇게 날은 저물어가고 점점 무서워지던 공주는 주저 앉아 눈물을 터트리고 말았습니다. 그때 누군가가 공주에게 말을 걸었습니다. '안녕. 내가 널 도와줄게' 그 소리를 듣고 공주는 깜짝 놀라 소리가 나는 곳을 쳐다보니, 그곳에서는 민들레 크기의 숲의 요정이 있었습니다.",
        },
        {
          page: 4,
          image: image8,
          content:
            "요정은 말 없이 싱긋 웃으며 공주에게 따라오라 손짓했고, 공주는 무언가에 이끌리듯 요정을 따라갔습니다. 요정을 따라가니 넓은 들판에 덩그라니 있는 한 성을 발견했습니다. 바로 공주가 추방됐던 공주의 집이었던 성이었습니다. 요정에게 고맙다고 말하려 뒤를 돌아본 순간, 요정은 온데간데 없이 사라져있었습니다. 공주는 그대로 성으로 들어갔습니다.",
        },
        {
          page: 5,
          image: image9,
          content:
            "성으로 돌아가니, 사람들은 공주를 반기기 보단, 무서워하고 있었습니다. 바로 공주의 마법이 마녀의 저주인줄 알고 오해를 하고 있었기 때문입니다. 그렇지만 공주는 기죽지 않고 마녀가 아니라는 것을 얘기했습니다. 사람들은 그녀의 진심어린 호소에 이내 그녀를 받아들였습니다. 자신의 모습을 숨기지 않고 당당히 드러내기로 한 것입니다. 그렇게 그녀는 앞으로 외롭지 않고 행복하게 살았답니다.",
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
          image: image1,
          content:
            "어느 날, 아무도 없는 숲 속에 한 나라에 추방된 공주가 살고 있었습니다. 오랜 시간 혼자였던 공주는 이 외로운 숲에서 나가고 싶었습니다. 숲을 벗어나기만 하면 새로운 사람들을 만나서 친구를 사귈 것만 같았기 때문입니다. 하지만 이 숲은 추방되기 전부터 굉장히 유명했던 악명 높은 숲이란 소문이 있었기 때문입니다. 그렇지만 공주에게는 아무에게도 말 못할 비밀이 있었습니다. 공주에겐 바로 신비로운 마법 능력이 있었습니다.",
        },
        {
          page: 2,
          image: image7,
          content:
            "그 마법을 들켜 추방된 것이었기 때문에, 그녀는 어디에서도 그 마법을 쓸 수 없었습니다. 하지만 이젠 그보다 외로움이 커졌기 때문에 공주는 결국 모험을 떠나기로 했습니다. 숲은 공주의 영향으로 마법의 숲으로 바뀌고 있었습니다. 모든 풀들은 움직이며 향기로운 향을 내고, 나비들은 감미로운 소리를 내며 노래를 부릅니다.",
        },
        {
          page: 3,
          image: image6,
          content:
            "그 향과 노래소리에 취해 공주는 그만 숲 속에서 길을 잃어버리고 맙니다. 그렇게 날은 저물어가고 점점 무서워지던 공주는 주저 앉아 눈물을 터트리고 말았습니다. 그때 누군가가 공주에게 말을 걸었습니다. '안녕. 내가 널 도와줄게' 그 소리를 듣고 공주는 깜짝 놀라 소리가 나는 곳을 쳐다보니, 그곳에서는 민들레 크기의 숲의 요정이 있었습니다.",
        },
        {
          page: 4,
          image: image8,
          content:
            "요정은 말 없이 싱긋 웃으며 공주에게 따라오라 손짓했고, 공주는 무언가에 이끌리듯 요정을 따라갔습니다. 요정을 따라가니 넓은 들판에 덩그라니 있는 한 성을 발견했습니다. 바로 공주가 추방됐던 공주의 집이었던 성이었습니다. 요정에게 고맙다고 말하려 뒤를 돌아본 순간, 요정은 온데간데 없이 사라져있었습니다. 공주는 그대로 성으로 들어갔습니다.",
        },
        {
          page: 5,
          image: image9,
          content:
            "성으로 돌아가니, 사람들은 공주를 반기기 보단, 무서워하고 있었습니다. 바로 공주의 마법이 마녀의 저주인줄 알고 오해를 하고 있었기 때문입니다. 그렇지만 공주는 기죽지 않고 마녀가 아니라는 것을 얘기했습니다. 사람들은 그녀의 진심어린 호소에 이내 그녀를 받아들였습니다. 자신의 모습을 숨기지 않고 당당히 드러내기로 한 것입니다. 그렇게 그녀는 앞으로 외롭지 않고 행복하게 살았답니다.",
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
          image: image1,
          content:
            "어느 날, 아무도 없는 숲 속에 한 나라에 추방된 공주가 살고 있었습니다. 오랜 시간 혼자였던 공주는 이 외로운 숲에서 나가고 싶었습니다. 숲을 벗어나기만 하면 새로운 사람들을 만나서 친구를 사귈 것만 같았기 때문입니다. 하지만 이 숲은 추방되기 전부터 굉장히 유명했던 악명 높은 숲이란 소문이 있었기 때문입니다. 그렇지만 공주에게는 아무에게도 말 못할 비밀이 있었습니다. 공주에겐 바로 신비로운 마법 능력이 있었습니다.",
        },
        {
          page: 2,
          image: image7,
          content:
            "그 마법을 들켜 추방된 것이었기 때문에, 그녀는 어디에서도 그 마법을 쓸 수 없었습니다. 하지만 이젠 그보다 외로움이 커졌기 때문에 공주는 결국 모험을 떠나기로 했습니다. 숲은 공주의 영향으로 마법의 숲으로 바뀌고 있었습니다. 모든 풀들은 움직이며 향기로운 향을 내고, 나비들은 감미로운 소리를 내며 노래를 부릅니다.",
        },
        {
          page: 3,
          image: image6,
          content:
            "그 향과 노래소리에 취해 공주는 그만 숲 속에서 길을 잃어버리고 맙니다. 그렇게 날은 저물어가고 점점 무서워지던 공주는 주저 앉아 눈물을 터트리고 말았습니다. 그때 누군가가 공주에게 말을 걸었습니다. '안녕. 내가 널 도와줄게' 그 소리를 듣고 공주는 깜짝 놀라 소리가 나는 곳을 쳐다보니, 그곳에서는 민들레 크기의 숲의 요정이 있었습니다.",
        },
        {
          page: 4,
          image: image8,
          content:
            "요정은 말 없이 싱긋 웃으며 공주에게 따라오라 손짓했고, 공주는 무언가에 이끌리듯 요정을 따라갔습니다. 요정을 따라가니 넓은 들판에 덩그라니 있는 한 성을 발견했습니다. 바로 공주가 추방됐던 공주의 집이었던 성이었습니다. 요정에게 고맙다고 말하려 뒤를 돌아본 순간, 요정은 온데간데 없이 사라져있었습니다. 공주는 그대로 성으로 들어갔습니다.",
        },
        {
          page: 5,
          image: image9,
          content:
            "성으로 돌아가니, 사람들은 공주를 반기기 보단, 무서워하고 있었습니다. 바로 공주의 마법이 마녀의 저주인줄 알고 오해를 하고 있었기 때문입니다. 그렇지만 공주는 기죽지 않고 마녀가 아니라는 것을 얘기했습니다. 사람들은 그녀의 진심어린 호소에 이내 그녀를 받아들였습니다. 자신의 모습을 숨기지 않고 당당히 드러내기로 한 것입니다. 그렇게 그녀는 앞으로 외롭지 않고 행복하게 살았답니다.",
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
          image: image1,
          content:
            "어느 날, 아무도 없는 숲 속에 한 나라에 추방된 공주가 살고 있었습니다. 오랜 시간 혼자였던 공주는 이 외로운 숲에서 나가고 싶었습니다. 숲을 벗어나기만 하면 새로운 사람들을 만나서 친구를 사귈 것만 같았기 때문입니다. 하지만 이 숲은 추방되기 전부터 굉장히 유명했던 악명 높은 숲이란 소문이 있었기 때문입니다. 그렇지만 공주에게는 아무에게도 말 못할 비밀이 있었습니다. 공주에겐 바로 신비로운 마법 능력이 있었습니다.",
        },
        {
          page: 2,
          image: image7,
          content:
            "그 마법을 들켜 추방된 것이었기 때문에, 그녀는 어디에서도 그 마법을 쓸 수 없었습니다. 하지만 이젠 그보다 외로움이 커졌기 때문에 공주는 결국 모험을 떠나기로 했습니다. 숲은 공주의 영향으로 마법의 숲으로 바뀌고 있었습니다. 모든 풀들은 움직이며 향기로운 향을 내고, 나비들은 감미로운 소리를 내며 노래를 부릅니다.",
        },
        {
          page: 3,
          image: image6,
          content:
            "그 향과 노래소리에 취해 공주는 그만 숲 속에서 길을 잃어버리고 맙니다. 그렇게 날은 저물어가고 점점 무서워지던 공주는 주저 앉아 눈물을 터트리고 말았습니다. 그때 누군가가 공주에게 말을 걸었습니다. '안녕. 내가 널 도와줄게' 그 소리를 듣고 공주는 깜짝 놀라 소리가 나는 곳을 쳐다보니, 그곳에서는 민들레 크기의 숲의 요정이 있었습니다.",
        },
        {
          page: 4,
          image: image8,
          content:
            "요정은 말 없이 싱긋 웃으며 공주에게 따라오라 손짓했고, 공주는 무언가에 이끌리듯 요정을 따라갔습니다. 요정을 따라가니 넓은 들판에 덩그라니 있는 한 성을 발견했습니다. 바로 공주가 추방됐던 공주의 집이었던 성이었습니다. 요정에게 고맙다고 말하려 뒤를 돌아본 순간, 요정은 온데간데 없이 사라져있었습니다. 공주는 그대로 성으로 들어갔습니다.",
        },
        {
          page: 5,
          image: image9,
          content:
            "성으로 돌아가니, 사람들은 공주를 반기기 보단, 무서워하고 있었습니다. 바로 공주의 마법이 마녀의 저주인줄 알고 오해를 하고 있었기 때문입니다. 그렇지만 공주는 기죽지 않고 마녀가 아니라는 것을 얘기했습니다. 사람들은 그녀의 진심어린 호소에 이내 그녀를 받아들였습니다. 자신의 모습을 숨기지 않고 당당히 드러내기로 한 것입니다. 그렇게 그녀는 앞으로 외롭지 않고 행복하게 살았답니다.",
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
          image: image1,
          content:
            "어느 날, 아무도 없는 숲 속에 한 나라에 추방된 공주가 살고 있었습니다. 오랜 시간 혼자였던 공주는 이 외로운 숲에서 나가고 싶었습니다. 숲을 벗어나기만 하면 새로운 사람들을 만나서 친구를 사귈 것만 같았기 때문입니다. 하지만 이 숲은 추방되기 전부터 굉장히 유명했던 악명 높은 숲이란 소문이 있었기 때문입니다. 그렇지만 공주에게는 아무에게도 말 못할 비밀이 있었습니다. 공주에겐 바로 신비로운 마법 능력이 있었습니다.",
        },
        {
          page: 2,
          image: image7,
          content:
            "그 마법을 들켜 추방된 것이었기 때문에, 그녀는 어디에서도 그 마법을 쓸 수 없었습니다. 하지만 이젠 그보다 외로움이 커졌기 때문에 공주는 결국 모험을 떠나기로 했습니다. 숲은 공주의 영향으로 마법의 숲으로 바뀌고 있었습니다. 모든 풀들은 움직이며 향기로운 향을 내고, 나비들은 감미로운 소리를 내며 노래를 부릅니다.",
        },
        {
          page: 3,
          image: image6,
          content:
            "그 향과 노래소리에 취해 공주는 그만 숲 속에서 길을 잃어버리고 맙니다. 그렇게 날은 저물어가고 점점 무서워지던 공주는 주저 앉아 눈물을 터트리고 말았습니다. 그때 누군가가 공주에게 말을 걸었습니다. '안녕. 내가 널 도와줄게' 그 소리를 듣고 공주는 깜짝 놀라 소리가 나는 곳을 쳐다보니, 그곳에서는 민들레 크기의 숲의 요정이 있었습니다.",
        },
        {
          page: 4,
          image: image8,
          content:
            "요정은 말 없이 싱긋 웃으며 공주에게 따라오라 손짓했고, 공주는 무언가에 이끌리듯 요정을 따라갔습니다. 요정을 따라가니 넓은 들판에 덩그라니 있는 한 성을 발견했습니다. 바로 공주가 추방됐던 공주의 집이었던 성이었습니다. 요정에게 고맙다고 말하려 뒤를 돌아본 순간, 요정은 온데간데 없이 사라져있었습니다. 공주는 그대로 성으로 들어갔습니다.",
        },
        {
          page: 5,
          image: image9,
          content:
            "성으로 돌아가니, 사람들은 공주를 반기기 보단, 무서워하고 있었습니다. 바로 공주의 마법이 마녀의 저주인줄 알고 오해를 하고 있었기 때문입니다. 그렇지만 공주는 기죽지 않고 마녀가 아니라는 것을 얘기했습니다. 사람들은 그녀의 진심어린 호소에 이내 그녀를 받아들였습니다. 자신의 모습을 숨기지 않고 당당히 드러내기로 한 것입니다. 그렇게 그녀는 앞으로 외롭지 않고 행복하게 살았답니다.",
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
