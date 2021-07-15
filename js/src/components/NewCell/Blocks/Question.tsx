import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCreateQuestionMutation, useGetPublicQuestionsQuery, useGetQuestionsQuery } from '../../../services/queryApi';
import QuestionAdmin from '../Admin/QuestionAdmin';
import { IBlock } from '../Cell';


interface BlockProps {
    preview: boolean
}

export interface QuestionBlock {
    title: string
    label: string
}

export interface QuestionResponse {
    questionID: number,
    questionText: string,
    dateCreated: string,
    memberName: string,
    answers: QuestionAnswer[]
}

export interface QuestionAnswer {
    answerID: number,
    answerText: number,
    answererID: number,
    answererName: string,
    dateCreated: number
}

const Question: React.FC<IBlock<QuestionBlock> & BlockProps> = (props) => {
    const [question, setQuestion] = useState("");
    // const [responses, setResponses] = useState<QuestionResponse[]>([]);
    const [message, setMessage] = useState("");
    const [messageTimeout, setMessageTimeout] = useState(null)
    const [createQuestion, { isLoading, isSuccess }] = useCreateQuestionMutation();
    const { isLoading: areQuestionsLoading, isFetching } = useGetQuestionsQuery(props.blockID);
    const { data: publicQuestions, isFetching: isFetchingPublicQuestions } = useGetPublicQuestionsQuery(props.blockID);

    function submitQuestion() {
        createQuestion({
            questionText: question,
            blockID: props.blockID
        })
    }

    useEffect(() => {
        if (message) {
            setMessageTimeout(setTimeout(() => {
                setMessage("");
            }, 2000));
            return () => {
                clearTimeout(messageTimeout);
            }
        }
    }, [message])

    useEffect(() => {
        setMessage("");
    }, [props]);

    useEffect(() => {
        if (isSuccess) {
            setQuestion("");
            setMessage("Your question has been sent!");
        }
    }, [isSuccess])

    console.log(publicQuestions);

    if (props.blockData.title && props.blockData.label) {
        if (!props.preview) {
            return (
                <QuestionAdmin blockID={props.blockID} {...props} />
            )
        }
        return (
            <div>
                <h5 className="card-title">{props.blockData.title}</h5>
                <form>
                    <div className="form-group">
                        <label>{props.blockData.label}</label>
                        <input className="form-control" value={question} onChange={(e) => setQuestion(e.target.value)} />
                    </div>
                    <button onClick={(e) => {
                        e.preventDefault();
                        submitQuestion();
                    }} className="btn btn-primary">Send</button>
                </form>
                {message && <p>{message}</p>}
                <h5 style={{marginTop: "1rem"}} className="card-title">Featured Questions</h5>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem"
                }}>
                    {publicQuestions && publicQuestions.map(q => {
                        return (
                            <div key={q.questionID}>
                                <h5 style={{}}>{q.questionText}</h5>
                                <p>{q.answers && q.answers[0]?.answerText}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default Question;