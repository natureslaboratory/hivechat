import React, { useState, useEffect } from 'react';
import Member from './Member';
import axios from 'axios';

interface MembersProps {
    emails : Array<string>
    removeEmail(index : number) : void
}

const Members : React.FunctionComponent<MembersProps> = (props) => {
    const [page, setPage] = useState(0);
    const [emailsSliced, setEmailsSliced] = useState<Array<string>>([])
    const limit = 5;

    function addMembers(e) {
        e.preventDefault();

        if (!props.emails) {
            return;
        }

        axios.post("/page-api/add-members-bulk", props.emails)
            .then(res => console.log(res.data));
    }

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
            <button>Prev</button>
            {page + 1}
            <button>Next</button>
        </div>
    )

    return (
        <form>
            <div className="form-group" style={{display: "flex", justifyContent: "space-between"}}>
                <button className="btn btn-primary" type="submit" onClick={(e) => addMembers(e)}>Add Members</button>
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