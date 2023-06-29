import { Link } from "react-router-dom";
import "./searchItem.scss";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      {/* photos는 배열이라서 첫번째 인덱스 보여주기*/}
      <img src={item.photos[0]} alt="" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}</span>
        <span className="siSubtitle">Grand Deluxe Double Room</span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">무료 취소 가능</span>
        <span className="siCancelOpSubtitle">지금 예약하고 현장 결제하기</span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>평점</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">
            ₩{parseInt(item.cheapestPrice).toLocaleString()}
          </span>
          <span className="siTaxOp">세금 및 수수료 포함</span>
          {/* 버튼 클릭 시 페이지 경로를 해당 item의 _id를 prop으로 전달하기*/}
          <Link to={`/hotels/${item._id}`}>
            <button>예약하기</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
