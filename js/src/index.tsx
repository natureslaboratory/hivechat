import DeleteForm from "./classes/DeleteForm";
import Organisation from "./classes/Organisation";
import OrganisationMember from "./classes/OrganisationMember";
import Utils from "./classes/Utils";
import React = require('react');
import ReactDOM = require('react-dom');
import Hives from './components/Hives';




let organisationForms = Array.from(document.getElementsByClassName("org-form") as HTMLCollectionOf<HTMLElement>);

organisationForms.forEach(form => {
    try {
        new Organisation(form);
    } catch (error) {
        console.error(error)
    }
})

let addOrgMemberForm = Utils.getPerchElement(document.body, "add_organisation_member", "form");
if (addOrgMemberForm) {
    new OrganisationMember(addOrgMemberForm);
}

let deleteForms = Array.from(document.getElementsByClassName("delete-form") as HTMLCollectionOf<HTMLElement>);
deleteForms.forEach(form => {
    new DeleteForm(form);
})

class App extends React.Component {
    render() {
        return (
            <Hives />
        )
    }
}

const hives = document.getElementById("hives");
if (hives) {
    ReactDOM.render(<Hives />, hives);
}



