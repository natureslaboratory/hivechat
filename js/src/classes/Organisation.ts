export default class Organisation
{
    node : HTMLElement;
    orgName : HTMLInputElement;
    orgNameInfo : HTMLElement;
    orgSlug : HTMLInputElement;
    orgSlugDisplay : HTMLElement;
    submitButton : HTMLInputElement;
    currentName : string;
    timeout;

    constructor(node : HTMLElement) {
        this.node = node;
        
        this.orgName = this.getPerchElement("organisationName", "form-control") as HTMLInputElement;
        if (!this.orgName) {
            throw new Error("No Valid orgName");
        }

        if (this.orgName.value) {
            this.currentName = this.orgName.value.trim();
        }

        this.orgNameInfo = this.node.getElementsByClassName("org-name-info")[0] as HTMLElement;
        if (!this.orgNameInfo) {
            throw new Error("No Valid orgNameInfo");
        }

        this.orgSlug = this.getPerchElement("organisationSlug", "form-control") as HTMLInputElement;
        if (!this.orgSlug) {
            throw new Error("No Valid orgSlug");
        }

        this.orgSlugDisplay = this.node.getElementsByClassName("slug-container")[0] as HTMLElement;
        if (!this.orgSlugDisplay) {
            throw new Error("No Valid orgSlugDisplay");
        }

        this.submitButton = this.node.getElementsByClassName("organisationSubmit")[0] as HTMLInputElement;
        if (!this.submitButton) {
            throw new Error("No Valid submitButton");
        }

        this.addEventListeners();

    }

    private getPerchElement(id : string, className : string)
    {
        let array = this.node.getElementsByClassName(className) as HTMLCollectionOf<HTMLElement>;
        return Array.from(array).filter(el => el.id.includes(id))[0];
    }

    private slugify(title : string)
    {
        let newTitle = title.trim().toLowerCase();
        let newDashedTitle = newTitle.split(" ").map((word) => {
            let newWord = "";
            for (let i = 0; i < word.length; i++) {
                const letter = word[i];
                let pattern = /[A-Za-z0-9]/;
                if (!pattern.test(letter)) {
                    continue
                } else {
                    newWord += letter;
                }
            }
            return newWord;
        }).join("-");
        return newDashedTitle;
    }

    private checkName(slug : string) {
        clearTimeout(this.timeout);
        if (!slug) {
            this.submitButton.disabled = true;
            this.orgNameInfo.innerHTML = null;
        } else {
            this.timeout = setTimeout(async () => {
                await fetch(`/page-api/isorganisation?s=${slug}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data) {
                            if (!(data.organisationName == this.currentName)) {
                                this.setUnavailable();
                            } else {
                                this.setNeutral();
                            }
                        } else {
                            this.setAvailable();
                        }
                    })
            }, 300)
        }
    }

    private setNeutral()
    {
        this.orgName.classList.remove("unavailable");
        this.orgName.classList.remove("available");
        this.orgNameInfo.innerHTML = "";
        this.enableButton();
    }

    private setAvailable()
    {
        this.orgName.classList.remove("unavailable");
        this.orgName.classList.add("available");
        this.orgNameInfo.innerHTML = "Available"
        this.enableButton();
    }

    private setUnavailable()
    {
        this.orgName.classList.add("unavailable");
        this.orgName.classList.remove("available");
        this.orgNameInfo.innerHTML = "Unavailable"
        this.disableButton();
    }

    private disableButton()
    {
        this.submitButton.disabled = true;
    }

    private enableButton()
    {
        this.submitButton.disabled = false;
    }

    private updateValues()
    {
        let slug = this.slugify(this.orgName.value);
        this.orgSlugDisplay.innerHTML = slug;
        this.orgSlug.value = slug;
        this.checkName(slug)
    }

    private addEventListeners()
    {
        this.orgName.addEventListener("keyup", () => {
            this.updateValues()
        })
        
        this.orgName.addEventListener("change", () => {
            this.updateValues()
        })
    }
}