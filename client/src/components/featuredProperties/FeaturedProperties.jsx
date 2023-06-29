import useFetch from "../../hooks/useFetch";
import "./featuredProperties.scss";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true");
  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img src={item.photos[0]} alt="" className="fpImg" />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">
                최저{" "}
                <strong>
                  ₩{parseInt(item.cheapestPrice).toLocaleString()}원
                </strong>
              </span>
              {item.rating && (
                <div>
                  <button className="fpButton">{item.rating}</button>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
