import React, { useState } from 'react';
import { QuestionResponse } from '../Blocks/Question';
import { useSelector, useDispatch } from 'react-redux'
import { setBlockID, unsetBlockID } from '../../../slices/questionSlice'
import { AppDispatch, RootState } from '../../../pages/manageHive';
import axios from 'axios';
import { AnswerFormProps, AnswerListProps, PostAnswer, Question } from '../../../services/types';
import { useGetQuestionsQuery, useSubmitAnswerMutation } from '../../../services/queryApi';

export interface QuestionAdminProps {
    blockID: number
    selectedQuestion?: QuestionResponse
}

interface QuestionAdminFuncs {
}

const QuestionAdminModal: React.FC<QuestionAdminProps & QuestionAdminFuncs> = (props) => {
    const [answer, setAnswer] = useState("");
    const [privacy, setPrivacy] = useState<"Public" | "Private">("Private");
    const [selectedQuestion, setSelectedQuestion] = useState<number>(null)
    const dispatch = useDispatch<AppDispatch>();
    const [submitAnswer, { isLoading }] = useSubmitAnswerMutation();
    const { data: responses, error, isLoading: responsesLoading } = useGetQuestionsQuery(props.blockID);


    // function submitAnswer(answerText: string, questionID: number, answerPrivacy = "Private") {
    //     let data = new FormData();
    //     data.append("questionID", questionID.toString());
    //     data.append("answerText", answerText);
    //     data.append("answerPrivacy", answerPrivacy);

    //     return axios.post("/page-api/q-and-a/create-answer", data)
    //         .then(res => {
    //             console.log(res);
    //             console.log(res.data);
    //             // props.getResponses()
    //         })
    // }

    let content = (
        <table className="mb-0 table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Question</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {responses && responses.map((r, i) => {
                    return (
                        <tr key={i}>
                            <td>{r.memberName}</td>
                            <td>{r.questionText}</td>
                            <td className="btn-container" style={{ margin: 0 }}>
                                <button className="btn btn-outline-primary" onClick={() => {
                                    setSelectedQuestion(r.questionID);
                                }}>
                                    View
                                </button>
                                <button className="btn btn-outline-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )

    let back = null;

    if (selectedQuestion) {
        const currentQuestion = responses.filter((d, i) => d.questionID == selectedQuestion)[0];
        if (currentQuestion) {
            content = (
                <>
                    <h5>{currentQuestion.questionText}</h5>
                    <p>from {currentQuestion.memberName}</p>
                    <AnswerList selectedQuestion={currentQuestion} />
                    <AnswerForm {...{privacy, answer, setAnswer, setPrivacy}}  />
                </>
            )
    
            back = (
                <>
                    <button className="btn btn-secondary" onClick={(e) => {
                        e.preventDefault();
                        console.log("submit");
                        let newAnswer: PostAnswer = {
                            answerText: answer,
                            questionID: currentQuestion.questionID,
                            answerPrivacy: privacy
                        }
                        submitAnswer(newAnswer);
                    }}>Submit</button>
                    <button className="btn btn-secondary" onClick={(e) => {
                        e.preventDefault();
                        setSelectedQuestion(null);
                    }}>Back</button>
                </>
            )
        } else {
            setSelectedQuestion(null);
        }
    }

    return (
        <div className="c-question__manage-wrapper">
            <div className="card c-question__manage">
                <div className="card-body">
                    {content}
                    <div className="btn-container">
                        {back}
                        <button className="btn btn-secondary" onClick={(e) => {
                            e.preventDefault();
                            dispatch(unsetBlockID());
                        }}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}



const AnswerList: React.FC<AnswerListProps> = ({ selectedQuestion }) => {
    return (
        <>
            <h6>Current Answers</h6>
            <div className="c-answers">
                {selectedQuestion.answers ? selectedQuestion.answers.map((a, i) => {
                    return (
                        <div className="c-answer" key={a.answerID}>
                            <p>{a.answerText}</p>
                            <div className="c-answer__details">
                                <p>{a.answererName}</p>
                            </div>
                        </div>
                    )
                }) : <em>No answers</em>}
            </div>
        </>
    )
}

const AnswerForm: React.FC<AnswerFormProps> = ({ setAnswer, setPrivacy, privacy, answer }) => {
    return (
        <form>
            <div className="form-group">
                <label>Answer</label>
                <textarea style={{ minHeight: "120px" }} className="form-control" onChange={(e) => setAnswer(e.target.value)} value={answer} />
            </div>
            <div className="form-group c-form-check">
                <label className="c-form-check__label">
                    Would you like this answer to be listed on the question block?
                </label>
                <input type="checkbox" className="c-form-check__input" id="contactList" value="1" onChange={() => {
                    if (privacy == "Private") {
                        setPrivacy("Public");
                    } else {
                        setPrivacy("Private");
                    }
                }} checked={privacy == "Private" ? false : true} />
            </div>
        </form>
    )
}

export default QuestionAdminModal;