import { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import useMessage from "../../hooks/useMessage/useMessage";
import { useAddOrganisationSocialMutation } from "../../services/newApi";
import { DataChild, NewSocialType } from "../../services/types";
import Button from "../shared/Button/Button";
import { CardHeader, CardBody } from "../shared/Card/Card";
import { FormButtonsWrapper } from "../shared/Form/Form";
import useAddSocial from "./hooks/useAddSocial";
import SocialForm from "./SocialForm";

const AddSocial: React.FC<({ orgID: number } & DataChild)> = ({ orgID, isParentFetching, redirect }) => {
    const history = useHistory();
    const {
        newSocial,
        handleChange,
        handleSubmit,
        message,
        isCreating,
        isSuccess
    } = useAddSocial(orgID)

    useEffect(() => {
        if (isSuccess && !isParentFetching) {
            history.push(redirect)
        }
    }, [isParentFetching])

    if (!newSocial) {
        return <p>Loading...</p>
    }

    if (isSuccess && isParentFetching == undefined) {
        return <Redirect to={redirect} />
    }

    return (
        <>
            <CardHeader title="New Social" />
            <CardBody>
                <SocialForm social={newSocial} handleChange={handleChange}>
                    <FormButtonsWrapper>
                        <Button type="primary" label={isCreating || isParentFetching ? "Creating..." : "Create"} onClick={handleSubmit} disabled={isCreating || isParentFetching} />
                        <Button type="secondary" label="Back" onClick={() => history.push("../../")} disabled={isCreating || isParentFetching} />
                    </FormButtonsWrapper>
                </SocialForm>
            </CardBody>
        </>
    )
}

export default AddSocial;