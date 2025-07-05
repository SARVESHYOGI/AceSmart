import { useSelector } from "react-redux";
import { type RootState } from "../store";
import { useEffect, useState } from "react";
import { fetchTests } from "../api/studentDetails";
import GivenTestCard from "../components/GivenTestCard";
import BarDiag from "../components/BarGraph";
import TestProgressChart from "../components/TestProgressChart";

interface IAnswer {
  questionId: string;
  selectedOption: string;
  correct: boolean;
}

interface ISubmitTestAttemptParams {
  examType: string;
  subject: string;
  topic: string;
  score: number;
  answers: IAnswer[];
}

export default function StudentProfile() {
  const userDetail = useSelector((state: RootState) => state.auth.user);
  const [data, setData] = useState<ISubmitTestAttemptParams[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const da = await fetchTests();
      setData(da);
    };
    fetchData();
  }, []);
  // console.log("resss", data[0].score);

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

        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 w-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Test Attempts</h2>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {data.length} {data.length === 1 ? "Test" : "Tests"}
            </span>
          </div>

          {data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="transform hover:scale-105 transition-transform duration-200"
                >
                  <GivenTestCard item={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No tests attempted yet</p>
              <p className="text-gray-400 text-sm mt-2">
                Your test results will appear here once you complete any tests
              </p>
            </div>
          )}
        </div>

        {/* <div className="w-96 bg-black">
          <BarDiag />
        </div> */}
        {data.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Performance Analytics
              </h2>
            </div>
            <TestProgressChart data={data} />
          </div>
        )}
      </div>
    </div>
  );
}
