import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminQuestionsPage = () => {
  const { topic } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchQuestions = () => {
    if (!topic) return;

    setLoading(true);
    setError("");

    fetch(
      `https://ii-practicum-team-10-back.onrender.com/api/v1/training/questions?topic=${encodeURIComponent(
        topic
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch questions");
        return res.json();
      })
      .then((data) => {
        const filtered = data.questions.filter((q: any) => q.topic === topic);
        setQuestions(filtered);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchQuestions();
  }, [topic]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(
        `https://ii-practicum-team-10-back.onrender.com/api/v1/training/questions/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete question");
      }

      setQuestions((prev) => prev.filter((q: any) => q.id !== id));
    } catch (err: any) {
      alert(err.message || "An error occurred while deleting");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 pt-25 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Questions for: {topic}</h1>
      <ul className="space-y-4">
        {questions.map((question: any, index: number) => (
          <li key={index} className="bg-white shadow p-4 rounded-lg">
            <p className="font-medium">{question.questionText}</p>
            <p className="text-sm text-gray-500">Type: {question.type}</p>
            {question.codeSnippet && (
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                <code>{question.codeSnippet}</code>
              </pre>
            )}
            {question.answers?.length > 0 && (
              <div>
                <p className="font-medium">Correct Answer(s):</p>
                <ul className="list-disc pl-5 text-green-700">
                  {question.answers.map((ans: string, i: number) => (
                    <li key={i}>{ans}</li>
                  ))}
                </ul>
              </div>
            )}
            {question.questionSuggestedAnswers?.length > 0 && (
              <div>
                <p className="font-medium">Suggested Answer Choices:</p>
                <ul className="list-disc pl-5 text-blue-700">
                  {question.questionSuggestedAnswers.map(
                    (suggestion: string, i: number) => (
                      <li key={i}>{suggestion}</li>
                    )
                  )}
                </ul>
              </div>
            )}
            {question.tests?.length > 0 && (
              <div>
                <p className="font-medium">Tests:</p>
                <ul className="list-disc pl-5 text-purple-700">
                  {question.tests.map((test: any, i: number) => (
                    <li key={i}>
                      <strong>Input:</strong> {test.input} —{" "}
                      <strong>Expected Output:</strong> {test.expectedOutput}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex justify-start gap-4 pt-4">
              <button
                onClick={() =>
                  navigate(`/admin/questions/${question.id}/edit`, {
                    state: { question },
                  })
                }
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(question.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminQuestionsPage;
