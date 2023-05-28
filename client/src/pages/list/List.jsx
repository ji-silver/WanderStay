import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
  // Header 컴포넌트에서 페이지 이동 시 전달받은 state객체를 초기값으로 설정 (목적지, 날짜, options)
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  // 목적지, 최소, 최대 가격 옵션대로 get 하기
  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 1000000}`
  );

  // 옵션대로 재검색 하기
  const handleClick = () => {
    reFetch();
  };

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>목적지</label>
              <input
                onChange={(e) => setDestination(e.target.value)}
                placeholder={destination}
                type="text"
              />
            </div>
            <div className="lsItem">
              <label>체크인 / 체크아웃</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "yyyy/MM/dd"
              )} to ${format(date[0].endDate, "yyyy/MM/dd")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    최소 가격 <small>(1박당)</small>
                  </span>
                  <div className="lsOptionInputWrap">
                    ₩
                    <input
                      type="number"
                      onChange={(e) => setMin(e.target.value)}
                      className="lsOptionInput price"
                    />
                  </div>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    최대 가격 <small>(1박당)</small>
                  </span>
                  <div className="lsOptionInputWrap">
                    ₩
                    <input
                      type="number"
                      onChange={(e) => setMax(e.target.value)}
                      className="lsOptionInput price"
                    />
                  </div>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">성인</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.adult <= 1}
                      className="optionCounterButton"
                      onClick={() => handleOption("adult", "d")}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput countInput"
                      placeholder={options.adult}
                    />
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("adult", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">아동</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.children <= 0}
                      className="optionCounterButton"
                      onClick={() => handleOption("children", "d")}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={0}
                      className="lsOptionInput countInput"
                      placeholder={options.children}
                    />
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("children", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">객실</span>
                  <div className="optionCounter">
                    <button
                      disabled={options.room <= 1}
                      className="optionCounterButton"
                      onClick={() => handleOption("room", "d")}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      className="lsOptionInput countInput"
                      placeholder={options.room}
                    />
                    <button
                      className="optionCounterButton"
                      onClick={() => handleOption("room", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={handleClick}>검색</button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  // SearchItem 컴포넌트에 item prop 전달
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
