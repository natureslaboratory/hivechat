import axios from 'axios';
import React, { useState } from 'react';
import { QuestionBlock, QuestionResponse } from '../Blocks/Question';
import { IBlock } from '../Cell';
import QuestionAdminModal from './QuestionAdminModal';

interface QuestionAdminProps {
    responses: QuestionResponse[]
    getResponses(): void;
}


const QuestionAdmin: React.FC<IBlock<QuestionBlock> & QuestionAdminProps> = (props) => {
    const [showManage, setShowManage] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<QuestionResponse>(null);

    function submitAnswer(answerText: string, questionID: number, answerPrivacy = "Private") {
        let data = new FormData();
        data.append("questionID", questionID.toString());
        data.append("answerText", answerText);
        data.append("answerPrivacy", answerPrivacy);

        return axios.post("/page-api/q-and-a/create-answer", data)
            .then(res => {
                console.log(res);
                console.log(res.data);
                props.getResponses()
            })

    }

    return (
        <div>
            <h5 className="card-title">{props.blockData.title}</h5>
            <p>Responses: {props.responses.length}</p>
            <div className="btn-container">
                <button className="btn btn-primary" onClick={(e) => {
                    e.preventDefault();
                    setShowManage(true);
                }}>Manage</button>
            </div>

            {showManage &&
                <QuestionAdminModal
                    selectedQuestion={selectedQuestion}
                    setSelectedQuestion={setSelectedQuestion}
                    responses={props.responses}
                    setShowManage={setShowManage}
                    submitAnswer={submitAnswer}
                />
            }
        </div>
    )
}

export default QuestionAdmin;