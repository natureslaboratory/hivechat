import React, { useEffect, useState } from 'react';
import RichTextEditor, { EditorValue } from 'react-rte';
import { FormGroup, FormInputProps } from './Form';

type FormTextEditorProps = Pick<FormInputProps, "id" | "label" | "value"> & {
    updateValue: {(value: string)}
}

const FormTextEditor: React.FC<FormTextEditorProps> = (props) => {
    const [editorValue, setEditorValue] = useState(RichTextEditor.createEmptyValue());
    const [prevValue, setPrevValue] = useState("");

    useEffect(() => {
        setEditorValue(RichTextEditor.createValueFromString(props.value, 'html'))
    }, [])

    useEffect(() => {
        let newValue = editorValue.toString("html");
        if (newValue != props.value) {
            props.updateValue(newValue);
        }
    }, [editorValue])

    return (
        <>
            <label>{props.label}</label>
            <RichTextEditor
                value={editorValue}
                onChange={(e) => {
                    setEditorValue(e);
                }}
            />
        </>
    )
}

export default FormTextEditor;