import React, { useState } from 'react';
import { QuestionResponse } from '../Blocks/Question';

interface QuestionAdminProps {
    responses: QuestionResponse[]
    selectedQuestion?: QuestionResponse
    setShowManage(set: boolean): void
    setSelectedQuestion(question: QuestionResponse): void
    submitAnswer(answerText: string, questionID: number, answerPrivacy?: string) : Promise<void>
}

const QuestionAdminModal: React.FC<QuestionAdminProps> = (props) => {
    const [answer, setAnswer] = useState("");
    const [privacy, setPrivacy] = useState<"Public" | "Private">("Private");

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
                {props.responses && props.responses.map((r, i) => {
                    return (
                        <tr>
                            <td>{r.memberName}</td>
                            <td>{r.questionText}</td>
                            <td className="btn-container" style={{margin: 0}}>
                                <button className="btn btn-outline-primary" onClick={() => {
                                    props.setSelectedQuestion(r);
                                }}>
                                    Answer
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

    if (props.selectedQuestion) {
        content = (
            <form>
                <div className="form-group">
                    <label>{props.selectedQuestion.questionText}</label>
                    <textarea className="form-control" onChange={(e) => setAnswer(e.target.value)} value={answer} />
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

        back = (
            <>
                <button className="btn btn-secondary" onClick={(e) => {
                    e.preventDefault();
                    props.submitAnswer(answer, props.selectedQuestion.questionID, privacy);
                }}>Submit</button>
                <button className="btn btn-secondary" onClick={(e) => {
                    e.preventDefault();
                    props.setSelectedQuestion(null);
                }}>Back</button>
            </>
        )
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
                            props.setShowManage(false);
                        }}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionAdminModal;