// createError()는 에러객체 생성하기 위한 함수 (상태코드, 메세지를 입력받아 객체로 반환)
export const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  return err;
};
