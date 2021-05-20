import React, { useState } from 'react';
import { SocialProps } from './Social';

export interface EditSocialProps {
    editSocial : SocialProps
}

export interface EditSocialFuncs {
    setEditSocial(social : SocialProps) : void
    backToSocials() : void
    saveSocial(social : SocialProps) : void
    deleteSocial(social : SocialProps) : void
}

const EditSocial : React.FunctionComponent<EditSocialFuncs & EditSocialProps> = (props) => {
    const [showDelete, setShowDelete] = useState(false);

    let buttonsNormal = (
        <React.Fragment>
            <button className="btn btn-primary" onClick={(e) => {
                e.preventDefault();
                props.saveSocial(props.editSocial);
                props.backToSocials();
            }}>Save</button>
            <button className="btn btn-secondary" onClick={(e) => {
                e.preventDefault();
                props.backToSocials()
            }}
            >Cancel</button>
            <button className="btn btn-danger" onClick={(e) => {
                e.preventDefault();
                setShowDelete(true);
            }}>Delete</button>
        </React.Fragment>
    )

    let buttonsDelete = (
        <React.Fragment>
            <button className="btn btn-danger" onClick={(e) => {
                e.preventDefault();
                props.deleteSocial(props.editSocial);
                props.backToSocials();
            }}>Delete</button>
            <button className="btn btn-secondary" onClick={(e) => {
                e.preventDefault();
                setShowDelete(false);
            }}>Cancel</button>
        </React.Fragment>
    )

    let formBody = (
        <React.Fragment>
            <div className="form-group">
                <label>Type</label>
                <select id="socialType" className="form-control" value={props.editSocial.socialType} onChange={(e) => {
                    props.setEditSocial({...props.editSocial, socialType: e.target.value})
                }}>
                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter</option>
                    <option value="LinkedIn">LinkedIn</option>
                </select>
            </div>
            <div className="form-group">
                <label>Link</label>
                <input type="text" className="form-control" value={props.editSocial.socialLink} onChange={(e) => {
                    props.setEditSocial({...props.editSocial, socialLink: e.target.value})
                }} />
            </div>
        </React.Fragment>
    )

    let deleteBody = <p>Are you sure?</p>;

    return (
        <div className="card mb-3">
            <div className="card-header" style={{display: "flex", justifyContent: "space-between"}}>
                <h5 className="card-title m-b-0">Edit Social</h5>
                <button className="btn btn-outline-primary" onClick={props.backToSocials}>Back To Socials</button>
            </div>
            <div className="card-body">
                <form className="form">
                    {showDelete ? deleteBody : formBody}
                    <div 
                    className="btn-container" 
                    style={{
                        display: "flex", 
                        gap: "0.5rem", 
                        justifyContent: "flex-end",
                        marginTop: showDelete ? "" : "1.5rem"
                        }}
                    >
                        {showDelete ? buttonsDelete : buttonsNormal}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditSocial;