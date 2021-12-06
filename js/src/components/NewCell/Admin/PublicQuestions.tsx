import React from 'react';
import { PublicQuestionProps } from "../../../services/types";
import CardTitle from '../../CardTitle';


const PublicQuestions: React.FC<PublicQuestionProps> = ({ questions: publicQuestions}) => {
    if (!publicQuestions || publicQuestions.length == 0) {
        return null
    }
    return (
        <>
            <CardTitle titleStyle={{marginTop: "1rem"}} title="Featured Questions" />
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
            }}>
                {publicQuestions.map(q => {
                    return (
                        <div key={q.questionID}>
                            <h6 style={{}}>{q.questionText}</h6>
                            <p>{q.answers && q.answers[0]?.answerText}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default PublicQuestions;