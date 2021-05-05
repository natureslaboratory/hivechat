/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/src/classes/Organisation.ts":
/*!****************************************!*\
  !*** ./js/src/classes/Organisation.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Organisation = /** @class */ (function () {
    function Organisation(node) {
        this.node = node;
        this.orgName = this.getPerchElement("organisationName", "form-control");
        if (!this.orgName) {
            throw new Error("No Valid orgName");
        }
        this.orgNameInfo = this.node.getElementsByClassName("org-name-info")[0];
        if (!this.orgNameInfo) {
            throw new Error("No Valid orgNameInfo");
        }
        this.orgSlug = this.getPerchElement("organisationSlug", "form-control");
        if (!this.orgSlug) {
            throw new Error("No Valid orgSlug");
        }
        this.orgSlugDisplay = this.node.getElementsByClassName("slug-container")[0];
        this.orgSlugDisplayLink = this.node.getElementsByClassName("slug-link")[0];
        this.submitButton = this.node.getElementsByClassName("organisationSubmit")[0];
        if (!this.submitButton) {
            throw new Error("No Valid submitButton");
        }
        if (this.orgName.value) {
            this.currentName = this.orgName.value.trim();
            this.updateValues();
        }
        this.addEventListeners();
    }
    Organisation.prototype.getPerchElement = function (id, className) {
        var array = this.node.getElementsByClassName(className);
        return Array.from(array).filter(function (el) { return el.id.includes(id); })[0];
    };
    Organisation.prototype.slugify = function (title) {
        var newTitle = title.trim().toLowerCase();
        var newDashedTitle = newTitle.split(" ").map(function (word) {
            var newWord = "";
            for (var i = 0; i < word.length; i++) {
                var letter = word[i];
                var pattern = /[A-Za-z0-9]/;
                if (!pattern.test(letter)) {
                    continue;
                }
                else {
                    newWord += letter;
                }
            }
            return newWord;
        }).join("-");
        return newDashedTitle;
    };
    Organisation.prototype.checkName = function (slug) {
        var _this = this;
        clearTimeout(this.timeout);
        if (!slug) {
            this.submitButton.disabled = true;
            this.orgNameInfo.innerHTML = null;
        }
        else {
            this.timeout = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch("/page-api/isorganisation?s=" + slug)
                                .then(function (response) { return response.json(); })
                                .then(function (data) {
                                if (data) {
                                    if (!(data.organisationName == _this.currentName)) {
                                        _this.setUnavailable();
                                    }
                                    else {
                                        _this.setNeutral();
                                    }
                                }
                                else {
                                    _this.setAvailable();
                                }
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }, 300);
        }
    };
    Organisation.prototype.setNeutral = function () {
        this.orgName.classList.remove("unavailable");
        this.orgName.classList.remove("available");
        this.orgNameInfo.innerHTML = "";
        this.enableButton();
    };
    Organisation.prototype.setAvailable = function () {
        this.orgName.classList.remove("unavailable");
        this.orgName.classList.add("available");
        this.orgNameInfo.innerHTML = "Available";
        this.enableButton();
    };
    Organisation.prototype.setUnavailable = function () {
        this.orgName.classList.add("unavailable");
        this.orgName.classList.remove("available");
        this.orgNameInfo.innerHTML = "Unavailable";
        this.disableButton();
    };
    Organisation.prototype.disableButton = function () {
        this.submitButton.disabled = true;
    };
    Organisation.prototype.enableButton = function () {
        this.submitButton.disabled = false;
    };
    Organisation.prototype.updateValues = function () {
        var slug = this.slugify(this.orgName.value);
        if (this.orgSlugDisplay) {
            this.orgSlugDisplay.innerHTML = slug;
        }
        this.orgSlug.value = slug;
        if (this.orgSlugDisplayLink && !this.orgSlugDisplayLink.href) {
            var protocols = ["http://", "https://"];
            var protocol_1;
            var url_1 = window.location.href;
            protocols.forEach(function (p) {
                if (url_1.includes(p)) {
                    protocol_1 = p;
                }
            });
            var splitUrl = url_1.split(protocol_1);
            var urlWithoutProtocol = splitUrl[splitUrl.length - 1];
            var domain = urlWithoutProtocol.split("/")[0];
            this.orgSlugDisplayLink.href = "" + protocol_1 + domain + "/organisation/" + slug;
        }
        this.checkName(slug);
    };
    Organisation.prototype.addEventListeners = function () {
        var _this = this;
        this.orgName.addEventListener("keyup", function () {
            _this.updateValues();
        });
        this.orgName.addEventListener("change", function () {
            _this.updateValues();
        });
    };
    return Organisation;
}());
exports.default = Organisation;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*************************!*\
  !*** ./js/src/index.ts ***!
  \*************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var Organisation_1 = __webpack_require__(/*! ./classes/Organisation */ "./js/src/classes/Organisation.ts");
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
var organisationForms = Array.from(document.getElementsByClassName("org-form"));
organisationForms.forEach(function (form) {
    try {
        new Organisation_1.default(form);
    }
    catch (error) {
        console.error(error);
    }
});

})();

/******/ })()
;
//# sourceMappingURL=index.js.map