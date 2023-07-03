import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { userColumns } from "../../datatablesource";
import "./datatable.scss";
import axios from "axios";

const Datatable = () => {
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch("/users");

  useEffect(() => {
    setList(data);
  }, [data]);

  // 회원 삭제하기
  // 해당 id 삭제 후 list배열에 없는 id 필터링
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
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
        <Link to="/users/new" className="link">
          추가하기
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
