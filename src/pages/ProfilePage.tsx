import React, { useState, useEffect } from "react";
import axios from "axios";
import userProfileIcon from "src/assets/public/user.png";
import manIcon from "src/assets/public/man.png";
import womanIcon from "src/assets/public/woman.png";

interface UserProfile {
  user_nickname: string;
  age: number;
  gender: string;
  description: string;
  profilePicture?: string; // 프로필 사진 (선택적)
}

const ProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState("male");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("id");

  useEffect(() => {
    if (!token) {
      setError("로그인이 필요합니다. 다시 로그인 해주세요.");
      setLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get<UserProfile>(
          "http://localhost:8000/api/user/profile/",
          config
        );

        setUserProfile(response.data);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (
            error.response?.status === 500 ||
            error.response?.status === 404
          ) {
            setUserProfile(null); // 프로필이 없으면 null로 설정하여 프로필 생성 화면을 보여줌
          } else {
            setError("프로필을 불러오는 중 오류가 발생했습니다.");
          }
        }
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  // 프로필 생성 핸들러
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/profile/",
        { age, gender, description },
        config
      );

      setUserProfile(response.data); // 프로필 생성 후 바로 조회 상태로 업데이트
    } catch (error) {
      console.error("프로필 생성 중 오류 발생:", error);
      setError("프로필 생성 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // 프로필이 존재하지 않으면 프로필 생성 폼을 렌더링
  if (!userProfile) {
    return (
      <div className="flex  items-center justify-center min-h-screen bg-white p-4">
        <div className="bg-[#FFF8D6] rounded-3xl pt-12 pb-12 w-3/4 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-56 h-56 rounded-full bg-[#EBEBEB] border-gray-500 overflow-hidden flex items-center justify-center">
              <img
                src={userProfileIcon}
                alt="Profile"
                className="w-36 h-36 ml-6 object-contain"
              />
            </div>
          </div>
          <div className="h-96 border-l-2 border-gray-300 ml-16 mr-16"></div>
          <div className="items-center w-96 rounded-lg">
            <form onSubmit={handleProfileSubmit}>
              <div className="mb-6">
                <label className="block text-md font-bold mb-2">
                  나이를 설정하세요
                </label>
                <select
                  value={age || ""}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="block w-full bg-white border border-gray-300 rounded-lg shadow-sm py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num} 살
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-md font-bold mb-2">성별</label>
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setGender("male")}
                    className={`px-16 py-2 rounded-tl-full rounded-bl-full text-black ${
                      gender === "male"
                        ? "bg-[#FFF0A3] text-black font-bold"
                        : "bg-[#EBEBEB] hover:bg-[#FFFAE1]"
                    }`}
                  >
                    남자
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={`px-16 py-2 rounded-tr-full rounded-br-full text-black  ${
                      gender === "female"
                        ? "bg-[#FFF0A3] text-black font-bold"
                        : "bg-[#EBEBEB] hover:bg-[#FFFAE1]"
                    }`}
                  >
                    여자
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-md font-bold mb-2">
                  한 줄 소개를 입력하세요
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="자신을 설명해주세요"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-6 py-3 w-full font-bold text-black bg-[#FFF0A3] hover:bg-[#FFE55A] hover:text-white hover:shadow-none rounded-2xl text-center shadow-lg"
              >
                프로필 생성하기
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // 프로필이 존재하면 조회 화면을 렌더링
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="bg-[#FFF8D6] rounded-3xl pt-12 pb-12 w-3/4 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-56 h-56 rounded-full border-4 bg-white overflow-hidden flex items-center justify-center">
            <img
              src={userProfile?.gender === "male" ? manIcon : womanIcon}
              alt="Profile Icon"
              className="w-36 h-36 object-contain"
            />
          </div>
        </div>
        <div className="h-64 border-l-2 border-gray-300 ml-16 mr-16"></div>
        <div className="items-center w-96 rounded-lg">
          <div className="flex justify-center items-center">
            <h1 className="text-5xl font-bold text-black text-center">
              {userProfile.user_nickname}
            </h1>
          </div>
          <div className="flex justify-end pr-24">
            <span className="text-md text-gray-500 mt-2">
              {userProfile.age} 살
            </span>
          </div>
          <div className="mt-12">
            <p className="text-xl text-center">{userProfile.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
