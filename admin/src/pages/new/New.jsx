import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import ImageIcon from "@mui/icons-material/Image";
import axios from "axios";
import "./new.scss";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  // 필드에 입력 시 info 상태 업데이트, id가 키 - value가 값
  const handleChange = (e) => {
    const { id, value } = e.target;
    setInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handleClick = async (e) => {
    // Cloudinary API를 사용해서 클라우드에 이미지 저장하기
    e.preventDefault();
    const data = new FormData();

    // 전송할 파일과 설정한 프리셋 이름, 클라우드 이름 넣어주기
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/jisilver/image/upload",
        data
      );
      // 업로드한 이미지 정보 중 url 받아오기
      const { url } = uploadRes.data;
      const newUser = {
        ...info,
        img: url,
      };

      await axios.post("/auth/register", newUser);
      alert("회원을 추가하였습니다.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div>
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formImageInput">
                <label htmlFor="file">
                  <div className="imageBtn">
                    <ImageIcon className="icon" />
                    이미지 업로드
                  </div>
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              {inputs.map((input) => {
                return (
                  <div className="formInput" key={inputs.id}>
                    <label>{input.label}</label>
                    <input
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                      id={input.id}
                    />
                  </div>
                );
              })}
              <button onClick={handleClick}>저장</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
