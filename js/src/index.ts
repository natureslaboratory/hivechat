import Organisation from "./classes/Organisation";

// const getElementById = (id : string, className : string) => {
//     let array = document.getElementsByClassName(className) as HTMLCollectionOf<HTMLElement>;
//     return Array.from(array).filter(el => el.id.includes(id))[0];
// }

// const isValidWord = word => {
//     let valid = true;
//     for (let i = 0; i < word.length; i++) {
//         const letter = word[i];
//         let pattern = /[A-Za-z0-9]/;
//         if (!pattern.test(letter)) {
//             valid = false;
//         }
//     }
//     return valid;
// }

// const slugify = (title : string) => {
//     let newTitle = title.trim().toLowerCase();
//     let newDashedTitle = newTitle.split(" ").map((word) => {
//         let newWord = "";
//         for (let i = 0; i < word.length; i++) {
//             const letter = word[i];
//             let pattern = /[A-Za-z0-9]/;
//             if (!pattern.test(letter)) {
//                 continue
//             } else {
//                 newWord += letter;
//             }
//         }
//         return newWord;
//     }).join("-");
//     return newDashedTitle;
// }

// const formInput = getElementById("organisationSlug", "form-control") as HTMLInputElement;
// const slugContainer = document.getElementById("slug-container");
// const orgName = getElementById("organisationName", "form-control") as HTMLInputElement;
// const orgNameInfo = orgName.nextElementSibling;
// const submit = getElementById("submit-button", "btn-secondary") as HTMLInputElement;
// submit.disabled = true;
// let timeout;

// const checkName = (slug) => {
//     clearTimeout(timeout);
//     if (!slug) {
//         submit.disabled = true;
//         orgNameInfo.innerHTML = null;
//     } else {
//         timeout = setTimeout(async () => {
//             await fetch(`/page-api/isorganisation?s=${slug}`)
//                 .then(response => response.json())
//                 .then(data => {
//                     if (data) {
//                         console.log("Taken")
//                         orgName.classList.remove("available");
//                         orgName.classList.add("unavailable");
//                         orgNameInfo.innerHTML = "Unavailable"
//                         submit.disabled = true;
//                     } else {
//                         console.log("Available")
//                         orgName.classList.remove("unavailable");
//                         orgName.classList.add("available");
//                         orgNameInfo.innerHTML = "Available"
//                         submit.disabled = false;
//                     }
//                 })
//         }, 300)
//     }
// }

// orgName.addEventListener("keyup", () => {
//     let slug = slugify(orgName.value);
//     slugContainer.innerHTML = slug;
//     formInput.value = slug;
//     checkName(slug)
// })

// orgName.addEventListener("change", () => {
//     let slug = slugify(orgName.value);
//     slugContainer.innerHTML = slugify(orgName.value);
//     formInput.value = slugify(orgName.value);
//     checkName(slug)
// })


let organisationForms = Array.from(document.getElementsByClassName("org-form") as HTMLCollectionOf<HTMLElement>);

organisationForms.forEach(form => {
    try {
        new Organisation(form);
    } catch (error) {
        console.log("Error")
    }
})