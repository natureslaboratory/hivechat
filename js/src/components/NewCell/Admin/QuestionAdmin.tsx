import React, { useState } from 'react';
import { QuestionBlock, QuestionResponse } from '../Blocks/Question';
import { IBlock } from '../Cell';

interface QuestionAdminProps {
    responses: QuestionResponse[]
}


const QuestionAdmin: React.FC<IBlock<QuestionBlock> & QuestionAdminProps> = (props) => {
    const [showManage, setShowManage] = useState(false);

    let manage = (
        <div className="c-question__manage-wrapper">
            <div className="card c-question__manage">
                <table className="mb-0 table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Question</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.responses && props.responses.map((r, i) => {
                            return (
                                <tr>
                                    <td>{r.memberName}</td>
                                    <td>{r.questionText}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table> 
                <button onClick={(e) => {
                    e.preventDefault();
                    setShowManage(false);
                }}>Back</button>
            </div>
        </div>
    )
    
    return (
        <div>
            <h5 className="card-title">{props.blockData.title}</h5>
            <p>Responses: {props.responses.length}</p>
            <button onClick={(e) => {
                e.preventDefault();
                setShowManage(true);
            }}>Manage</button>

            {showManage && manage}
            {/* <table className="mb-0 table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Question</th>
                    </tr>
                </thead>
                <tbody>
                    {props.responses && props.responses.map((r, i) => {
                        return (
                            <tr>
                                <td>{r.memberName}</td>
                                <td>{r.questionText}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table> */}
        </div>
    )
}

export default QuestionAdmin;