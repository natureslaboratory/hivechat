import { useState, useEffect } from "react";
import useMessage from "../../../hooks/useMessage/useMessage";
import { useAddOrganisationSocialMutation } from "../../../services/newApi";
import { NewSocialType } from "../../../services/types";

function useAddSocial(orgID: number) {
    const defaultSocial: NewSocialType = {
        socialLink: "",
        socialType: "Facebook",
        organisationID: orgID
    }
    const [newSocial, setNewSocial] = useState<NewSocialType>();
    const [ addSocial, { isLoading: isCreating, isSuccess, isError } ] = useAddOrganisationSocialMutation();
    const { message, updateMessage } = useMessage();

    useEffect(() => {
        if (orgID && !newSocial) {
            setNewSocial(defaultSocial);
        }
    }, [orgID])

    function handleChange(e) {
        setNewSocial({
            ...newSocial,
            [e.target.id]: e.target.value
        })
    }

    function handleSubmit(e: React.MouseEvent) {
        e.preventDefault();
        addSocial(newSocial);
        // history.push("../..");
    }

    useEffect(() => {
        if (isCreating) {
            updateMessage({
                text: "Creating social...",
                style: {}
            }, true)
        } else if (isError) {
            updateMessage({
                text: "Error",
                style: {
                    color: "red"
                }
            })
        }
    }, [isCreating, isSuccess, isError])

    return {
        newSocial,
        handleChange,
        handleSubmit,
        message,
        isCreating,
        isSuccess
    }
}

export default useAddSocial;