import React, { useState, useEffect } from 'react';
import Member from './Member';
import axios from 'axios';

interface MembersProps {
    emails : Array<string>
    removeEmail(index : number) : void
    addMembers(e, sendEmails: boolean) : void
}

const Members : React.FunctionComponent<MembersProps> = (props) => {
    const [page, setPage] = useState(0);
    const [emailsSliced, setEmailsSliced] = useState<Array<string>>([])
    const [sendEmails, setSendEmails] = useState(false);
    const limit = 5;

    useEffect(() => {
        sliceEmails()
    }, [page, props.emails])

    function sliceEmails() {
        let minIndex = page*limit;
        let maxIndex = minIndex + limit;
        let newEmails = props.emails.slice(minIndex, maxIndex);
        setEmailsSliced(newEmails);
    }

    const emailsRendered = emailsSliced.map((d, i) => <Member email={d} index={i} key={i} removeEmail={props.removeEmail} />)

    let pagination = (
        <div style={{
            display: "flex", 
            gap: "0.5rem", 
            alignItems: "center", 
            justifyContent: "flex-end",
            marginBottom: "1.5rem",
            marginTop: "1rem"
        }}>
            <button className="btn btn-outline-alternate" onClick = {(e) => {
                e.preventDefault();
                if (page > 0) {
                    setPage(page-1)
                }
            }}>Prev</button>
            {page + 1}
            <button className="btn btn-outline-alternate" onClick = {(e) => {
                e.preventDefault();
                let isNextPage = props.emails.length - (limit * (page+1)) > 0;
                if (isNextPage) {
                    setPage(page+1)
                }
            }}>Next</button>
        </div>
    )

    return (
        <form>
            <div>
                <div style={{display: "flex", flexDirection: "column", gap: "0.5rem"}}> 
                    {emailsRendered}
                </div>
            </div>
            {props.emails.length > limit ? pagination : null}
            <div style={{
                justifyContent: "flex-start",
                marginBottom: "0.2rem"
            }} className="form-group c-form-check">
                <label className="c-form-check__label">
                    Send invite emails?
                </label>
                <input type="checkbox" id="send_email" className="c-form-check__input" onChange={() => setSendEmails(!sendEmails)} checked={sendEmails} />
            </div>
            <div className="form-group" style={{display: "flex", justifyContent: "flex-end"}}>
                <button className="btn btn-primary" type="submit" onClick={(e) => props.addMembers(e, sendEmails)}>Add Members</button>
            </div>
        </form>
    )
}

export default Members;