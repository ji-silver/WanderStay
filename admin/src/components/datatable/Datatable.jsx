import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./datatable.scss";
import axios from "axios";

const Datatable = ({ columns }) => {
  // 회원, 숙소, 객실 데이터 다르게 받아오기 위해서 path 설정
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data } = useFetch(`/${path}`);

  useEffect(() => {
    setList(data);
    console.log(data);
  }, [data]);

  // 해당 id 삭제 후 list배열에 없는 id 필터링
  const handleDelete = async (id) => {
    const confirmed = window.confirm("삭제 하시겠습니까?");
    if (confirmed) {
      try {
        await axios.delete(`/${path}/${id}`);
        setList((prevList) => prevList.filter((item) => item._id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "관리",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">수정</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              삭제
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        회원정보
        <Link to={`/${path}/new`} className="link">
          추가하기
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
