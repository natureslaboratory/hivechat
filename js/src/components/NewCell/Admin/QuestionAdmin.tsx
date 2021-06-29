import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { QuestionBlock, QuestionResponse } from '../Blocks/Question';
import { IBlock } from '../Cell';
import QuestionAdminModal, { QuestionAdminProps } from './QuestionAdminModal';
import { useSelector, useDispatch } from 'react-redux'
import { QuestionModalProps, setBlockID, unsetBlockID } from '../../../slices/questionSlice'
import { AppDispatch, RootState } from '../../../pages/manageHive';
import { useGetQuestionsQuery } from '../../../services/queryApi';

interface QuestionAdminWrapperProps {
    blockID: number
    responses: QuestionResponse[]
    getResponses(): void;
}


const QuestionAdmin: React.FC<IBlock<QuestionBlock> & QuestionAdminWrapperProps> = (props) => {
    const [showManage, setShowManage] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<QuestionResponse>(null);

    const dispatch = useDispatch<AppDispatch>();
    const question = useSelector((state: RootState) => state.question);

    const { data: responses, error, isLoading } = useGetQuestionsQuery(props.blockID);

    return (
        <div>
            <h5 className="card-title">{props.blockData.title}</h5>
            <p>Responses: {responses ? responses.length : <span>loading...</span>}</p>
            <div className="btn-container">
                <button className="btn btn-primary" onClick={(e) => {
                    e.preventDefault();
                    dispatch(setBlockID(props.blockID));
                }}>Manage</button>
            </div>
        </div>
    )
}

export default QuestionAdmin;
