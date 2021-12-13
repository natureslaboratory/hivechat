import React from 'react';


const Form: React.FC = ({ children }) => <form>{children}</form>

export default Form;

export const FormGroup: React.FC = ({ children }) => <div className="form-group">{children}</div>

export type FormInputProps = {
    type: "text" | "textarea",
    placeholder?: string,
    value: string,
    id: string,
    onChange: {(e: React.ChangeEvent)},
    label: string,
    readOnly?: boolean
}

export const FormTextInput: React.FC<FormInputProps> = ({ type, placeholder, value, onChange, id, label, readOnly }) => {
    switch (type) {
        case "text":
            return (
                <>
                    <label htmlFor={id}>{label}</label>
                    <input readOnly={readOnly} id={id} name={id} className="form-control" value={value} onChange={onChange} placeholder={placeholder} type="text" required />
                </>
            )
        case "textarea":
            return (
                <>
                    <label>{label}</label>
                    <textarea readOnly={readOnly} id={id} name={id} className="form-control" cols={30} rows={4} placeholder={placeholder} value={value} onChange={onChange}></textarea>
                </>
            )
    }
}

type SelectOption = {
    label: string
    id: string
}

type FormSelectProps = Pick<FormInputProps, "value" |"id" | "label" | "onChange"> & {
    options: SelectOption[]
}

export const FormSelect: React.FC<FormSelectProps> = ({ value, id, label, options, onChange }) => {
    if (!options) {
        return null
    }
    return (
        <>
            <label>{label}</label>
            <select id={id} name={id} className="form-control" value={value} onChange={onChange} required>
                {options ? options.map((o) => <option key={o.id} value={o.id}>{o.label}</option>) : <option>No Options :(</option>}
            </select>
        </>
    )
}