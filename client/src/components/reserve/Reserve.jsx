import React, { useContext, useState } from "react";
import "./reserve.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data } = useFetch(`/hotels/room/${hotelId}`);
  // 시작일, 종료일 배열 가져오기
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    // 받아온 시작일, 종료일 Date 객체로 변환
    const start = new Date(startDate);
    const end = new Date(endDate);

    // start의 시간 정보 제거하고 날짜 정보만 담기
    const date = new Date(start.getTime());

    let dates = [];

    // 시작일부터 종료일까지 반복
    while (date <= end) {
      // 시작일부터 종료일까지 dates 배열에 담기
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  // getDatesInRange 호출해서 SearchContext에서 가져온 dates 시작일, 종료일 전달
  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  // 객실 예약 가능 여부 (해당 날짜가 예약되는지 안되는지)
  const isAvailable = (roomNumber) => {
    // 받아온 roomNumber 객체에 unavailableDates(이미 예약된 날짜) 속성에 접근해서 some()메서드를 이용해 하나라도 true면 true 반환
    // alldates 배열에 includes() 메서드 사용해서 unavailableDates배열에 포함 되어있는지 확인 -> 포함 되어있으면 예약 불가
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    // isFound가 true(이미 예약이 된 날짜)면 예약이 불가능하기 때문에 false 반환, 포함 되지 않았다면 true 반환
    return !isFound;
  };

  // 객실 체크박스 상태 변경
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    // 삼항 연산자 사용 체크 박스에 체크 되어있으면 이전 선택된 값(id) 복사 후 값(id) 추가
    // 아니면 selectedRooms배열에서 필터링, 일치하지 않는 value 값 제거
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      // Promise.all은 모든 프로미스가 완료될 때 까지 대기 후 배열로 반환
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      alert("예약 되었습니다.");
      navigate("/");
    } catch (err) {}
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>객실 선택</span>
        {/* 받아온 객실 정보 배열을 map으로 돌려서 정보들 화면에 띄우기 */}
        {data.map((item) => (
          <div className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                최대 인원: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">
                {parseInt(item.price).toLocaleString()}원
              </div>
            </div>
            <div className="rSelectRooms">
              {/* roomNumbers 배열이니까 map으로 한 번 더 돌려서 객실번호, _id가 담긴 체크박스 뿌리기 */}
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  {/* disabled는 체크 박스 비활성화 시키키. 예약이 가능한 경우만 활성화 시키기 */}
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick}>지금 예약</button>
      </div>
    </div>
  );
};

export default Reserve;
