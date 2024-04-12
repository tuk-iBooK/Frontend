import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FirstResultPage: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const storyId = localStorage.getItem("story");
        if (!storyId) {
          setError("Story ID가 잘못 됐어요");
          return;
        }

        const response = await axios.get(
          `http://localhost:8000/api/story/register/chatgpt/`,
          {
            params: { story_id: storyId },
          }
        );

        if (response.status === 200 && response.data) {
          setResult(response.data.result);
        } else {
          setError("결과 가져오기 실패");
        }
      } catch (err) {
        setError("결과를 불러오는 도중 오류 발생");
        console.error(err);
      }
    };

    fetchResult();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {result && (
        <div className="mt-4 p-4 border rounded-lg">
          <p>결과:</p>
          <p>{result}</p>
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 border rounded-lg text-red-500">
          오류: {error}
        </div>
      )}
      <button
        onClick={() => navigate("/")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        홈으로
      </button>
    </div>
  );
};

export default FirstResultPage;
