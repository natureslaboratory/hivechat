import axios from 'axios';
import React, { useState } from 'react';
import { IBlock } from '../Cell';



export interface QuestionBlock {
    title: string
    label: string
}

const Question: React.FC<IBlock<QuestionBlock>> = (props) => {
    const [question, setQuestion] = useState("");
    const [message, setMessage] = useState("");

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

    if (props.blockData.title && props.blockData.label) {
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