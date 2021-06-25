import { QuestionBlock, QuestionResponse } from "../components/NewCell/Blocks/Question"
import { IBlock } from "../components/NewCell/Cell"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestionAdminProps } from "../components/NewCell/Admin/QuestionAdminModal";


export interface QuestionModalProps {
    responses: QuestionResponse[]
}


export const questionInitialState: (QuestionModalProps & IBlock<QuestionBlock>) = {
    responses: [],
    blockData: {
        title: "",
        label: ""
    },
    blockType: "Question",
    blockOrder: -1,
    blockID: -1
};

export const questionSlice = createSlice({
    name: "question",
    initialState: questionInitialState,
    reducers: {
        set: (state, action: PayloadAction<(QuestionModalProps & IBlock<QuestionBlock>)>) => {
            console.log(action)
            state = {...state, ...action.payload}
        },
        unset: (state) => {
            state = questionInitialState;
        }
    }
})

export const { set, unset } = questionSlice.actions;

export default questionSlice.reducer;