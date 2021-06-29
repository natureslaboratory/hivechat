import { QuestionBlock, QuestionResponse } from "../components/NewCell/Blocks/Question"
import { Blocks, IBlock } from "../components/NewCell/Cell"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestionAdminProps } from "../components/NewCell/Admin/QuestionAdminModal";


export interface QuestionModalProps {
    responses: QuestionResponse[]
}

type BlockID = Pick<IBlock<Blocks>, "blockID">


export const questionInitialState: BlockID = {
    blockID: null
};

export const questionSlice = createSlice({
    name: "question",
    initialState: {
        blockID: null
    } as BlockID,
    reducers: {
        setBlockID: (state, action: PayloadAction<number>) => ({ blockID: action.payload }),
        unsetBlockID: (state) => ({ blockID: null })
    }
})

export const { setBlockID, unsetBlockID } = questionSlice.actions;

export default questionSlice.reducer;