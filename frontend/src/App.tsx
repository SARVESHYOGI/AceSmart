import { Route, Routes } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";
import StudentLayout from "./Layout/StudentLayout";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";
import { useEffect } from "react";
import { fetchUser } from "./store/authSlice";
import MockTest from "./pages/MockTest";
import TestPage from "./pages/TestPage";
import Register from "./pages/Register";
import StudentProfile from "./pages/StudentProfile";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<StudentLayout />}>
          <Route index element={<Home />} />
          <Route path="/mocktest" element={<MockTest />} />
          <Route path="/test/:id" element={<TestPage />} />
          <Route path="/profile" element={<StudentProfile />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
