import React from 'react';
import { AnswerFormProps } from "../../../services/types";


const AnswerForm: React.FC<AnswerFormProps> = ({ answer, setAnswer }) => {
    return (
        <form>
            <div className="form-group">
                <label>Answer</label>
                <textarea
                    style={{ minHeight: "120px" }}
                    className="form-control"
                    onChange={(e) => setAnswer({ ...answer, answerText: e.target.value })}
                    value={answer.answerText}
                />
            </div>
            <div className="form-group c-form-check">
                <label className="c-form-check__label">
                    Would you like this answer to be listed on the question block?
                </label>
                <input type="checkbox" className="c-form-check__input" id="contactList" value="1" onChange={() => {
                    if (answer.answerPrivacy == "Private") {
                        setAnswer({
                            ...answer,
                            answerPrivacy: "Public"
                        });
                    } else {
                        setAnswer({
                            ...answer,
                            answerPrivacy: "Private"
                        });
                    }
                }} checked={answer.answerPrivacy == "Private" ? false : true} />
            </div>
        </form>
    )
}

export default AnswerForm;
