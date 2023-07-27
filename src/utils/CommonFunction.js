/**
 * 휴대폰 번호 '-' 하이픈 넣고 11자리만 입력하게 하기
 */
export const handlePhone = (value) => {
  // 입력된 값에서 숫자 이외의 모든 문자 제거
  value = value.replace(/\D/g, "");
  // 11자리 이상이면 11자리까지만 유지
  if (value.length > 11) {
    value = value.slice(0, 11);
  }
  // 7자리 이상일 때 3자리, 7자리 뒤에 하이픈 넣기
  if (value.length > 7) {
    value = value.slice(0, 3) + "-" + value.slice(3, 7) + "-" + value.slice(7);
  }
  return value;
};

/**
 * 이메일 검증 "@" 가 있는지
 */
export const validateEmail = (email) => {
  if (!email.includes("@")) {
    return false;
  }
  return true;
};

/**
 * 비밀번호 유효성 검증 (문자 + 숫자 + 8자리 이상)
 */
export const validatePassword = (password) => {
  if (password.length < 8) {
    return false;
  }

  // 비밀번호에 문자와 숫자가 모두 포함되어 있는지 확인
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  if (!hasLetter || !hasNumber) {
    return false;
  }

  return true;
};
