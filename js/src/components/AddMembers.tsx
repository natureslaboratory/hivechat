import React, { useState, useEffect } from 'react';
import Member from './Member';
import axios from 'axios';

interface MembersProps {
    emails : Array<string>
    removeEmail(index : number) : void
    addMembers(e) : void
}

const Members : React.FunctionComponent<MembersProps> = (props) => {
    const [page, setPage] = useState(0);
    const [emailsSliced, setEmailsSliced] = useState<Array<string>>([])
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
        <div style={{display: "flex", gap: "0.5rem", alignItems: "center"}}>
            <button onClick = {(e) => {
                e.preventDefault();
                if (page > 0) {
                    setPage(page-1)
                }
            }}>Prev</button>
            {page + 1}
            <button onClick = {(e) => {
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
            <div className="form-group" style={{display: "flex", justifyContent: "space-between"}}>
                <button className="btn btn-primary" type="submit" onClick={props.addMembers}>Add Members</button>
                {props.emails.length > limit ? pagination : null}
            </div>
            <div>
                <div style={{display: "flex", flexDirection: "column", gap: "0.5rem"}}> 
                    {emailsRendered}
                </div>
            </div>
        </form>
    )
}

export default Members;