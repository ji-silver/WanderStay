import { createContext, useReducer } from "react";

// 상태의 초기값 정의하기
const INITIAL_STATE = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

// createContext()함수로 컨텍스트 객체를 생성하는데 인자로 초기값인 INITIAL_STATE 전달하고 컨텍스트 객체 export 하기
// 컨텍스트 객체: Provider (컨텍스트 값 제공하는 컴포넌트), Consumer (컨텍스트 값 사용하는 컴포넌트)
export const SearchContext = createContext(INITIAL_STATE);

// SearchReducer로 현재 상태와 액션을 받아 다음상태를 반환한다.
const SearchReducer = (state, action) => {
  // switch문으로 액션 타입에 따라 다른 동작 수행
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload; // NEW_SEARCH 액션 발생 시 데이터 값을 새로운 상태로 설정
    case "RESET_SEARCH":
      return INITIAL_STATE; // RESET_SEARCH 액션 발생 시 INITIAL_STATE값 반환해서 상태 초기화
    default:
      return state; // 기본은 현재 상태를 그대로 반환
  }
};

export const SearchContextProvider = ({ children }) => {
  // useReducer로 로직을 담당하는 리듀서 함수와 초기상태를 사용하여 상태 관리
  // state: 현재 상태, dispatch: 액션 발생시키는 함수
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    // Provider 컴포넌트로 value 속성을 통해 컨텍스트 값을 제공 (컨텍스트값을 사용하는 하위 컴포넌트 접근 가능)
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {/* {children}은 컨텍스트 값을 사용하는 하위 컴포넌트들에게 컨텍스트를 전달할 수 있다. */}
      {children}
    </SearchContext.Provider>
  );
};
