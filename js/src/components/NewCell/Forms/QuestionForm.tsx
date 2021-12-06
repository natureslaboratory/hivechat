import React, { useEffect, useState } from 'react';
import { Blocks, IBlock } from '../Cell';
import RichTextEditor from 'react-rte';
import { QuestionBlock } from '../Blocks/Question';

interface QuestionFormProps {
    block: QuestionBlock
}

interface QuestionFormFuncs {
    setBlock(block: Blocks): void
}

const QuestionForm: React.FC<QuestionFormProps & QuestionFormFuncs> = ({ block, setBlock }) => {
    if (block) {
        return (
            <form>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" type="text" value={block.title} onChange={(e) => setBlock({...block, title: e.target.value})} />
                </div>
                <div className="form-group">
                    <label>Label</label>
                    <input className="form-control" type="text" value={block.label} onChange={(e) => setBlock({...block, label: e.target.value})} />
                </div>
            </form>
        )
    }
    return null

}

export default QuestionForm;