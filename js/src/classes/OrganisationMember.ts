import Utils from './Utils';

export default class OrganisationMember
{
    node : HTMLElement;
    email : HTMLInputElement;
    memberID : HTMLInputElement;
    orgID : HTMLInputElement;
    button : HTMLInputElement;
    messageElement : HTMLElement;
    timeout;

    constructor(node : HTMLElement) {
        this.node = node;

        this.email = Utils.getPerchElement(this.node, "memberEmail", "form-control") as HTMLInputElement;
        this.memberID = Utils.getPerchElement(this.node, "memberID", "form-control") as HTMLInputElement;
        this.orgID = Utils.getPerchElement(this.node, "organisationID", "form-control") as HTMLInputElement;
        this.button = Utils.getPerchElement(this.node, "submit-button", "btn") as HTMLInputElement;
        this.messageElement = this.node.getElementsByClassName("message")[0] as HTMLElement;
        this.disableButton();
        this.addEventListeners();
    }

    private addEventListeners() {
        this.email.addEventListener("keyup", () => {
            this.clearMessage();
            if (this.email.value) {
                this.checkUserExists();
            } else  {
                clearTimeout(this.timeout)
            }
        })

        this.email.addEventListener("change", () => {
            this.clearMessage();
            if (this.email.value) {
                this.checkUserExists();
            } else  {
                clearTimeout(this.timeout)
            }
        })
    }

    private checkUserExists() {
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            fetch(`/page-api/ismember?email=${this.email.value.trim()}`)
                .then(res => res.json())
                .then(async (data) => {
                    if (data) {
                        this.memberID.value = data.memberID;
                        let isOrgMember = await this.checkUserNotInOrg();
                        if (!isOrgMember) {
                            this.enableButton();
                            this.clearMessage();
                        } else {
                            this.setMessage("User already in organisation.")
                            this.disableButton();
                        }
                    } else {
                        this.setMessage("User not registered.")
                        this.disableButton();
                    }
                })
        }, 300)
    }

    private async checkUserNotInOrg()
    {
        let isOrgMember = false;
        await fetch(`/page-api/isorganisationmember?orgID=${this.orgID.value.trim()}&memberID=${this.memberID.value.trim()}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        isOrgMember = true;
                    }
                })
        return isOrgMember;
    }

    private enableButton()
    {
        this.button.disabled = false;
    }

    private disableButton()
    {
        this.button.disabled = true;
    }

    private setMessage(message : string)
    {
        this.messageElement.innerHTML = message;
    }

    private clearMessage()
    {
        this.messageElement.innerHTML = "";
    }
}