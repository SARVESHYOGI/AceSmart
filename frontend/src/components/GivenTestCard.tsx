import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PieScore from "./PieScore";

type TestItem = {
  examType: string;
  subject: string;
  topic: string;
  score: number;
};

export default function GivenTestCard({ item }: { item: TestItem }) {
  const scorePercentage = (item.score / 10) * 100;

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 8) return "bg-green-100 text-green-800 border-green-200";
    if (score >= 6) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg rounded-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-0 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2"></div>

      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-blue-600"
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
            <Typography variant="h6" className="text-gray-800 font-bold">
              {item.examType}
            </Typography>
          </div>

          <div
            className={`px-3 py-1 rounded-full text-sm font-bold border ${getScoreBadgeColor(
              item.score
            )}`}
          >
            {item.score}/10
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <Typography className="text-gray-700">
              <span className="font-semibold text-gray-800">Subject:</span>{" "}
              {item.subject}
            </Typography>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <Typography className="text-gray-700">
              <span className="font-semibold text-gray-800">Topic:</span>{" "}
              {item.topic}
            </Typography>
          </div>
        </div>

        {/* Score Section */}
        <div className="items-center justify-between">
          <div className="flex-1">
            <Typography className="text-sm text-gray-500 ">
              Score Performance
            </Typography>
            <div className="flex items-center gap-2">
              <Typography
                className={`text-2xl font-bold ${getScoreColor(item.score)}`}
              >
                {scorePercentage.toFixed(0)}%
              </Typography>
              <div className="flex-1 bg-gray-200 rounded-full ">
                <div
                  className={`h-2 rounded-full ${
                    item.score >= 8
                      ? "bg-green-500"
                      : item.score >= 6
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${scorePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="">
            <PieScore
              data={[
                { name: "Correct", value: item.score },
                { name: "Incorrect", value: 10 - item.score },
              ]}
            />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {item.score >= 8 ? (
              <>
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <Typography className="text-sm text-green-600 font-medium">
                  Excellent Performance
                </Typography>
              </>
            ) : item.score >= 6 ? (
              <>
                <svg
                  className="w-4 h-4 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <Typography className="text-sm text-yellow-600 font-medium">
                  Good Performance
                </Typography>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <Typography className="text-sm text-red-600 font-medium">
                  Needs Improvement
                </Typography>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
