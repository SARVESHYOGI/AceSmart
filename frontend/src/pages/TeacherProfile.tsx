import { useSelector } from "react-redux";
import { type RootState } from "../store";
import { useEffect, useState } from "react";
import { fetchstudent } from "../api/studentDetails";

export default function TeacherProfile() {
  const userDetail = useSelector((state: RootState) => state.auth.user);
  const [data, setData] = useState();
  useEffect(() => {
    const fetchstd = async () => {
      const data = await fetchstudent();
      setData(data);
    };
    fetchstd();
  }, []);
  console.log(data);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 w-full">
      <div className="max-w-6xl mx-auto">
        {/* User Profile Section */}
        {userDetail ? (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {userDetail.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {userDetail.name}'s Profile
                </h1>
                <p className="text-gray-600 text-lg capitalize">
                  {userDetail.role}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">
                  Student ID
                </p>
                <p className="text-lg text-gray-800 font-medium">
                  {userDetail.id}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">
                  Email Address
                </p>
                <p className="text-lg text-gray-800 font-medium">
                  {userDetail.email}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-500 text-xl">?</span>
            </div>
            <p className="text-gray-600 text-lg">No user logged in</p>
          </div>
        )}
      </div>

      <div>hi</div>
    </div>
  );
}
