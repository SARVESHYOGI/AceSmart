import { useEffect, useState } from "react";
import { fetchTestByID, submitTestAttempt } from "../api/mockTest";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

// Types
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

type FormData = {
  [key: string]: string; // question-_id: selectedOption
};

function TestPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Test | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [score, setScore] = useState(0);

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
          setError("Failed to fetch test data. Please try again later.");
        }
      }
    }
    fetchData();
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (formData: FormData) => {
    if (!data || !id) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const answers = data.testQuestions.questions.map((question) => {
        const selectedOption = formData[`question-${question._id}`];
        return {
          questionId: question._id,
          selectedOption,
          correct: selectedOption === question.correctAnswer,
        };
      });

      const score = answers.reduce(
        (total, answer) => (answer.correct ? total + 1 : total),
        0
      );
      setScore(score);

      await submitTestAttempt({
        examType: data.testQuestions.examType,
        subject: data.testQuestions.subject,
        topic: data.testQuestions.topic,
        score,
        answers,
      });

      setSubmitSuccess(true);
    } catch (err) {
      console.error("Submission failed:", err);
      setSubmitError("Failed to submit test. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!data) return <div className="p-4">Loading test...</div>;

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

      {submitSuccess ? (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
          Test submitted successfully! your score is {score}
        </div>
      ) : (
        <div>
          <h5 className="text-lg font-semibold mb-3">Questions:</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                      <label
                        key={opt}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          className="mr-2 accent-blue-600"
                          value={opt}
                          {...register(`question-${question._id}`, {
                            required: "Please select an answer",
                          })}
                        />
                        <span className="font-bold mr-2">{opt}.</span>
                        <span>{question.options[opt]}</span>
                      </label>
                    ))}
                    {errors[`question-${question._id}`] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[`question-${question._id}`]?.message}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-6 px-4 py-2 rounded-md text-white ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Test"}
            </button>

            {submitError && <p className="text-red-500 mt-2">{submitError}</p>}
          </form>
        </div>
      )}
    </div>
  );
}

export default TestPage;
