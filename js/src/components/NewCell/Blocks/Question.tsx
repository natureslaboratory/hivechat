import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
    const [responses, setResponses] = useState<QuestionResponse[]>([]);
    const [message, setMessage] = useState("");
    const [messageTimeout, setMessageTimeout] = useState(null)

    function submitQuestion() {
        let data = new FormData();

        data.append("blockID", props.blockID.toString());
        data.append("questionText", question);

        axios.post("/page-api/q-and-a/create-question", data)
            .then(res => {
                console.log(res);
                setQuestion("");
                setMessage("Your question has been sent!");
            })
    }

    function getResponses() {
        axios.get(`/page-api/q-and-a/get-questions?blockID=${props.blockID}`)
            .then(res => {
                console.log(res.data);
                setResponses(res.data.map(r => {
                    return {
                        ...r,
                        questionID: parseInt(r.questionID)
                    }
                }));
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
        getResponses();
    }, [])

    if (props.blockData.title && props.blockData.label) {
        if (!props.preview) {
            return (
                <QuestionAdmin getResponses={getResponses} {...props} responses={responses} />
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
            </div>
        )
    } else {
        return null;
    }
}

export default Question;