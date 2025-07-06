import { Route, Routes } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";
import StudentLayout from "./Layout/StudentLayout";
import TeacherLayout from "./Layout/TeacherLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MockTest from "./pages/MockTest";
import TestPage from "./pages/TestPage";
import StudentProfile from "./pages/StudentProfile";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";
import { useEffect } from "react";
import { fetchUser } from "./store/authSlice";
import TeacherProfile from "./pages/TeacherProfile";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Routes>
      {/* Student Routes */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<Home />} />
        <Route path="/student/mocktest" element={<MockTest />} />
        <Route path="/student/test/:id" element={<TestPage />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="*" element={<NoPage />} />
      </Route>

      {/* Teacher Routes */}
      <Route path="/teacher" element={<TeacherLayout />}>
        <Route index element={<Home />} />
        <Route path="mocktest" element={<MockTest />} />
        <Route path="test/:id" element={<TestPage />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />
        <Route path="*" element={<NoPage />} />
      </Route>

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default App;
