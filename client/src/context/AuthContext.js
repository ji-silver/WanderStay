import { createContext, useEffect, useReducer } from "react";

// 상태의 초기값 정의하기
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null, // localStorage에서 user 데이터를 가져와서 파싱
  loading: false,
  error: null,
};

// createContext()함수로 컨텍스트 객체를 생성하는데 인자로 초기값인 INITIAL_STATE 전달하고 컨텍스트 객체 export 하기
// 컨텍스트 객체: Provider (컨텍스트 값 제공하는 컴포넌트), Consumer (컨텍스트 값 사용하는 컴포넌트)
export const AuthContext = createContext(INITIAL_STATE);

// AuthReducer로 현재 상태와 액션을 받아 다음상태를 반환한다.
const AuthReducer = (state, action) => {
  // switch문으로 액션 타입에 따라 다른 동작 수행
  switch (action.type) {
    // 로그인 시
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
      // 로그인 성공 시
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
      // 로그인 실패 시
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
      // 로그아웃
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  // useReducer로 로직을 담당하는 리듀서 함수와 초기상태를 사용하여 상태 관리
  // state: 현재 상태, dispatch: 액션 발생시키는 함수
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // state.user가 변경될 때마다 user 상태 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    // Provider 컴포넌트로 value 속성을 통해 컨텍스트 값을 제공 (컨텍스트값을 사용하는 하위 컴포넌트 접근 가능)
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {/* {children}은 컨텍스트 값을 사용하는 하위 컴포넌트들에게 컨텍스트를 전달할 수 있다. */}
      {children}
    </AuthContext.Provider>
  );
};
