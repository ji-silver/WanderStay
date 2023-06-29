import "./propertyList.scss";
import useFetch from "../../hooks/useFetch";

const PropertyList = () => {
  // useFetch 훅 사용 (json 데이터 가져오기)
  const { data, loading, error } = useFetch("/hotels/countByType");
  const images = [
    "https://www.ahstatic.com/photos/b220_ho_00_p_2048x1536.jpg",
    "https://images.unsplash.com/photo-1576354302919-96748cb8299e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=929&q=80",
    "https://a.cdn-hotels.com/gdcs/production88/d1259/a100b74d-2c95-4cfc-9a87-6c5b41c716ea.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    "https://images.unsplash.com/photo-1568605115459-4b731184f961?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
    "https://cielcamp.diskn.com/17VOS0mgaO",
  ];
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {/* data가 있을 때 실행 images 배열 순회하면서 div 요소 생성 */}
          {data &&
            images.map((img, i) => (
              <div className="pListItem" key={i}>
                <img src={img} alt="" />
                <div className="pListTitles">
                  {/* ? 옵션 연산자로 data[i]가 존재하지 않아도 오류 발생 x -> undefined 반환 */}
                  <h1>{data[i]?.type}</h1>
                  <h2>{data[i]?.count}개</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
