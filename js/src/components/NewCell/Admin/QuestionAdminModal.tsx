import React, { useEffect, useState } from 'react';
import { QuestionResponse } from '../Blocks/Question';
import { useSelector, useDispatch } from 'react-redux'
import { setBlockID, unsetBlockID } from '../../../slices/questionSlice'
import { AppDispatch, RootState } from '../../../pages/AppWrapper';
import axios from 'axios';
import { Answer, AnswerFormProps, AnswerListProps, PostAnswer, Question } from '../../../services/types';
import { useGetQuestionsQuery, useSubmitAnswerMutation, useUpdateAnswerMutation, useUpdateQuestionMutation } from '../../../services/queryApi';
import AnswerForm from './AnswerForm';
import AnswerList from './AnswerList';
import QuestionTable from './QuestionTable';

export interface QuestionAdminProps {
    blockID: number
    selectedQuestion?: QuestionResponse
}

interface QuestionAdminFuncs {
}

const QuestionAdminModal: React.FC<QuestionAdminProps & QuestionAdminFuncs> = (props) => {
    const [answer, setAnswer] = useState<PostAnswer>(null);
    const [addAnswer, showAddAnswer] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const [submitAnswer, { isLoading: isSubmitting }] = useSubmitAnswerMutation();
    const [updateAnswer, { isLoading: isUpdating }] = useUpdateAnswerMutation();
    const [updateQuestion, { isLoading: isQuestionUpdating }] = useUpdateQuestionMutation();
    const { data: responses, error, isLoading: responsesLoading, isFetching } = useGetQuestionsQuery(props.blockID);



    let content = <QuestionTable questions={responses} setAnswer={setAnswer} />

    let back = null;

    useEffect(() => {
        console.log(isFetching);
        if (!isFetching) {
            showAddAnswer(false);
        }
    }, [isFetching])

    if (answer) {
        const currentQuestion = responses.filter((d, i) => d.questionID == answer.questionID)[0];
        if (currentQuestion) {

            let component = null;

            if (addAnswer) {
                let submitButton = (
                    <button className="btn btn-secondary" onClick={(e) => {
                        e.preventDefault();
                        if (answer.answerID) {
                            updateAnswer(answer);
                        } else {
                            submitAnswer(answer);
                        }
                    }}>Submit</button>
                )

                if (isSubmitting || isUpdating || isFetching) {
                    submitButton = (
                        <button className="btn btn-secondary disabled" disabled>Submitting...</button>
                    )
                }

                back = (
                    <>
                        {submitButton}
                        <button className="btn btn-secondary" onClick={(e) => {
                            e.preventDefault();
                            showAddAnswer(false);
                        }}>Back</button>
                    </>
                )

                component = <AnswerForm answer={answer} setAnswer={setAnswer} />
            } else {
                back = (
                    <>
                        {
                            answer.answerText ?
                                <button className="btn btn-secondary" onClick={(e) => {
                                    e.preventDefault();
                                    showAddAnswer(true);
                                }}>Edit Answer</button>
                                :
                                <button className="btn btn-secondary" onClick={(e) => {
                                    e.preventDefault();
                                    showAddAnswer(true);
                                }}>Add Answer</button>
                        }
                        <button className="btn btn-secondary" onClick={(e) => {
                            e.preventDefault();
                            setAnswer(null);
                        }}>Back</button>
                    </>
                )
                component = <AnswerList selectedQuestion={currentQuestion} />;
            }

            content = (
                <>
                    <h5>{currentQuestion.questionText}</h5>
                    <p>from {currentQuestion.memberName}</p>
                    {component}
                    <div className="form-group c-form-check">
                        <label>Public?</label>
                        <input disabled={isQuestionUpdating} type="checkbox" className="c-form-check__input" onChange={() => {
                            /* Need to POST to update-question */
                            updateQuestion({
                                ...currentQuestion,
                                questionPrivacy: currentQuestion.questionPrivacy == "Public" ? "Private" : "Public"
                            });
                        }} checked={currentQuestion.questionPrivacy == "Public" ? true : false} />
                    </div>
                </>
            )
        } else {
            setAnswer(null);
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

export default QuestionAdminModal;