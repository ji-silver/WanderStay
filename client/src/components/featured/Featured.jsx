import "./featured.scss";
import useFetch from "../../hooks/useFetch";

const Featured = () => {
  const { data, loading } = useFetch(
    "/api/hotels/countByCity?cities=서울,부산,강릉"
  );
  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img src="/images/seoul.jpg" alt="" />
            <div>
              <h1>서울</h1>
              <h2>숙소 {data[0]}개</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img src="/images/busan.jpg" alt="" />
            <div>
              <h1>부산</h1>
              <h2>숙소 {data[1]}개</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img src="/images/gangneung.jpg" alt="" />
            <div>
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
