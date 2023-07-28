import { useEffect, useState } from "react";
import axios from "axios";

// 커스텀 훅 만들기 (데이터를 가져오는 동안 데이터, 로딩상태, 에러처리 하기)
const useFetch = (url) => {
  const [data, setData] = useState([]); // api 데이터 저장하기
  const [loading, setLoading] = useState(false); // 데이터 로딩 중
  const [error, setError] = useState(false); // 에러 발생

  // 컴포넌트 랜더링될 때 실행되는 훅
  useEffect(() => {
    const fetchData = async () => {
      // 로딩 중
      setLoading(true);
      try {
        // 데이터 가져오기
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        console.error(err);
        console.log(url)
        setError(err);
      }
      // 완료 하면 로딩 상태 false
      setLoading(false);
    };
    fetchData();
  }, [url]); // 의존성 배열 => url 변경될 때 마다 useEffect() 실행하기

  // 데이터를 다시 가져오기
  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
