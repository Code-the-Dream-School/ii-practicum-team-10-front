import ExpBar from "../../shared/ExpBar";
import useAuth from "../../../../hooks/useAuth";
import { useState, useEffect, useRef, version } from "react";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import JavaScriptCodingChallengeOutput from "./JavascriptCodingChallengeOutput";

const JavaScriptCodingChallenge = () => {
    const { user } = useAuth();
    const token = localStorage.getItem("token");
    const [questions, setQuestions] = useState<string[]>([]);
    const [tests, setTests] = useState<any[]>([]);

    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userCode, setUserCode] = useState("// Write your code here");
    const [result, setResult] = useState<string | null>(null);

    const baseUrl = import.meta.env.VITE_API_JS_CODING_CHALLENGE_URL;
    const jsCodingChallengeUrl = `${baseUrl}JavaScript/codingChallenge`

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


            const questionsText: string[] = [];
            const formattedTests: { input: any[]; expected: any }[][] = [];
            
            data.forEach((question: any) => {
              questionsText.push(question.questionText);
            
              const mappedTests = question.tests.map((test: any) => ({
                input: test.input,
                expected: test.expectedOutput,
              }));
            
              formattedTests.push(mappedTests);
            });
            
            setQuestions(questionsText);
            setTests(formattedTests);

        } catch {
            throw console.error();
        }
    }

    useEffect(() => {
        fetchJsCodingChallenge();
    }, [])

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    }

    const runTests = async () => {
        const sourceCode = editorRef.current?.getValue();
        if (!sourceCode) return;
      
        const currentTests = [{input: [1,5,3], expectedOutput: 5, id: "asd675asd65asd7"}];
        if (!currentTests || currentTests.length === 0) return;
      
        const testResults: { id: string; passed: boolean; output: string }[] = [];
      
        for (const test of currentTests) {
            console.log("TEST", test)
            const wrappedCode = `
            ${sourceCode}
            
            console.log(findMax(${JSON.stringify(test.input)}));
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
            console.log("PASSED", output)
            const passed = output === String(test.expectedOutput);
      
            testResults.push({
              id: test.id,
              passed,
              output,
            });
      
          } catch (error) {
            console.error(`Error running test ${test.id}:`, error);
            testResults.push({
              id: test.id,
              passed: false,
              output: "Execution error",
            });
          }
        }
      
        // Format and display result
        const summary = testResults
          .map((res, i) =>
            res.passed
              ? `Test ${i + 1} passed`
              : `Test ${i + 1} failed (Output: ${res.output})`
          )
          .join("\n");
      
        setResult(summary);
      };
      
    return (
        <div className="flex flex-col justify-center items-center w-full max-w-4xl mx-auto p-4 pt-30">
            <h2 className="text-xl font-bold mb-4">
                Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex]}
            </h2>

            <div className="flex justify-center items-center">

                <Editor
                    height="400px"
                    width="400px"
                    defaultLanguage="javascript"
                    value={userCode}
                    onChange={(value) => setUserCode(value || "")}
                    onMount={onMount}
                    theme="vs-dark"
                />

                <JavaScriptCodingChallengeOutput/>


            </div>

            <div className="mt-4 flex gap-4">
                <button onClick={runTests} className="bg-green-500 text-white px-4 py-2 rounded">
                Run Tests
                </button>

                {currentQuestionIndex < questions.length - 1 && (
                <button
                    onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Next Question
                </button>
                )}
            </div>

            {result && <p className="mt-4 font-bold">{result}</p>}
        </div>

    )
}

export default JavaScriptCodingChallenge;