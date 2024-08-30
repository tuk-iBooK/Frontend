import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authActions";

interface FormData {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  // 페이지 로드 시 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem("id");
    if (token) {
      setIsLoggedIn(true); // 토큰이 있으면 로그인 상태로 전환
    } else {
      setIsLoggedIn(false); // 토큰이 없으면 로그아웃 상태
    }
  }, []); // 빈 배열로 컴포넌트 마운트 시 한 번 실행

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login/",
        formData
      );

      if (response.status === 200) {
        const token = response.data.token.access;
        localStorage.setItem("id", token);

        // setIsLoggedIn(true);
        console.log("로그인 성공!");
        navigate("/"); // 로그인 후 홈 페이지로 이동
        window.location.reload();
      } else if (response.status === 400) {
        console.log("로그인 실패", response);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log("로그인 실패", error.response);
        alert(error.response?.data?.error);
      } else {
        console.error("API 요청 중 오류가 발생하였습니다.", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("id"); // 로그아웃 시 토큰 삭제
    setIsLoggedIn(false); // 로그인 상태를 false로 변경
    navigate("/"); // 홈으로 이동
  };

  // 로그인 상태에 따라 UI가 변경되도록 렌더링
  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-black">
          이미 로그인되었습니다.
        </h1>
        <button
          onClick={handleLogout}
          className="mt-4 p-3 bg-[#FF6347] text-white font-bold rounded-full"
        >
          로그아웃
        </button>
      </div>
    );
  }

  //   const response = await axios
  //     .post("http://localhost:8000/api/auth/login/", formData)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         const token = response.data.token.access;
  //         localStorage.setItem("id", token);
  //         dispatch(loginSuccess());
  //         console.log("로그인 성공!");
  //         navigate("/", { state: { token } });
  //       } else if (response.status === 400) {
  //         console.log(response);
  //         console.log("로그인 실패");
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         const responseData = error.response.data;
  //         console.log(error.response);
  //         console.log("로그인 실패");
  //         alert(error.response.data.error);
  //       } else {
  //         console.error("API 요청 중 오류가 발생하였습니다.", error);
  //         console.log(error);
  //         console.log(formData);
  //       }
  //     });
  // };

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-3xl font-bold text-black mt-2 text-center">
          로그인
        </div>
      </div>
      <div className="max-w-md w-full mx-auto mt-4">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="text-sm text-left font-normal text-black block"
            >
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mt-2 bg-gray-100 border border-gray-300 rounded-full"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm text-left font-normal text-black block"
            >
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mt-2 bg-gray-100 border border-gray-300 rounded-full"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-3 mt-2 bg-[#FFF0A3] hover:bg-[#FFF8D6] text-black hover:text-black font-bold rounded-full"
            >
              로그인
            </button>
          </div>
        </form>
        <div
          className="text-mainpagegray mt-4 text-center hover:cursor-pointer"
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입
        </div>
      </div>
    </div>
  );
}

export default Login;
