import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const FirstResultPage: React.FC = () => {
  const story = useSelector((state: any) => state.story.value as number);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("id");
        if (!token) {
          console.error("No token provided.");
          return;
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const response = await axios.post(
          "http://localhost:8000/api/story/register/chatgpt/",
          { story: story },
          config
        );

        if (response.status === 200) {
          const answer = response.data.answer;
          const titleMatch = answer.match(/제목: (.*)\n/);
          if (titleMatch) setTitle(titleMatch[1]);

          const contentStart = answer.indexOf("제목: ") + titleMatch[0].length;
          const choiceStart = answer.lastIndexOf("\nA. ");
          if (choiceStart > -1) {
            setContent(answer.substring(contentStart, choiceStart));
            const choiceText = answer.substring(choiceStart);
            const choicesArray = choiceText
              .split("\n")
              .filter(
                (line: string) =>
                  line.startsWith("A.") ||
                  line.startsWith("B.") ||
                  line.startsWith("C.")
              );

            setChoices(choicesArray);
          } else {
            setContent(answer.substring(contentStart));
          }
        } else {
          console.error("Failed to fetch data from API.");
        }
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchData();
  }, [story]);

  return (
    <div className="container mx-auto my-8 p-4">
      <div className="prose">
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
      <div>
        {choices.map((choice, index) => (
          <p key={index}>{choice}</p>
        ))}
      </div>
    </div>
  );
};

export default FirstResultPage;
