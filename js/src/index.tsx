import DeleteForm from "./classes/DeleteForm";
import Organisation from "./classes/Organisation";
import OrganisationMember from "./classes/OrganisationMember";
import Utils from "./classes/Utils";
import "./pages/explore.organisations";
import "./pages/explore.organisations.manage.hives";
import "./pages/admin.notifications";
import "./pages/explore.organsations.manage.members.add";
import "./pages/explore.organisations.manage.details";
import "./pages/viewHive";
import "./pages/manageHive";
import "./pages/test";




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

let preventDefaulters = Array.from(document.getElementsByClassName("prevent-default") as HTMLCollectionOf<HTMLInputElement>);
preventDefaulters.forEach(b => {
    b.addEventListener("click", (e) => {
        e.preventDefault();
    })
})




