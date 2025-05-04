import ExpBar from "../../shared/ExpBar";
import useAuth from "../../../../hooks/useAuth";
import { useState, useEffect, useRef, version } from "react";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import JavaScriptCodingChallengeOutput from "./JavascriptCodingChallengeOutput";

const JavaScriptCodingChallenge = () => {
    const { user } = useAuth();
    const token = localStorage.getItem("token");
    
    const [question, setQuestion] = useState<string>();
    const [questionTests, setQuestionTests] = useState<any[]>([]);
    const [questionId, setQuestionId] = useState<number>();
    const [functionName, setFunctionName] = useState<string>();

    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const [userCode, setUserCode] = useState("// Write your code here");
    const [result, setResult] = useState<any[] | null>(null);
    const [passedAllTests, setPassedAllTests] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRunBtnClicked, setIsRunBtnClicked] = useState(false);

    const baseUrl = import.meta.env.VITE_API_JS_CODING_CHALLENGE_URL;
    const jsCodingChallengeUrl = `${baseUrl}JavaScript/codingChallenge`
    const submitJsCodingChallengeUrl = `${baseUrl}JavaScript/codingChallenge/submit`

    {/* Fetches coding challenge */}
    const fetchJsCodingChallenge = async () => {
        try {
            const response = await fetch(jsCodingChallengeUrl, {
                method: "Get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await response.json();
            // console.log("Question", data[0].questionText);
            // console.log("QuestionID", data[0].id);
            // console.log("QuestionTESTS", data[0].tests);
            // console.log("Questions QUANTITY", data.length)

            const questionText = data[3].questionText;

            setQuestion(questionText);
            setQuestionId(data[3].id);
            setQuestionTests(data[3].tests);

            const match = questionText.match(/`(\w+)`/);
            const functionName = match ? match[1] : null;

            setFunctionName(functionName);

        } catch(error) {
            throw console.error();
        }
    }
    
    {/* Submits the problem if user passes all test cases */}
    const submitJsCodingChallenge = async () => {
        if (!passedAllTests) {
            setShowPopup(true);
            return;
        }

        try {
            const response = await fetch(submitJsCodingChallengeUrl, {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }, 
                body: JSON.stringify({
                    "questionId": `${questionId}`
                }),
            });

            const data = await response.json();

            console.log("SUBMITTED DATA: ", data);
            window.location.reload();
        } catch(error) {
            throw console.error();
        }
    }

    {/* Fetches coding challenge problem on load */}
    useEffect(() => {
        fetchJsCodingChallenge();
    }, [])

    {/* Places the cursor inside the editor on load */}
    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    }

    {/* Returns a set Time Out promise */}
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    {/* Runs user's code on all tests */}
    const runTests = async () => {
        setIsLoading(false);
        setIsRunBtnClicked(true);

        const sourceCode = editorRef.current?.getValue();
        if (!sourceCode) return;
      
        if (!questionTests || questionTests.length === 0) return;
      
        const testResults: { passed: boolean; output: string; expectedOutput: string }[] = [];
        // console.log("SOURCE CODE", sourceCode);
        console.log("FUNCTION NAME", functionName);
      
        for (const test of questionTests) {
            console.log("TEST", test)
            const wrappedCode = `
            ${sourceCode}
            
            console.log(${functionName}(${JSON.stringify(test.input)}));
                `;
      
          try {
            const response = await fetch("https://emkc.org/api/v2/piston/execute", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                language: "javascript",
                version: "18.15.0",
                files: [
                  {
                    content: wrappedCode,
                  },
                ],
              }),
            });
      
            const data = await response.json();
            console.log("DATA", data)
            const output = data.run.stdout.trim();
            console.log("OUTPUT", output)
            const expectedOutput = String(test.expectedOutput);
            const passed = output === String(test.expectedOutput);
      
            testResults.push({
              passed,
              output,
              expectedOutput
            });
      
          } catch (error) {
            console.error(`Error running test ${test.id}:`, error);
            testResults.push({
              passed: false,
              output: "Execution error",
              expectedOutput: "Execution error"
            });
          }

          await sleep(200);
        }
      
        console.log("TEST RESULTS", testResults);
      
        setResult(testResults);
        setPassedAllTests(testResults.every(test => test.passed));
        setIsLoading(true);
      };
      
    return (
        <div className="flex flex-col justify-center items-center w-full max-w-4xl mx-auto p-4 pt-30">
            <h2 className="text-xl font-bold w-[850px] mb-4">
                {question}
            </h2>

            <Editor
                height="400px"
                width="850px"
                defaultLanguage="javascript"
                value={userCode}
                onChange={(value) => setUserCode(value || "")}
                onMount={onMount}
                theme="vs-dark"
            />

            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
                    <p className="text-lg font-semibold mb-4">Please pass all the tests before submitting.</p>
                    <button
                        onClick={() => setShowPopup(false)}
                        className="bg-green-500 text-white px-4 py-2 cursor-pointer rounded-xl hover:bg-green-400"
                    >
                        OK
                    </button>
                    </div>
                </div>
            )}

            {isRunBtnClicked ? 
                isLoading ? 
                    Array.isArray(result) &&  
                    <div className="flex flex-col justify-center items-center mt-4 bg-gray-100 w-[850px] text-black text-[20px] p-4 rounded">
                        {result.map((res, i) => (
                            <div
                                key={res.id}
                                className={`whitespace-pre-wrap ${res.passed ? "text-green-600" : "text-red-600"}`}
                            >
                                {res.passed
                                ? `Test ${i + 1} passed`
                                : `Test ${i + 1} failed | Output: ${res.output} | Expected Output: ${res.expectedOutput}`}
                            </div>
                            ))
                        }
                    </div>
                        
                : 
                    <div className="flex flex-col justify-center items-center mt-4 bg-gray-100 w-[850px] text-black text-[20px] p-4 rounded"><p className="whitespace-pre-wrap ">Loading ...</p></div>

            : 
            
                <div></div>

            }

            <div className="w-[850px] mt-4 flex justify-end items-end gap-3">
                <button onClick={runTests} className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-400 hover:cursor-pointer"> Run Tests </button>
                <button onClick={submitJsCodingChallenge} className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-400 hover:cursor-pointer">Submit</button>
            </div>
        </div>
    )
}

export default JavaScriptCodingChallenge;