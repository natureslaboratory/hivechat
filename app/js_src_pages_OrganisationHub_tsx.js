/*! For license information please see js_src_pages_OrganisationHub_tsx.js.LICENSE.txt */
(self.webpackChunkmain=self.webpackChunkmain||[]).push([["js_src_pages_OrganisationHub_tsx"],{"./js/src/components/BackButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\n\n\nvar BackButton = function (props) {\n    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Link, __assign({ to: props.link }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", __assign({ className: "c-button--back btn btn-outline-primary mb-4" }, { children: props.label }), void 0) }), void 0));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BackButton);\n\n\n//# sourceURL=webpack://main/./js/src/components/BackButton.tsx?')},"./js/src/components/Card.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   "CardBody": () => (/* binding */ CardBody)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\n\nvar Card = function (props) {\n    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", __assign({ className: "card mb-3" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", __assign({ className: "card-header" }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h5", __assign({ style: { margin: 0 }, className: "card-title m-b-0" }, { children: props.title }), void 0) }), void 0), props.children] }), void 0));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Card);\nvar CardBody = function (props) {\n    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", __assign({ className: "card-body" }, { children: props.children }), void 0));\n};\n\n\n//# sourceURL=webpack://main/./js/src/components/Card.tsx?')},"./js/src/components/PageTitle.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\n\nvar PageTitle = function (props) {\n    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", __assign({ className: "app-page-title" }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", __assign({ className: "page-title-wrapper" }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", __assign({ className: "page-title-heading" }, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", __assign({ className: "page-title-icon" }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("i", { className: "pe-7s-user icon-gradient bg-mean-fruit" }, void 0) }), void 0),\n                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { children: [props.title, " ", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", __assign({ className: "page-title-subheading" }, { children: props.subtitle }), void 0)] }, void 0)] }), void 0) }), void 0) }), void 0));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageTitle);\n\n\n//# sourceURL=webpack://main/./js/src/components/PageTitle.tsx?')},"./js/src/pages/Organisation.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");\n/* harmony import */ var _services_newApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/newApi */ "./js/src/services/newApi.ts");\n/* harmony import */ var _components_BackButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/BackButton */ "./js/src/components/BackButton.tsx");\n/* harmony import */ var _components_Card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Card */ "./js/src/components/Card.tsx");\n/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Layout */ "./js/src/components/Layout.tsx");\n/* harmony import */ var _components_PageTitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/PageTitle */ "./js/src/components/PageTitle.tsx");\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\n\n\n\n\n\n\nvar Organisation = function (props) {\n    var _a = (0,_services_newApi__WEBPACK_IMPORTED_MODULE_1__.useGetOrganisationQuery)(props.match.params.slug), organisation = _a.data, isLoading = _a.isLoading;\n    if (isLoading) {\n        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", { children: "Fetching organisation..." }, void 0);\n    }\n    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_PageTitle__WEBPACK_IMPORTED_MODULE_5__.default, { title: organisation.organisationName }, void 0),\n            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_BackButton__WEBPACK_IMPORTED_MODULE_2__.default, { link: "/organisations", label: "Back To Organisations" }, void 0),\n            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Layout__WEBPACK_IMPORTED_MODULE_4__.Row, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Layout__WEBPACK_IMPORTED_MODULE_4__.Col, __assign({ columns: 6 }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Card__WEBPACK_IMPORTED_MODULE_3__.default, __assign({ title: "About " + organisation.organisationName }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_Card__WEBPACK_IMPORTED_MODULE_3__.CardBody, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { dangerouslySetInnerHTML: { __html: organisation.organisationDesc } }, void 0) }, void 0) }), void 0) }), void 0) }, void 0)] }, void 0));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Organisation);\n\n\n//# sourceURL=webpack://main/./js/src/pages/Organisation.tsx?')},"./js/src/pages/OrganisationHub.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");\n/* harmony import */ var _components_PageTitle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/PageTitle */ "./js/src/components/PageTitle.tsx");\n/* harmony import */ var _Organisation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Organisation */ "./js/src/pages/Organisation.tsx");\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\n\n\n\n\nvar OrganisationHub = function (props) {\n    var _a = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_3__.useRouteMatch)(), path = _a.path, url = _a.url;\n    console.log(path + "/:slug");\n    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.Switch, { children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.Route, __assign({ exact: true, path: path }, { children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_PageTitle__WEBPACK_IMPORTED_MODULE_1__.default, { title: "Organisations" }, void 0) }), void 0),\n            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.Route, { path: path + "/:slug", component: _Organisation__WEBPACK_IMPORTED_MODULE_2__.default }, void 0)] }, void 0));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OrganisationHub);\n\n\n//# sourceURL=webpack://main/./js/src/pages/OrganisationHub.tsx?')}}]);