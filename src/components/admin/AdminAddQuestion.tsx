import { useState } from "react";
import { useNavigate } from "react-router-dom";

type TestCase = {
  input: string;
  expectedOutput: string;
};

type QuestionForm = {
  topic: string;
  type: string;
  codeSnippet: string;
  questionText: string;
  answers: string[];
  questionSuggestedAnswers: string[];
  tests: TestCase[];
};

const AdminAddQuestions = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<QuestionForm>({
    topic: "",
    type: "flashcard",
    codeSnippet: "",
    questionText: "",
    answers: [],
    questionSuggestedAnswers: [],
    tests: [],
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleArrayInputChange = <K extends keyof QuestionForm>(
    field: K,
    index: number,
    value: any,
    subfield?: string
  ) => {
    const updatedArray = [...(form[field] as any[])];
    if (subfield) {
      updatedArray[index][subfield] = value;
    } else {
      updatedArray[index] = value;
    }
    setForm({ ...form, [field]: updatedArray });
  };

  const handleAddToArray = <K extends keyof QuestionForm>(
    field: K,
    value: any
  ) => {
    setForm({ ...form, [field]: [...form[field], value] });
  };

  const handleAddTest = () => {
    setForm({
      ...form,
      tests: [...form.tests, { input: "", expectedOutput: "" }],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const preparedForm = { ...form };

      if (form.type === "codingChallenge") {
        preparedForm.tests = form.tests.map((test) => ({
          input: JSON.parse(test.input), // Convert string to array
          expectedOutput: test.expectedOutput,
        }));
      }

      const response = await fetch(
        "https://ii-practicum-team-10-back.onrender.com/api/v1/training/questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(preparedForm),
        }
      );

      if (!response.ok) throw new Error("Failed to submit question");

      setSuccessMsg("Question added successfully!");
      setForm({
        topic: "",
        type: "flashcard",
        codeSnippet: "",
        questionText: "",
        answers: [],
        questionSuggestedAnswers: [],
        tests: [],
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Add a New Question</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Topic</label>
            <select
              className="w-full p-2 border rounded"
              value={form.topic}
              onChange={(e) => handleChange("topic", e.target.value)}
            >
              <option value="">Select Topic</option>
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
              <option value="JavaScript">JavaScript</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Type</label>
            <select
              className="w-full p-2 border rounded"
              value={form.type}
              onChange={(e) => handleChange("type", e.target.value)}
            >
              <option value="flashcard">Flashcard</option>
              <option value="quiz">Quiz</option>
              <option value="codingChallenge">Code Challenge</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Question Text</label>
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Enter the question here"
              value={form.questionText}
              onChange={(e) => handleChange("questionText", e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Code Snippet (optional)
            </label>
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Enter code snippet here"
              value={form.codeSnippet}
              onChange={(e) => handleChange("codeSnippet", e.target.value)}
            />
          </div>

          {/* Answers */}
          <div>
            <label className="block mb-1 font-medium">Correct Answers</label>
            {form.answers.map((ans, i) => (
              <input
                key={i}
                className="w-full p-2 border rounded mb-2"
                placeholder={`Answer ${i + 1}`}
                value={ans}
                onChange={(e) =>
                  handleArrayInputChange("answers", i, e.target.value)
                }
              />
            ))}
            <button
              type="button"
              className="text-blue-600 text-sm"
              onClick={() => handleAddToArray("answers", "")}
            >
              + Add Answer
            </button>
          </div>

          {/* Suggested Answer Choices */}
          <div>
            <label className="block mb-1 font-medium">
              Suggested Answer Choices
            </label>
            {form.questionSuggestedAnswers.map((sug, i) => (
              <input
                key={i}
                className="w-full p-2 border rounded mb-2"
                placeholder={`Choice ${i + 1}`}
                value={sug}
                onChange={(e) =>
                  handleArrayInputChange(
                    "questionSuggestedAnswers",
                    i,
                    e.target.value
                  )
                }
              />
            ))}
            <button
              type="button"
              className="text-blue-600 text-sm"
              onClick={() => handleAddToArray("questionSuggestedAnswers", "")}
            >
              + Add Suggested Answer
            </button>
          </div>

          {/* Tests */}
          <div>
            <label className="block mb-1 font-medium">
              Tests (for Code Challenge)
            </label>
            {form.tests.map((test, i) => (
              <div key={i} className="mb-2 space-y-1">
                <input
                  type="text"
                  placeholder={
                    form.type === "codingChallenge"
                      ? 'Input (e.g., ["a", "b", "c"])'
                      : "Input"
                  }
                  className="w-full p-2 border rounded"
                  value={test.input}
                  onChange={(e) =>
                    handleArrayInputChange("tests", i, e.target.value, "input")
                  }
                />
                <input
                  type="text"
                  placeholder="Expected Output"
                  className="w-full p-2 border rounded"
                  value={test.expectedOutput}
                  onChange={(e) =>
                    handleArrayInputChange(
                      "tests",
                      i,
                      e.target.value,
                      "expectedOutput"
                    )
                  }
                />
              </div>
            ))}
            <button
              type="button"
              className="text-blue-600 text-sm"
              onClick={handleAddTest}
            >
              + Add Test
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded hover:bg-green-500 transition"
          >
            {loading ? "Submitting..." : "Submit Question"}
          </button>

          {successMsg && <p className="text-green-600">{successMsg}</p>}
          {errorMsg && <p className="text-red-600">{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminAddQuestions;
