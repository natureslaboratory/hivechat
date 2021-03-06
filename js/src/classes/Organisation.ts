export default class Organisation
{
    node : HTMLElement;
    orgName : HTMLInputElement;
    orgNameInfo : HTMLElement;
    orgSlug : HTMLInputElement;
    orgSlugDisplay : HTMLElement;
    orgSlugDisplayLink : HTMLAnchorElement;
    submitButton : HTMLInputElement;
    currentName : string;
    timeout;

    constructor(node : HTMLElement) {
        this.node = node;
        
        this.orgName = this.getPerchElement("organisationName", "form-control") as HTMLInputElement;
        if (!this.orgName) {
            throw new Error("No Valid orgName");
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

        this.orgSlugDisplayLink = this.node.getElementsByClassName("slug-link")[0] as HTMLAnchorElement;
        
        
        this.submitButton = this.node.getElementsByClassName("organisationSubmit")[0] as HTMLInputElement;
        if (!this.submitButton) {
            throw new Error("No Valid submitButton");
        }

        if (this.orgName.value) {
            this.currentName = this.orgName.value.trim();
            this.updateValues();
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
                await fetch(`/page-api/is-organisation?s=${slug}`)
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
        if (this.orgSlugDisplay) {
            this.orgSlugDisplay.innerHTML = slug;
        }
        this.orgSlug.value = slug;
        if (this.orgSlugDisplayLink && !this.orgSlugDisplayLink.href) {
            let protocols = ["http://", "https://"];
            let protocol;
            let url = window.location.href;
            protocols.forEach(p => {
                if (url.includes(p)) {
                    protocol = p;
                }
            });
            let splitUrl = url.split(protocol);
            let urlWithoutProtocol = splitUrl[splitUrl.length-1];
            let domain = urlWithoutProtocol.split("/")[0];

            this.orgSlugDisplayLink.href = `${protocol}${domain}/explore/organisations/${slug}`;
        }
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