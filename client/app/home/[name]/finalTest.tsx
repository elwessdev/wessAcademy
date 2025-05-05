"use client"
import { useAIStore } from '@/app/store/AIStore'
import { memo, useEffect, useLayoutEffect, useState } from 'react'
import JSON5 from 'json5';
import { useQuery } from 'react-query';
import { Button } from 'antd';

type Props = {
    courseID?: number
    initialSystemMessage: string
}

function FinalTest({initialSystemMessage, courseID}: Props) {
    // const waitGenerateTest = useAIStore((state:any) => state.waitGenerateTest);
    const generateFinalTest = useAIStore((state:any) => state.generateFinalTest);
    const [answers, setAnswers] = useState<any>([]);
    const [results, setResults] = useState<any>([]);
    // const [quiz, setQuiz] = useState<any>([]);

    // const fetchQuiz = async () => {
    //     const quizList = await generateFinalTest(initialSystemMessage);
    //     console.log(quizList);
    //     setQuiz(quizList || []);
    //     // console.log(quizList?.questions);
    // }
    // useLayoutEffect(()=>{
    //     fetchQuiz();
    // },[initialSystemMessage]);

    const {data:quiz, isLoading, isError, refetch} = useQuery({
        queryKey: ['quiz',courseID],
        queryFn: async () => {
            const quizList = await generateFinalTest(initialSystemMessage);
            try {
                const parsedQuiz = JSON.parse(quizList);
                return parsedQuiz || [];
            } catch (error) {
                console.error("Error parsing quiz data:", error);
                return [];
            }
        },
        enabled: !!initialSystemMessage && !!courseID,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    });

    const handleVerify = () => {
        setResults(answers)
    }

    const handleReset = () => {
        setResults([]);
        setAnswers([]);
        refetch();
    }

    return (
        <div>
            {isError &&(
                <div className="flex justify-center items-center h-screen">
                    <p className="text-red-500">Error fetching quiz data.</p>
                </div>
            )}
            {isLoading &&(
                <div className="flex justify-center h-screen mt-[90px]">
                    <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-500"></div>
                </div>
            )}
            {(!isLoading) && 
                <div className="container mx-auto p-6 max-w-4xl">
                    {
                        quiz?.length === 0 
                        ? (
                            <>
                                <p className="text-center text-gray-600">No questions available at the moment.</p>
                                <button
                                    className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-full shadow-md transition duration-200 transform hover:scale-105 m-auto block"
                                    onClick={handleReset}
                                >
                                    Generate Test
                                </button>
                            </>
                        ) 
                        : (
                            <div className="space-y-8">
                                {quiz.map((question:any, index:number) => (
                                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border border-indigo-100">
                                        <div className="bg-indigo-600 px-6 py-4">
                                            <h3 className="text-[18px] font-semibold text-white">Question {index + 1}</h3>
                                        </div>
                                        
                                        <div className="p-6">
                                            <p className="text-gray-800 font-medium mb-4">{question.question}</p>
                                            
                                            <div className="space-y-3">
                                                {question.options.map((option:any, optIndex:number) => (
                                                    <div key={optIndex} className="flex items-center">
                                                        <input 
                                                            type="radio" 
                                                            id={`q${index}-opt${optIndex}`}
                                                            name={`question-${index}`}
                                                            className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                                            onChange={() => {
                                                                const updatedAnswers = [...answers];
                                                                updatedAnswers[index] = {
                                                                    text: option?.text,
                                                                    isCorrect: option?.is_correct
                                                                };
                                                                setAnswers(updatedAnswers);
                                                            }}
                                                            checked={answers[index]?.text === option?.text}
                                                            disabled={isLoading || results.length > 0}
                                                        />
                                                        <label 
                                                            htmlFor={`q${index}-opt${optIndex}`} 
                                                            className={`
                                                                ml-3 block text-gray-700 cursor-pointer
                                                                ${
                                                                    results[index]?.text == option.text ? 
                                                                    results[index]?.isCorrect ?'text-[green]' : 'text-[red]' :''
                                                                }
                                                            `}
                                                        >
                                                            {option?.text}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="mt-8 flex justify-center">
                                    {(answers.length == quiz.length && results.length==0 ) && (
                                        <button 
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-full shadow-md transition duration-200 transform hover:scale-105"
                                            onClick={handleVerify}
                                        >
                                            Submit Answers
                                        </button>
                                    )}
                                    {results.length>0&&(
                                        <button
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-full shadow-md transition duration-200 transform hover:scale-105 ml-4"
                                            onClick={handleReset}
                                        >
                                            Test Again
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    )
}

export default memo(FinalTest);