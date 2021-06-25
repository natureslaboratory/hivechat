import axios from 'axios';
import React, { useState } from 'react';
import { QuestionBlock, QuestionResponse } from '../Blocks/Question';
import { IBlock } from '../Cell';
import QuestionAdminModal, { QuestionAdminProps } from './QuestionAdminModal';
import { useSelector, useDispatch } from 'react-redux'
import { QuestionModalProps, set, unset } from '../../../slices/questionSlice'
import { AppDispatch, RootState } from '../../../pages/manageHive';

interface QuestionAdminWrapperProps {
    responses: QuestionResponse[]
    getResponses(): void;
}


const QuestionAdmin: React.FC<IBlock<QuestionBlock> & QuestionAdminWrapperProps> = (props) => {
    const [showManage, setShowManage] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<QuestionResponse>(null);

    const dispatch = useDispatch<AppDispatch>();
    const question = useSelector((state: RootState) => state.question);

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
                    // setShowManage(true);
                    // dispatch(set())
                    dispatch(set(props));
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
