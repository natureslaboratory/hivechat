import Utils from "./Utils";

export default class DeleteForm
{
    node : HTMLElement;

    removeFirst : HTMLElement;
    removeButtonFirst : HTMLElement;

    removeSecond : HTMLElement;
    removeButtonSecond : HTMLElement;
    declineButton : HTMLElement;
    
    submitButton : HTMLInputElement;

    constructor(node : HTMLElement) {
        this.node = node;

        this.removeFirst = document.getElementById("remove-first");
        this.removeSecond = document.getElementById("remove-second");

        this.removeButtonFirst = document.getElementById("delete");
        this.removeButtonSecond = document.getElementById("yes-delete");
        this.declineButton = document.getElementById("no-delete");

        this.submitButton = Utils.getPerchElement(this.node, "submit-button", "btn") as HTMLInputElement;

        this.addEventListeners();
    }

    addEventListeners() {
        this.removeButtonFirst.addEventListener("click", (e) => {
            e.preventDefault();
            this.hide(this.removeFirst);
            this.show(this.removeSecond);
        })

        this.removeButtonSecond.addEventListener("click", (e) => {
            e.preventDefault();
            this.submitButton.click();
        })

        this.declineButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.hide(this.removeSecond);
            this.show(this.removeFirst);
        })
    }

    hide(element : HTMLElement) {
        element.classList.add("hide");
    }

    show(element : HTMLElement) {
        element.classList.remove("hide");
    }
}