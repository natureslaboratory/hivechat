import React, { useState } from 'react';
import { SocialProps } from './Social';

export interface AddSocialFuncs {
    backToSocials() : void
    addSocial(social : NewSocialProps) : void
}

export interface NewSocialProps {
    socialType : string,
    socialLink : string
}

const AddSocial : React.FunctionComponent<AddSocialFuncs> = (props) => {
    const [newSocial, setNewSocial] = useState<NewSocialProps>({
        socialLink: "",
        socialType: ""
    })

    let buttonsNormal = (
        <React.Fragment>
            <button className="btn btn-primary" onClick={(e) => {
                e.preventDefault();
                props.addSocial(newSocial);
                props.backToSocials();
            }}>Add</button>
            <button className="btn btn-secondary" onClick={(e) => {
                e.preventDefault();
                props.backToSocials()
            }}
            >Cancel</button>
        </React.Fragment>
    )

    let formBody = (
        <React.Fragment>
            <div className="form-group">
                <label>Type</label>
                <select id="socialType" className="form-control" value={newSocial.socialType} onChange={(e) => {
                    setNewSocial({...newSocial, socialType: e.target.value})
                }}>
                    <option value=""></option>
                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter</option>
                    <option value="LinkedIn">LinkedIn</option>
                </select>
            </div>
            <div className="form-group">
                <label>Link</label>
                <input type="text" className="form-control" value={newSocial.socialLink} onChange={(e) => {
                    setNewSocial({...newSocial, socialLink: e.target.value})
                }} />
            </div>
        </React.Fragment>
    )

    return (
        <div className="card mb-3">
            <div className="card-header" style={{display: "flex", justifyContent: "space-between"}}>
                <h5 className="card-title m-b-0">Add Social</h5>
                <button className="btn btn-outline-primary" onClick={props.backToSocials}>Back To Socials</button>
            </div>
            <div className="card-body">
                <form className="form">
                    {formBody}
                    <div 
                    className="btn-container" 
                    style={{
                        display: "flex", 
                        gap: "0.5rem", 
                        justifyContent: "flex-end",
                        marginTop: "1.5rem"
                        }}
                    >
                        {buttonsNormal}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddSocial;