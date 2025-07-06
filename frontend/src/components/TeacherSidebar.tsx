import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const sidebarItems = [
  // { label: "Dashboard", icon: "🏠", path: "/dashboard" },
  { label: "MockTest", icon: "📚", path: "/mocktest" },
  { label: "Assignments", icon: "📝", path: "/assignments" },
  // { label: "Grades", icon: "📊", path: "/grades" },
  { label: "Profile", icon: "👤", path: "/teacher/profile" },
];
const TeacherSidebar: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <aside className="w-[220px] h-screen bg-slate-800 text-white p-6 flex flex-col box-border">
      <div className="text-2xl font-bold text-center mb-8 tracking-wide">
        Teacher Portal
      </div>
      <nav>
        <ul className="list-none p-0 m-0">
          {sidebarItems.map((item) => (
            <li key={item.label} className="mb-4">
              <Link
                to={item.path}
                className="flex items-center text-lg px-6 py-2 rounded-md transition-colors duration-200 hover:bg-slate-700"
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <button onClick={handleLogout}>logout</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default TeacherSidebar;
