import DeleteForm from "./classes/DeleteForm";
import Organisation from "./classes/Organisation";
import OrganisationMember from "./classes/OrganisationMember";
import Utils from "./classes/Utils";
import { inIframe } from "./helpers";
// import "./pages/explore.organisations";
// import "./pages/explore.organisations.manage.hives";
// import "./pages/admin.notifications";
// import "./pages/explore.organsations.manage.members.add";
// import "./pages/explore.organisations.manage.details";
// import "./pages/viewHive";
// import "./pages/manageHive";
// import "./pages/test";
// import "./pages/organisationMemberRequests";

import "./App";




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

if (inIframe()) {
    let adminHeader = document.getElementsByClassName("app-header")[0] as HTMLElement;
    adminHeader.style.display = "none";

    let adminSidebar = document.getElementsByClassName("app-sidebar")[0] as HTMLElement;
    adminSidebar.style.display = "none";

    let appMainOuter = document.getElementsByClassName("app-main__outer")[0] as HTMLElement;
    appMainOuter.style.paddingLeft = "0px";

    let appMain = document.getElementsByClassName("app-main")[0] as HTMLElement;
    appMain.style.paddingTop = "0px";

    let appPageTitle = document.getElementsByClassName("app-page-title")[0] as HTMLElement;
    let appPageTitleButtons = Array.from(appPageTitle.getElementsByTagName("button") as HTMLCollectionOf<HTMLButtonElement>);
    appPageTitleButtons.forEach(b => {
        b.style.display = "none";
    })

    let iframeHideElements = Array.from(document.getElementsByClassName("iframe-hide") as HTMLCollectionOf<HTMLElement>);
    iframeHideElements.forEach(e => {
        e.style.display = "none";
    })
    
}




