import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Member from './Member';
import AddMembers from './AddMembers';

interface AddMembersWrapperProps
 {

}

const AddMembersWrapper : React.FunctionComponent<AddMembersWrapperProps> = (props) => {
    const [file, addFile] = useState<File>();
    const [emailColName, updateEmailColName] = useState("");
    const [uploadElement, setUpload] = useState<HTMLInputElement>();
    const [emailAddresses, setEmailAddresses] = useState<Array<string>>([]);

    

    function processEmailCSV(e) {
        if (!emailColName) {
            return;
        }
        e.preventDefault();

        let form = new FormData();
        if (!file) {
            return
        }

        form.append("data", file, file.name);
        form.append("colname", emailColName);

        axios.post("/page-api/process-email-csv", form)
            .then(res => {
                setEmailAddresses(res.data)
            });
    }

    function handleFileUpload(e) {
        if (checkMimeType(e.target.files[0])) {
            addFile(e.target.files[0])
        }
        if (e.target.files[0]) {
            e.target.value = null;
        }
    }

    function checkMimeType(file : File) {
        if (file.type !== "application/vnd.ms-excel") {
            return false;
        }
        return true;
    }

    function handleAddFile(e) {
        e.preventDefault();
        if (uploadElement) {
            uploadElement.click();
        }
    }

    function removeEmail(index : number) {
        let emailsStart = emailAddresses.slice(0, index);
        let emailsEnd = emailAddresses.slice(index+1, emailAddresses.length);
        setEmailAddresses([...emailsStart, ...emailsEnd]);
    }

    function addMembers(e, sendEmails = false) {
        e.preventDefault();

        let data = new FormData();
        data.append("emails", JSON.stringify(emailAddresses));
        let urlSplit = window.location.href.split("/");
        let urlSlug = "";
        for (let i = 0; i < urlSplit.length; i++) {
            const element = urlSplit[i];
            if (element == "organisations") {
                urlSlug = urlSplit[i+1];
            }
        }
        data.append("organisationSlug", urlSlug);
        if (sendEmails) {
            data.append("sendEmails", "true");
        }

        if (!emailAddresses) {
            return;
        }

        axios.post("/page-api/add-members-bulk", data)
            .then(res => {
                location.reload();
            });
    }


    let fileText = <div />;
    if (file) {
        fileText = <p style={{margin: 0}}>{file.name}</p>
    }

    let selectCSV = <button className="btn btn-primary" onClick={(e) => handleAddFile(e)}>Select CSV</button>
    let clearCSV = <button className="btn btn-outline-danger" type="submit" onClick={(e) => {
                        e.preventDefault();
                        addFile(null);
                    }}>Clear</button>
    let uploadDiv = <div style={{display: "flex", gap: "1rem"}}>
                        <button className="btn btn-primary" type="submit" onClick={(e) => processEmailCSV(e)}>Process</button>
                    </div>

    let processForm = (
                        <form>
                            <div className="form-group">
                                <label htmlFor="column-name">Email Column Name</label>
                                <input type="text" id="column-name" className="form-control" onChange={(e) => updateEmailColName(e.target.value)} value={emailColName} required></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="file-upload" className="hidden">Select CSV</label>
                                <input className="hidden" type="file" id="file-upload" ref={el => (setUpload(el))} onChange={handleFileUpload} ></input>
                                <div style={{display: "flex", gap: "1rem", alignItems: "center"}}>
                                    {file ? fileText : null}
                                    {file ? clearCSV : selectCSV}
                                </div>
                            </div>
                            {file ? uploadDiv : null}
                        </form>
    )

    let addMembersForm = <AddMembers emails={emailAddresses} addMembers={addMembers} removeEmail={removeEmail} />

    return (
        
    <div className="card mb-3">
        <div className="card-header">
            <h5 className="card-title m-b-0">Invite Members By CSV</h5>
        </div>
        <div className="card-body">
            {emailAddresses.length > 0 ? addMembersForm : processForm}
        </div>
    </div>
    )
}

export default AddMembersWrapper;