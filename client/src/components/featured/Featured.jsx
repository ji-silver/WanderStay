import "./featured.css";
import useFetch from "../../hooks/useFetch";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=seoul,busan,gangneung"
  );
  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://pixabay.com/get/gf38014d8062bfa1ac07a72c73c7eec80786f23fb67f274885860e90ae7c29c21980218e063d132044e00104f59887debb1701cf6bb66eb79f938635d2b3ceea1_1280.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>서울</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://pixabay.com/get/g9eb052ecd3d43ffc42d592780a842982f0af75cab6320a284b4aaf69b5544d3cfa2d21f839819b05b8baf013b5f47ac0ea280edd9a4604678b1f8a5d4aa09bd745fad5b229bb650029a145a87d1af3fa_1280.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>부산</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://pixabay.com/get/gbe6f241ef6455eb83a62a7cecedcc35322bd5f5b8d2e2a1eb8c803170ffef4c575511739e4b4dda186b8f4563fd3c0da84ed68290ff9888a87a84ebec6b7084acde4cd25b0fd92486e447f1e305ea6d6_1280.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>강릉</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
