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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="sticky top-0 self-start h-screen bg-green-200 shadow-lg">
        <StudentSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentLayout;
