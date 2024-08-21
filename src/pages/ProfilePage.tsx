import React, { useState, useEffect } from "react";
import axios from "axios";

// 인터페이스 정의
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

  // 프로필 생성용 상태
  const [nickname, setNickname] = useState("");
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
            // 프로필이 없을 경우 (500 또는 404 에러 처리)
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
        { user_nickname: nickname, age, gender, description },
        config
      );

      setUserProfile(response.data); // 프로필 생성 후 바로 조회 상태로 업데이트
    } catch (error) {
      console.error("프로필 생성 중 오류 발생:", error);
      setError("프로필 생성 중 오류가 발생했습니다.");
    }
  };

  // 로딩 중일 때
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 에러 발생 시 처리
  if (error) {
    return <div>{error}</div>;
  }

  // 프로필이 존재하지 않으면 프로필 생성 폼을 렌더링
  if (!userProfile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">프로필 생성</h2>
          <form onSubmit={handleProfileSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                닉네임
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="닉네임을 입력하세요"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                나이
              </label>
              <input
                type="number"
                value={age || ""}
                onChange={(e) => setAge(Number(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="나이를 입력하세요"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                성별
              </label>
              <div className="relative">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                설명
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
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full"
            >
              프로필 생성
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 프로필이 존재하면 조회 화면을 렌더링
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm text-center">
        {/* 프로필 사진 */}
        <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
          <img
            src={userProfile.profilePicture || "/default-profile.png"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 사용자 닉네임 */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {userProfile.user_nickname}
        </h1>

        {/* 사용자 나이 */}
        <p className="text-gray-600">나이: {userProfile.age}</p>

        {/* 사용자 성별 */}
        <p className="text-gray-600">
          성별: {userProfile.gender === "male" ? "남성" : "여성"}
        </p>

        {/* 사용자 설명 */}
        <p className="text-gray-600 mt-2">{userProfile.description}</p>

        {/* 수정 버튼 */}
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          프로필 수정
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
