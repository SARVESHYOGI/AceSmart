import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../store";
import TeacherSidebar from "../components/TeacherSidebar";

const TeacherLayout = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user || user.role !== "teacher") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="sticky top-0 self-start h-screen bg-green-200 shadow-lg">
        <TeacherSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherLayout;
