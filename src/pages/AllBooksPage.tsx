import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Book {
  id: number;
  title: string;
  image: string;
}

const AllBooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/story/");
      console.log("API response:", response.data); // 응답 전체를 출력
      if (response.status === 200 && Array.isArray(response.data)) {
        // 응답 데이터의 pk를 id로 변환하여 books 배열에 저장
        const formattedBooks = response.data.map((book: any) => ({
          id: book.pk, // pk를 id로 변환
          title: book.title,
          image: book.image,
        }));
        setBooks(formattedBooks); // books 상태 업데이트
      } else {
        console.error("Books data not found in response");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // 책 클릭 시 상세 페이지로 이동
  const handleBookClick = (bookId: number) => {
    navigate(`/flipbook/${bookId}`);
  };

  // 컴포넌트가 마운트될 때 책 목록을 가져옴
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="w-3/4">
      <div className="flex p-4 text-xl font-bold">모든 책장</div>
      <div className="grid grid-cols-3 gap-8 overflow-y-auto max-h-[900px] p-4">
        {books.length > 0 ? (
          books.map((book, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-60 cursor-pointer"
              onClick={() => handleBookClick(book.id)}
            >
              <img
                src={book.image}
                className="w-full h-auto rounded-t-lg bg-gray-100 aspect-square p-2"
                alt={book.title}
              />
              <p className="w-full p-1 font-bold text-center shadow-lg rounded-b-lg bg-gray-100">
                {book.title}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">책을 불러오고 있습니다...</p>
        )}
      </div>
    </div>
  );
};

export default AllBooksPage;
