import React from 'react';
import { AnswerListProps } from '../../../services/types';

const AnswerList: React.FC<AnswerListProps> = ({ selectedQuestion }) => {
    return (
        <>
            <div className="c-answers">
                {/* {selectedQuestion.answers ? selectedQuestion.answers.map((a, i) => {
                    return (
                        <div className="c-answer" key={a.answerID}>
                            <p>{a.answerText}</p>
                            <div className="c-answer__details">
                                <p>{a.answererName}</p>
                            </div>
                        </div>
                    )
                }) : <em>No answers</em>} */}
                {selectedQuestion.answers.length > 0 ?
                    <div className="c-answer">
                        <p>{selectedQuestion.answers[0].answerText}</p>
                        <div className="c-answer__details">
                            <p>{selectedQuestion.answers[0].answererName}</p>
                        </div>
                    </div>
                    :
                    <em>No answer</em>
                }
            </div>
        </>
    )
}

export default AnswerList;