import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

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

interface TestProgressChartProps {
  data: ISubmitTestAttemptParams[];
}
const getSubjectAverages = (data: any[]) => {
  const subjectMap = new Map();

  data.forEach((test) => {
    if (!subjectMap.has(test.subject)) {
      subjectMap.set(test.subject, { scores: [], count: 0 });
    }
    const subjectData = subjectMap.get(test.subject);
    subjectData.scores.push(test.score);
    subjectData.count += 1;
  });

  return Array.from(subjectMap.entries()).map(([subject, data]) => ({
    subject,
    averageScore:
      data.scores.reduce((sum: number, score: number) => sum + score, 0) /
      data.count,
    testCount: data.count,
  }));
};

const TestProgressChart: React.FC<TestProgressChartProps> = ({ data }) => {
  const chartData = data.map((test, index) => ({
    testNumber: `Test ${index + 1}`,
    score: test.score,
    subject: test.subject,
    topic: test.topic,
    examType: test.examType,
    accuracy:
      test.answers.length > 0
        ? (test.answers.filter((answer) => answer.correct).length /
            test.answers.length) *
          100
        : 0,
  }));

  const CustomizedDot = (props: {
    cx: number;
    cy: number;
    payload: { score: number };
  }) => {
    const { cx, cy, payload } = props;
    const score = payload.score;

    const fillColor =
      score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";

    return (
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill={fillColor}
        stroke="#fff"
        strokeWidth={2}
      />
    );
  };

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active: string;
    payload: any;
    label: string;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-blue-600">Score: {data.score}</p>
          <p className="text-green-600">
            Accuracy: {data.accuracy.toFixed(1)}%
          </p>
          <p className="text-gray-600">Subject: {data.subject}</p>
          <p className="text-gray-600">Topic: {data.topic}</p>
          <p className="text-gray-600">Type: {data.examType}</p>
        </div>
      );
    }
    return null;
  };

  const BarTooltip = ({
    active,
    payload,
    label,
  }: {
    active: string;
    payload: any;
    label: string;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">Subject: {label}</p>
          <p className="text-blue-600">
            Average Score: {data.averageScore.toFixed(1)}
          </p>
          <p className="text-gray-600">Tests Taken: {data.testCount}</p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
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
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <p className="text-lg font-medium">No test data available</p>
        <p className="text-sm mt-2">
          Charts will appear here once you complete some tests
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            Score Progress Over Time
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="testNumber"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              stroke="#6b7280"
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              stroke="#6b7280"
              label={{ value: "Score", angle: -90, position: "insideLeft" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={<CustomizedDot />}
              name="Score"
              activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="accuracy"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="8 4"
              dot={{ r: 3, fill: "#10b981" }}
              name="Accuracy %"
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Excellent (80+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-600">Good (60-79)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-600">Needs Improvement (&lt;60)</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
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
          <h3 className="text-lg font-semibold text-gray-800">
            Subject-wise Average Performance
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={getSubjectAverages(chartData)}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="subject"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              stroke="#6b7280"
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              domain={[0, 10]}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              stroke="#6b7280"
              label={{
                value: "Average Score",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip content={<BarTooltip />} />
            <Bar
              dataKey="averageScore"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              name="Average Score"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Tests</p>
              <p className="text-2xl font-bold">{chartData.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Average Score</p>
              <p className="text-2xl font-bold">
                {(
                  chartData.reduce((sum, test) => sum + test.score, 0) /
                  chartData.length
                ).toFixed(1)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Best Score</p>
              <p className="text-2xl font-bold">
                {Math.max(...chartData.map((test) => test.score))}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestProgressChart;
