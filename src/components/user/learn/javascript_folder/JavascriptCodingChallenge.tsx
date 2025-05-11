import ExpBar from "../../shared/ExpBar";
import useAuth from "../../../../hooks/useAuth";
import { useState, useEffect, useRef, version } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import JavaScriptCodingChallengeOutput from "./JavascriptCodingChallengeOutput";

const JavaScriptCodingChallenge = () => {
    const { user } = useAuth();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    // Question data
    const [question, setQuestion] = useState<string>();
    const [questionTests, setQuestionTests] = useState<any[]>([]);
    const [questionId, setQuestionId] = useState<number>();
    const [functionName, setFunctionName] = useState<string>();

    // Logic
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const [userCode, setUserCode] = useState("// Write your code here");
    const [result, setResult] = useState<any[] | null>(null);
    const [passedAllTests, setPassedAllTests] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isQuestionLoading, setIsQuestionLoading] = useState(true);
    const [isRunBtnClicked, setIsRunBtnClicked] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [finalTime, setFinalTime] = useState<string | null>(null);
    
    // User progress
    const [javaScriptProgress, setJavaScriptProgress] = useState<number>(0);
    const [htmlProgress, setHtmlProgress] = useState<number>(0);
    const [cssProgress, setCssProgress] = useState<number>(0);
    const [reactProgress, setReactProgress] = useState<number>(0);
    const [nodejsProgress, setNodejsProgress] = useState<number>(0);
    const [overallProgress, setOverallProgress] = useState<number>(0);

    const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
    const [isQuestionSubmitting, setIsQuestionSubmitting] = useState(false);

    // API
    const baseUrl = import.meta.env.VITE_API_JS_CODING_CHALLENGE_URL;
    const jsCodingChallengeUrl = `${baseUrl}JavaScript/codingChallenge`
    const submitJsCodingChallengeUrl = `${baseUrl}JavaScript/codingChallenge/submit`

    const userProgressUrlBase = import.meta.env.VITE_API_USER_PROGRESS_URL;
    const userProgressUrl = `${userProgressUrlBase}${user?.userId}/progress`;

    const fetchUserProgress = async () => {
        try {
            const response = await fetch(userProgressUrl, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                }
            })

            const data = await response.json();
            setJavaScriptProgress(data.progress.javaScript);
            setHtmlProgress(data.progress.html);
            setCssProgress(data.progress.css);
            setReactProgress(data.progress.react);
            setNodejsProgress(data.progress.nodejs);
            setOverallProgress(data.progress.overall);
        } catch {
            throw console.error();
            
        }
    }

    const updateProgress = async (progressValue: number) => {
        try {
          const response = await fetch(userProgressUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "progress": {
                    "css": cssProgress,
                    "html": htmlProgress,
                    "javaScript": progressValue,
                    "react": reactProgress,
                    "nodejs": nodejsProgress,
                    "overall": overallProgress
                    },
            }),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          
          const data = await response.json();
      
        } catch (error) {
          console.error("Failed to update progress:", error);
        }
      };      

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

            if (data.length > 0) {
                const questionText = data[0].questionText;
                setQuestion(questionText);
                setQuestionId(data[0].id);
                setQuestionTests(data[0].tests);
    
                const match = questionText.match(/`(\w+)`/);
                const functionName = match ? match[1] : null;
    
                setFunctionName(functionName);
                setIsQuestionLoading(false);
                setNumberOfQuestions(data.length);
            } else {
                setIsQuestionLoading(false);
                setNumberOfQuestions(data.length);
            }

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
        setIsQuestionSubmitting(true);
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

            updateProgress(javaScriptProgress + 10);
            const timeTaken = formatElapsedTime(elapsedTime);
            setFinalTime(timeTaken);
            navigate("/coding-challenge-summary", {
                state: {
                    classType: 'JavaScript',
                    finalTime: timeTaken,
                    route: '/learn/javascript/coding-challenge',
                    questionId,
                    javaScriptProgress: javaScriptProgress + 10, // Updated value
                    userCode,
                    result,
                },
              });
        } catch(error) {
            throw console.error();
        }
    }

    {/* Fetches coding challenge problem on load */}
    useEffect(() => {
        fetchJsCodingChallenge();
        fetchUserProgress();

        // Start timer
        const timerId = setInterval(() => {
            setElapsedTime(prev => prev + 1);
        }, 1000);

        // Cleanup timer on unmount
        return () => clearInterval(timerId);
    }, [])

    const formatElapsedTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return [
          h > 0 ? String(h).padStart(2, '0') : null,
          String(m).padStart(2, '0'),
          String(s).padStart(2, '0'),
        ].filter(Boolean).join(':');
      };

    {/* Places the cursor inside the editor on load */}
    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    }

    {/* Returns a set Time Out promise */}
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    function normalizeValue(value: any): any {
        if (typeof value === "string") {
          try {
            // Attempt to parse if it's JSON-like
            const parsed = JSON.parse(value);
            return parsed;
          } catch {
            // It's a plain string, return as-is (trimmed)
            return value.trim();
          }
        }
      
        return value;
      }
      
    function isOutputEqual(output: any, expectedOutput: any): boolean {
        const normalizedOutput = normalizeValue(output);
        const normalizedExpected = normalizeValue(expectedOutput);
        
        return JSON.stringify(normalizedOutput) === JSON.stringify(normalizedExpected);
    }

    {/* Runs user's code on all tests */}
    const runTests = async () => {
        setIsLoading(false);
        setIsRunBtnClicked(true);

        const sourceCode = editorRef.current?.getValue();
        if (!sourceCode) return;
      
        if (!questionTests || questionTests.length === 0) return;
      
        const testResults: { passed: boolean; output: string; expectedOutput: string }[] = [];
      
        for (const test of questionTests) {
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
            const output = data.run.stdout.trim();
            const expectedOutput = test.expectedOutput;
            const passed = isOutputEqual(output, expectedOutput);
      
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
      
        setResult(testResults);
        setPassedAllTests(testResults.every(test => test.passed));
        setIsLoading(true);
      };
      
    return (
        <>
        {isQuestionLoading ? 
            <div className="w-full h-screen text-[30px] flex justify-center items-center"><p>Question loading ...</p></div>
        :
            numberOfQuestions ?
                isQuestionSubmitting ? 
                    <div className="w-full h-screen text-[30px] flex justify-center items-center"><p>Question submitting ...</p></div> 
                :
                    <div className="flex flex-col justify-center items-center w-full max-w-4xl mx-auto p-4 pt-30">
                        <div className="w-[350px] h-[100px] lg:w-[850px] md:w-[760px] sm:w-[650px] ">
                            <ExpBar label="JavaScript" value={javaScriptProgress}/>
                        </div>
                        <h2 className="text-xl font-bold w-[350px] mb-4 lg:w-[850px] md:w-[760px] sm:w-[650px]">
                            {question}
                        </h2>

                        <div className="w-[350px] lg:w-[850px] md:w-[768px] sm:w-[640px]">
                            <Editor
                                height="400px"
                                width="100%"
                                defaultLanguage="javascript"
                                value={userCode}
                                onChange={(value) => setUserCode(value || "")}
                                onMount={onMount}
                                theme="vs-dark"
                            />
                        </div>


                        {showPopup && (
                            <div className="fixed top-15 left-0 w-full h-full flex justify-center items-center z-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center w-[350px] sm:w-full">
                                <p className="text-lg font-semibold mb-4">Please pass all the test cases before submitting.</p>
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
                                <div className="flex flex-col justify-center items-center mt-4 bg-gray-100 w-[350px] text-black text-[20px] p-4 rounded lg:w-[850px] md:w-[768px] sm:w-[640px]">
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

                        <div className="w-[350px] flex justify-between items-end gap-3 lg:w-[850px] md:w-[768px] sm:w-[640px]">
                            <div className="w-[300px] text-xl font-semibold p-2">
                                    Time Elapsed: {formatElapsedTime(elapsedTime)}
                            </div>
                            <div className="w-[350px] mt-4 flex justify-end items-end gap-3 lg:w-[850px] md:w-[768px] sm:w-[640px]">
                                <button onClick={runTests} className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-400 hover:cursor-pointer"> Run Tests </button>
                                <button onClick={submitJsCodingChallenge} className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-400 hover:cursor-pointer">Submit</button>
                            </div>
                        </div>
                    </div>
            :
                <div className="w-full h-screen text-[30px] flex justify-center items-center"><p>No more questions!</p></div>
        }
        </>
    )
}

export default JavaScriptCodingChallenge;