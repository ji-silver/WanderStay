/**
 * 테이블에 들어갈 데이터 만들기
 * field: row(불러올 데이터) key값과 같게 설정
 * headerName: 화면에 보여지는 속성
 */

export const userColumns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "username",
    headerName: "이름",
    width: 230,
  },
  {
    field: "email",
    headerName: "이메일",
    width: 230,
  },

  {
    field: "phone",
    headerName: "휴대폰 번호",
    width: 230,
  },
];
