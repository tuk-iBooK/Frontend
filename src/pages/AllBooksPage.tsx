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

      //   console.log("API response:", response.data);
      if (response.status === 200 && Array.isArray(response.data)) {
        const formattedBooks = response.data.map((book: any) => ({
          id: book.pk,
          title: book.title,
          image: book.image,
        }));
        setBooks(formattedBooks);
      } else {
        console.error("Books data not found in response");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleBookClick = (bookId: number) => {
    navigate("/flipbook", { state: { story: bookId } });
  };

  // 컴포넌트가 마운트될 때 책 목록을 가져옴
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-3/4 border-2 border-gray-300 mt-8 p-8 rounded-2xl">
        <div className="flex p-4 border-b text-xl font-bold">모든 책장</div>
        <div className="grid grid-cols-3 gap-4 overflow-y-auto max-h-[900px] p-8">
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
    </div>
  );
};

export default AllBooksPage;
