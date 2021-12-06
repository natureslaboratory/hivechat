import React from 'react';
import { QuestionTableProps } from '../../../services/types';

const QuestionTable: React.FC<QuestionTableProps> = ({ questions, setAnswer }) => (
    <table className="mb-0 table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Question</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {questions && questions.map((r, i) => {
                return (
                    <tr key={i}>
                        <td>{r.memberName}</td>
                        <td>{r.questionText}</td>
                        <td className="btn-container" style={{ margin: 0 }}>
                            <button className="btn btn-outline-primary" onClick={() => {
                                if (r.answers.length > 0) {
                                    // select the first answer, implement multiple answers later
                                    setAnswer(r.answers[0]);
                                } else {
                                    // create new answer
                                    setAnswer({
                                        questionID: r.questionID,
                                        answerText: "",
                                        answerPrivacy: "Private"
                                    })
                                }
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

export default QuestionTable;

