import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import UserList from "./components/user-list";
import EditUser from "./components/edit-user";
import CreateUser from "./components/create-user";
import Navbar from "./components/navbar";
import LoginPage from "./components/login";
import { selectUser } from "./redux/userSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const isAuthenticatedUser = useSelector(selectUser);

  return isAuthenticatedUser ? (
    <div className="">
      <Navbar />
      <br />
      <Routes>
        <Route path="/" exact element={<UserList />} />
        <Route path="/edit/:id" exact element={<EditUser />} />
        <Route path="/createuser" exact element={<CreateUser />} />
        <Route path="*" exact element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  ) : (
    <Routes>
      <Route path="/login" exact element={<LoginPage />} />
      <Route path="*" exact element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
export default App;
