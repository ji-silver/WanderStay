import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/new/New";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
// 상위 컴포넌트에서 하위 컴포넌트로 데이터 내려주기
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import Info from "./pages/info/Info";

function App() {
  // 사용자 인증이 된 경우에만 자식 컴포넌트 렌더링, 아니면 로그인 페이지 리다이렉션
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/users" />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List columns={userColumns} />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <New />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/hotels">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List columns={hotelColumns} />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <NewHotel />
                </ProtectedRoute>
              }
            />
            <Route
              path="info"
              element={
                <ProtectedRoute>
                  <Info />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/rooms">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List columns={roomColumns} />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <NewRoom />
                </ProtectedRoute>
              }
            />
            <Route
              path="info"
              element={
                <ProtectedRoute>
                  <Info />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Navigate to="/users" replace />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
