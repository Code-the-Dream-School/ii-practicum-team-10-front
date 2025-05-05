import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const EditQuestionPage = () => {
  const { id } = useParams(); // question id
  const navigate = useNavigate();
  const location = useLocation();
  const { question } = location.state as { question: any }; // improve typing later

  const [topic] = useState(question.topic); // Topic is not editable in edit
  const [type, setType] = useState(question.type || "");
  const [questionText, setQuestionText] = useState(question.questionText || "");
  const [codeSnippet, setCodeSnippet] = useState(question.codeSnippet || "");
  const [answers, setAnswers] = useState<string[]>(question.answers || []);
  const [suggestedAnswers, setSuggestedAnswers] = useState<string[]>(
    question.questionSuggestedAnswers || []
  );
  const [tests, setTests] = useState<any[]>(question.tests || []);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleArrayChange = (
    arrSetter: any,
    arr: any[],
    index: number,
    value: string,
    key?: string
  ) => {
    const newArr = [...arr];
    if (key) {
      newArr[index][key] = value;
    } else {
      newArr[index] = value;
    }
    arrSetter(newArr);
  };

  const handleDeleteArrayItem = (arrSetter: any, arr: any[], index: number) => {
    const newArr = arr.filter((_, i) => i !== index);
    arrSetter(newArr);
  };

  const handleAddArrayItem = (
    arrSetter: any,
    arr: any[],
    defaultValue: any
  ) => {
    arrSetter([...arr, defaultValue]);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://ii-practicum-team-10-back.onrender.com/api/v1/training/questions/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            questionText,
            answers,
            questionSuggestedAnswers: suggestedAnswers,
            type,
            codeSnippet,
            tests,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update question");
      }

      alert("Question updated!");
      navigate(`/admin-questions/${question.topic}`);
    } catch (err: any) {
      setErrorMsg(err.message || "Error updating question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Question</h1>

        <div className="space-y-6">
          {/* Type */}
          <div>
            <label className="block mb-1 font-medium">Type</label>
            <select
              className="w-full p-2 border rounded"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="flashcard">Flashcard</option>
              <option value="quiz">Quiz</option>
              <option value="codingChallenge">Code Challenge</option>
            </select>
          </div>

          {/* Question Text */}
          <div>
            <label className="block mb-1 font-medium">Question Text</label>
            <textarea
              className="w-full p-2 border rounded"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </div>

          {/* Code Snippet */}
          <div>
            <label className="block mb-1 font-medium">
              Code Snippet (optional)
            </label>
            <textarea
              className="w-full p-2 border rounded"
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
            />
          </div>

          {/* Correct Answers */}
          <div>
            <label className="block mb-1 font-medium">Correct Answers</label>
            {answers.map((ans, i) => (
              <div key={i} className="flex items-center space-x-2 mb-2">
                <input
                  className="w-full p-2 border rounded"
                  value={ans}
                  onChange={(e) =>
                    handleArrayChange(setAnswers, answers, i, e.target.value)
                  }
                />
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => handleDeleteArrayItem(setAnswers, answers, i)}
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-blue-600 text-sm"
              onClick={() => handleAddArrayItem(setAnswers, answers, "")}
            >
              + Add Answer
            </button>
          </div>

          {/* Suggested Answer Choices */}
          <div>
            <label className="block mb-1 font-medium">
              Suggested Answer Choices
            </label>
            {suggestedAnswers.map((sug, i) => (
              <div key={i} className="flex items-center space-x-2 mb-2">
                <input
                  className="w-full p-2 border rounded"
                  value={sug}
                  onChange={(e) =>
                    handleArrayChange(
                      setSuggestedAnswers,
                      suggestedAnswers,
                      i,
                      e.target.value
                    )
                  }
                />
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() =>
                    handleDeleteArrayItem(
                      setSuggestedAnswers,
                      suggestedAnswers,
                      i
                    )
                  }
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-blue-600 text-sm"
              onClick={() =>
                handleAddArrayItem(setSuggestedAnswers, suggestedAnswers, "")
              }
            >
              + Add Suggested Answer
            </button>
          </div>

          {/* Tests */}
          <div>
            <label className="block mb-1 font-medium">
              Tests (for Code Challenge)
            </label>
            {tests.map((test, i) => (
              <div key={i} className="mb-2 space-y-1">
                <input
                  type="text"
                  placeholder="Input"
                  className="w-full p-2 border rounded"
                  value={test.input}
                  onChange={(e) =>
                    handleArrayChange(
                      setTests,
                      tests,
                      i,
                      e.target.value,
                      "input"
                    )
                  }
                />
                <input
                  type="text"
                  placeholder="Expected Output"
                  className="w-full p-2 border rounded"
                  value={test.expectedOutput}
                  onChange={(e) =>
                    handleArrayChange(
                      setTests,
                      tests,
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
              onClick={() =>
                handleAddArrayItem(setTests, tests, {
                  input: "",
                  expectedOutput: "",
                })
              }
            >
              + Add Test
            </button>
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded hover:bg-green-500 transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

          {errorMsg && <p className="text-red-600">{errorMsg}</p>}
        </div>
      </div>
    </div>
  );
};

export default EditQuestionPage;

// import { useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";

// const EditQuestionPage = () => {
//   const { id } = useParams(); // question id
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { question } = location.state as { question: any }; // improve typing later

//   const [questionText, setQuestionText] = useState(question.questionText);
//   const [answers, setAnswers] = useState<string[]>(question.answers || []);
//   const [suggestedAnswers, setSuggestedAnswers] = useState<string[]>(
//     question.questionSuggestedAnswers || []
//   );
//   const [type, setType] = useState(question.type || "");
//   const [codeSnippet, setCodeSnippet] = useState(question.codeSnippet || "");
//   const [tests, setTests] = useState<any[]>(question.tests || []);

//   const [error, setError] = useState("");

//   const handleUpdate = async () => {
//     try {
//       const response = await fetch(
//         `https://ii-practicum-team-10-back.onrender.com/api/v1/training/questions/${id}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: JSON.stringify({
//             questionText,
//             answers,
//             questionSuggestedAnswers: suggestedAnswers,
//             type,
//             codeSnippet,
//             tests,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update question");
//       }

//       alert("Question updated!");
//       navigate(`/admin/questions/${question.topic}`);
//     } catch (err: any) {
//       alert(err.message || "Error updating question");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Edit Question</h1>

//       <div className="space-y-4">
//         {/* Question Text */}
//         <div>
//           <label className="block mb-1">Question Text:</label>
//           <textarea
//             value={questionText}
//             onChange={(e) => setQuestionText(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         {/* Answers */}
//         <div>
//           <label className="block mb-1">Answers:</label>
//           {answers.map((answer, index) => (
//             <div key={index} className="flex items-center space-x-2 mb-2">
//               <input
//                 type="text"
//                 value={answer}
//                 onChange={(e) => {
//                   const updatedAnswers = [...answers];
//                   updatedAnswers[index] = e.target.value;
//                   setAnswers(updatedAnswers);
//                 }}
//                 className="p-2 border rounded w-full"
//               />
//               <button
//                 type="button"
//                 onClick={() => {
//                   setAnswers(answers.filter((_, i) => i !== index));
//                 }}
//                 className="text-red-500"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={() => setAnswers([...answers, ""])}
//             className="mt-2 p-2 bg-blue-500 text-white rounded"
//           >
//             Add Answer
//           </button>
//         </div>

//         {/* Suggested Answers */}
//         <div>
//           <label className="block mb-1">Suggested Answers:</label>
//           {suggestedAnswers.map((suggestion, index) => (
//             <div key={index} className="flex items-center space-x-2 mb-2">
//               <input
//                 type="text"
//                 value={suggestion}
//                 onChange={(e) => {
//                   const updatedSuggestions = [...suggestedAnswers];
//                   updatedSuggestions[index] = e.target.value;
//                   setSuggestedAnswers(updatedSuggestions);
//                 }}
//                 className="p-2 border rounded w-full"
//               />
//               <button
//                 type="button"
//                 onClick={() => {
//                   setSuggestedAnswers(
//                     suggestedAnswers.filter((_, i) => i !== index)
//                   );
//                 }}
//                 className="text-red-500"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={() => setSuggestedAnswers([...suggestedAnswers, ""])}
//             className="mt-2 p-2 bg-blue-500 text-white rounded"
//           >
//             Add Suggested Answer
//           </button>
//         </div>

//         {/* Code Snippet */}
//         <div>
//           <label className="block mb-1">Code Snippet:</label>
//           <textarea
//             value={codeSnippet}
//             onChange={(e) => setCodeSnippet(e.target.value)}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         {/* Save Changes */}
//         <div>
//           <button
//             type="button"
//             onClick={handleUpdate}
//             className="mt-6 p-3 bg-green-500 text-white rounded"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditQuestionPage;
