import "./searchItem.css";

const SearchItem = () => {
  return (
    <div className="searchItem">
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">시그니엘 서울</h1>
        <span className="siDistance">
          서울 강남/잠실지역 부터 직선거리 0.77km
        </span>
        <span className="siSubtitle">Grand Deluxe Double Room</span>
        <span className="siFeatures">1 King Bed Request</span>
        <span className="siCancelOp">무료 취소 가능</span>
        <span className="siCancelOpSubtitle">지금 예약하고 현장 결제하기</span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>평점</span>
          <button>8.9</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">₩112,000</span>
          <span className="siTaxOp">세금 및 수수료 포함</span>
          <button className="siCheckButton">예약하기</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
