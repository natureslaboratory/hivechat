import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useMessage from "../../../hooks/useMessage/useMessage";
import { useUpdateOrganisationSocialMutation, useDeleteOrganisationSocialMutation } from "../../../services/newApi";
import { SocialType, ManageOrganisationParams } from "../../../services/types";

function useEditSocial(socials: SocialType[]) {
    const [newSocial, setNewSocial] = useState<SocialType>();

    let { slug, id } = useParams<(ManageOrganisationParams & { id: string })>();

    const [updateSocial, { isLoading: isUpdating, isSuccess: isUpdated, isError }] = useUpdateOrganisationSocialMutation();
    const [deleteSocial, { isLoading: isDeleting, isSuccess: isDeleted }] = useDeleteOrganisationSocialMutation();

    const { message, updateMessage } = useMessage();

    useEffect(() => {
        if (socials && id && !newSocial) {
            setNewSocial(socials.find(s => s.socialID == parseInt(id)));
        }
    }, [socials])

    useEffect(() => {
        if (isUpdating) {
            updateMessage({
                text: "Updating...",
                style: {}
            }, true)
        } else if (isUpdated) {
            updateMessage({
                text: "Updated!",
                style: {
                    color: "green"
                }
            })
        } else if (isError) {
            updateMessage({
                text: "Error",
                style: {
                    color: "red"
                }
            })
        }
    }, [isUpdating, isUpdated, isError])

    function handleChange(e) {
        setNewSocial({
            ...newSocial,
            [e.target.id]: e.target.value
        })
    }

    function handleSubmit(e: React.MouseEvent) {
        e.preventDefault();
        updateSocial(newSocial);
        // history.push("../..");
    }

    function handleDelete(e: React.MouseEvent) {
        e.preventDefault();
        deleteSocial(newSocial);
    }

    return {
        newSocial,
        handleChange,
        handleSubmit,
        handleDelete,
        message,
        isDeleting,
        isDeleted,
        isUpdating,
        isUpdated
    }
}

export default useEditSocial;
