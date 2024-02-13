import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../redux/authActions";

interface FormData {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const response = await axios
  //     .post("http://www.techeer-team-a.store:8000/api/v1/user/login/", formData)
  //     // .post("http://localhost:8000/api/v1/user/login/", formData)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         const token = response.data;
  //         localStorage.setItem("id", token);
  //         // dispatch(loginSuccess());
  //         console.log("로그인 성공!");
  //         navigate("/");
  //       } else if (response.status === 400) {
  //         // 로그인 실패했을 때 추가
  //         console.log(response);
  //         console.log("로그인 실패");
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         // 서버 응답이 있는 경우
  //         // const responseData = error.response.data;
  //         console.log(error.response);
  //         console.log("로그인 실패");
  //         alert(error.response.data.error);
  //       } else {
  //         // 서버 응답이 없는 경우 (네트워크 오류 등)
  //         console.error("API 요청 중 오류가 발생하였습니다.", error);
  //         // console.log(error);
  //         // console.log(formData);
  //       }
  //     });
  // };

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-3xl font-bold text-[#612D08] mt-2 text-center">
          로그인
        </div>
      </div>
      <div className="max-w-md w-full mx-auto mt-4">
        {/* <form className="space-y-6" onSubmit={handleSubmit}> */}
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
            className="w-full p-2 border border-gray-300"
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
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full p-3 bg-[#9B8F8F] hover:bg-[#A59C9B] text-white font-bold"
          >
            로그인
          </button>
        </div>
        {/* </form> */}
        <div
          className="text-mainpagegray mt-3 text-center hover:cursor-pointer"
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
