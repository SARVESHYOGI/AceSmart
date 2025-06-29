import { useEffect, useState } from "react";
import { fetchTestByID } from "../api/mockTest";
import { useParams } from "react-router-dom";

export type Test = {
  testQuestions: TestData;
};
export type TestData = {
  createdAt: string;
  examType: string;
  questions: Question[];
  subject: string;
  topic: string;
  _id: string;
};
export type MCQOptionKey = "A" | "B" | "C" | "D";

export type Question = {
  correctAnswer: string;
  createdAt: string;
  explanation: string;
  options: Record<MCQOptionKey, string>;
  question: string;
  _id: string;
};

function TestPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Test | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (id) {
        try {
          const res = await fetchTestByID(id);
          if (res) {
            setData(res);
          } else {
            setError("Test data not found");
          }
        } catch (err) {
          console.error("Failed to fetch test", err);
          setError("Failed to fetch test data");
        }
      }
    }
    fetchData();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!data) return <div>Loading...</div>;
  console.log("data", data);
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8 overflow-x-hidden">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">
          Exam Type:{" "}
          <span className="font-normal">{data.testQuestions.examType}</span>
        </h2>
        <h3 className="text-xl font-semibold mb-1">
          Topic: <span className="font-normal">{data.testQuestions.topic}</span>
        </h3>
        <h4 className="text-lg font-medium mb-4">
          Subject:{" "}
          <span className="font-normal">{data.testQuestions.subject}</span>
        </h4>
      </div>
      <div>
        <h5 className="text-lg font-semibold mb-3">Questions:</h5>
        <ol className="space-y-6">
          {data.testQuestions.questions.map((question, idx) => (
            <li
              key={question._id}
              className="bg-gray-50 rounded-lg p-4 shadow-sm"
            >
              <div className="mb-3 font-medium text-gray-800">
                <span className="mr-2 text-blue-600">{idx + 1}.</span>
                {question.question.replace(/\*/g, " ")}
              </div>
              <div className="grid grid-cols-1 gap-2">
                {(["A", "B", "C", "D"] as MCQOptionKey[]).map((opt) => (
                  <label key={opt} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2 accent-blue-600"
                      name={`question-${question._id}`}
                      value={opt}
                    />
                    <span className="font-bold mr-2">{opt}.</span>
                    <span>{question.options[opt]}</span>
                  </label>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default TestPage;
