import React, { useState, useEffect } from 'react';
import { SocialProps } from './Social';

export interface AddSocialFuncs {
    backToSocials() : void
    addSocial(social : NewSocialProps) : void
}

export interface NewSocialProps {
    socialType : string,
    socialLink : string
}

interface NewSocialError {
    socialLinkError: string,
    socialTypeError: string
}

const AddSocial : React.FunctionComponent<AddSocialFuncs> = (props) => {
    const [newSocial, setNewSocial] = useState<NewSocialProps>({
        socialLink: "",
        socialType: ""
    })
    const [save, setSave] = useState(false);
    const [error, setError] = useState<NewSocialError>({
        socialLinkError: "",
        socialTypeError: ""
    })

    function handleKeyDown(e : KeyboardEvent) {
        if (e.key == "Enter") {
            setSave(true);
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [])

    useEffect(() => {
        if (save) {
            if (isValidForm()) {
                props.addSocial(newSocial);
                props.backToSocials();
            } else {
                setSave(false);
            }
        }
    }, [save]);

    function isValidForm() {
        let isError = false;
        let newError : NewSocialError = {
            socialTypeError: "",
            socialLinkError: ""
        }

        if (!newSocial.socialType) {
            isError = true;
            newError = {...newError, socialTypeError: "Please choose a type"}
        }
        if (!validURL(newSocial.socialLink)) {
            isError = true;
            newError = {...newError, socialLinkError: "Please enter a valid URL"}
        }

        if (isError) {
            setError(newError);
            return false;
        } else {
            return true;
        }
    }
    

    function validURL(str : string) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
      }

    let buttonsNormal = (
        <React.Fragment>
            <button className="btn btn-primary" onClick={(e) => {
                e.preventDefault();
                setSave(true);
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
                <select required id="socialType" className="form-control" value={newSocial.socialType} onChange={(e) => {
                    setError({...error, socialTypeError: ""})
                    setNewSocial({...newSocial, socialType: e.target.value})
                }}>
                    <option value=""></option>
                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter</option>
                    <option value="LinkedIn">LinkedIn</option>
                </select>
                <p>{error.socialTypeError}</p>
            </div>
            <div className="form-group">
                <label>Link</label>
                <input required type="text" className="form-control" value={newSocial.socialLink} onChange={(e) => {
                    setError({...error, socialLinkError: ""})
                    setNewSocial({...newSocial, socialLink: e.target.value})
                }} />
                <p>{error.socialLinkError}</p>
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