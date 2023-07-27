/**
 * 테이블에 들어갈 데이터 만들기
 * field: row(불러올 데이터) key값과 같게 설정
 * headerName: 화면에 보여지는 속성
 */

// 회원 테이블
export const userColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "img",
    headerName: "이름",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
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

// 숙소 테이블
export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "숙소 명",
    width: 230,
  },
  {
    field: "type",
    headerName: "타입",
    width: 100,
  },
  {
    field: "city",
    headerName: "지역",
    width: 100,
  },
  {
    field: "cheapestPrice",
    headerName: "최저가",
    width: 100,
  },
];

// 객실 테이블
export const roomColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "title",
    headerName: "객실 명",
    width: 250,
  },
  {
    field: "desc",
    headerName: "구성",
    width: 230,
  },
  {
    field: "price",
    headerName: "가격",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "최대 인원",
    width: 100,
  },
];
