export const handlePhone = (value) => {
  // 입력된 값에서 숫자 이외의 모든 문자 제거
  value = value.replace(/\D/g, "");
  // 7자리 이상일 때 3자리, 7자리 뒤에 하이픈 넣기
  if (value.length > 7) {
    value = value.slice(0, 3) + "-" + value.slice(3, 7) + "-" + value.slice(7);
  }
  return value;
};
