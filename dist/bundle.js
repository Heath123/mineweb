/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./build/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/lib/mineweb.js":
/*!******************************!*\
  !*** ./build/lib/mineweb.js ***!
  \******************************/
/*! exports provided: Mineweb */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (142:5)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n|       // noa.world.setChunkData(id, data) */\\n|       // }, 1000);\\n>     });\\n| \\n|     var player = this._noa.playerEntity;\");\n\n//# sourceURL=webpack:///./build/lib/mineweb.js?");

/***/ }),

/***/ "./build/main.js":
/*!***********************!*\
  !*** ./build/main.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_mineweb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/mineweb.js */ \"./build/lib/mineweb.js\");\n\nlet hhost = prompt(\"Host\", \"95.111.249.143:10000\");\nconst mineweb = new _lib_mineweb_js__WEBPACK_IMPORTED_MODULE_0__[\"Mineweb\"](hhost.split(\":\")[0], hhost.split(\":\")[1]);\n// import { setup } from \"./setup.js\";\n// setup();\n\nconsole.log(\"Mineweb version dev-newchunkload2\"); // In the dev version we can put some random letters here to make sure it built properly, maybe, and do it properly in the snapshot\n\nconst username = prompt(\"Please choose a username\");\nconsole.log(\"Starting with username: \" + username);\nmineweb.start(username)\n// HACK TO MAKE AN ESC POPUP WITH SETTINGS ETC\ndocument.addEventListener(\"pointerlockchange\", function(event) {\n  const canvas = document.getElementById(\"noa-canvas\");\n  if (\n    document.pointerLockElement === canvas ||\n    document.mozPointerLockElement === canvas\n  ) {\n    console.log(\"The pointer lock status is now locked\");\n  } else {\n    console.log(\"The pointer lock status is now unlocked\");\n  }\n});\n// END\n\n\n//# sourceURL=webpack:///./build/main.js?");

/***/ })

/******/ });