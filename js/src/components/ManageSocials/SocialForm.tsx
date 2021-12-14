import { NewSocialType } from "../../services/types"
import Form, { SelectOption, FormGroup, FormSelect, FormTextInput } from "../shared/Form/Form"


type SocialFormType = {
    social: NewSocialType
    handleChange: { (e: React.ChangeEvent) }
}

const SocialForm: React.FC<SocialFormType> = ({ social, handleChange, children }) => {

    const options: SelectOption[] = [
        {
            label: "Facebook",
            id: "Facebook"
        },
        {
            label: "Twitter",
            id: "Twitter"
        },
        {
            label: "LinkedIn",
            id: "LinkedIn"
        }
    ]

    return (
        <Form>
            <FormGroup>
                <FormSelect label="Type" options={options} id="socialType" onChange={handleChange} value={social.socialType} />
            </FormGroup>
            <FormGroup>
                <FormTextInput label="Link" type="text" value={social.socialLink} id="socialLink" onChange={handleChange} />
            </FormGroup>
            {children}
        </Form>
    )
}

export default SocialForm;