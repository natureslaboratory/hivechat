import { useState, useEffect } from "react";
import { Link, Redirect, Route, Switch, useHistory, useParams, useRouteMatch } from "react-router-dom";
import useMessage from "../../hooks/useMessage/useMessage";
import { useUpdateOrganisationSocialMutation, useDeleteOrganisationSocialMutation } from "../../services/newApi";
import { SocialType, ManageOrganisationParams, DataChild } from "../../services/types";
import Button from "../shared/Button/Button";
import { CardHeader, CardBody } from "../shared/Card/Card";
import { FormButtonsWrapper, SelectOption } from "../shared/Form/Form";
import useEditSocial from "./hooks/useEditSocial";
import SocialForm from "./SocialForm";

const EditSocial: React.FC<{ socials: SocialType[] } & DataChild> = ({ socials, redirect, isParentFetching }) => {
    const history = useHistory();
    const { path, url } = useRouteMatch();
    const {
        newSocial,
        handleChange,
        handleSubmit,
        handleDelete,
        message,
        isDeleting,
        isDeleted,
        isUpdating,
        isUpdated
    } = useEditSocial(socials)

    useEffect(() => {
        if ((isDeleted || isUpdated) && !isParentFetching) {
            history.push(redirect)
        }
    }, [isParentFetching])

    if (!newSocial) {
        return <p>Loading...</p>
    }

    // if isFetching is not passed in redirect to base
    if ((isDeleted || isUpdated) && isParentFetching == undefined) {
        return <Redirect to={redirect} />
    }

    const disabled = isParentFetching || isUpdating || isDeleting;

    return (
        <>
            <CardHeader title="Edit Social" />
            <CardBody>
                <SocialForm social={newSocial} handleChange={handleChange}>
                    <FormButtonsWrapper>
                        <Switch>
                            <Route path={`${path}/delete`}>
                                <span>Are you sure?</span>
                                <Button type="danger" label={disabled ? "Deleting..." : "Delete"} onClick={handleDelete} disabled={disabled} />
                                <Link to="..">
                                    <Button type="secondary" label="Cancel" disabled={disabled} />
                                </Link>
                            </Route>
                            <Route path={path}>
                                <Button type="primary" label={disabled ? "Submitting..." : "Submit"} onClick={handleSubmit} disabled={disabled} />
                                <Link to={`${url}delete`}>
                                    <Button type="danger" label="Delete" disabled={disabled} />
                                </Link>
                                <Button type="secondary" label="Back" onClick={() => history.push("../../")} disabled={disabled} />
                            </Route>
                        </Switch>
                    </FormButtonsWrapper>
                </SocialForm>
            </CardBody>
        </>
    )
}

export default EditSocial;