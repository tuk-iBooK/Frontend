// src/redux/authReducer.ts

// 타입 정의
interface AuthState {
  isLoggedIn: boolean;
}

// 초기 상태 설정
const initialState: AuthState = {
  isLoggedIn: false,
};

// 리듀서 함수
const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isLoggedIn: true };
    case "LOGOUT":
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};

export default authReducer;
