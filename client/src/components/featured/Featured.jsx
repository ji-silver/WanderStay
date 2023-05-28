import "./featured.css";
import useFetch from "../../hooks/useFetch";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=서울,부산,강릉"
  );
  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img src="/images/seoul.jpg" alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>서울</h1>
              <h2>숙소 {data[0]}개</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img src="/images/busan.jpg" alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>부산</h1>
              <h2>숙소 {data[1]}개</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img src="/images/gangneung.jpg" alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>강릉</h1>
              <h2>숙소 {data[2]}개</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
