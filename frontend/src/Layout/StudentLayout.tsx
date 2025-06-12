import { Outlet, Navigate } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";
import { useSelector } from "react-redux";
import { type RootState } from "../store";

const StudentLayout = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user || user.role !== "student") {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <StudentSidebar />
      <Outlet />
    </>
  );
};

export default StudentLayout;
