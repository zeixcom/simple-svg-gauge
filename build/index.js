(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SimpleSvgGauge"] = factory();
	else
		root["SimpleSvgGauge"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SimpleSvgGauge = function SimpleSvgGauge() {
  _classCallCheck(this, SimpleSvgGauge);

  _defineProperty(this, "setSections", function (sections) {
    var $this = this;
    var currentRotation = 180;
    var lastRotation = 0; // loop all circles

    [].forEach.call(this.circles, function (el, i) {
      var strokeWidth = parseInt(window.getComputedStyle(el).strokeWidth, 10);
      el.setAttribute("cx", $this.width / 2);
      el.setAttribute("cy", $this.height / 2);
      el.setAttribute("r", $this.width / 2 - strokeWidth / 2);
      var radius = el.getAttribute("r");
      var circumference = radius * 2 * Math.PI;
      var percentage = $this.validatePercentage(sections[i]);
      var rotation = parseInt(currentRotation + lastRotation, 10);
      var offset = circumference - percentage / 100 * circumference / 2;

      if (i < $this.circles.length - 1) {
        offset += 2;
      }

      el.style.strokeDasharray = circumference + " " + circumference;
      el.style.strokeDashoffset = offset; // use gsap for transform if available for IE 11 support

      if (typeof gsap !== "undefined") {
        gsap.to(el, {
          duration: 0,
          rotation: rotation,
          transformOrigin: "50% 50%"
        });
      } else {
        el.style.transform = "rotate(" + rotation + "deg)";
      }

      lastRotation = lastRotation + $this.percentageToDegree(percentage);
    });
  });

  _defineProperty(this, "setStatus", function (percentage) {
    var degree = this.percentageToDegree(this.validatePercentage(percentage));
    this.needle.style.transform = "rotate(" + parseInt(270 + degree, 10) + "deg) translate(0, 6px)";
  });

  _defineProperty(this, "percentageToDegree", function (percentage) {
    return percentage / 100 * 180; // 180 deg for half circle
  });

  _defineProperty(this, "validatePercentage", function (percentage) {
    if (!(percentage >= 0 && percentage <= 100)) {
      percentage = 0;
      console.error("Please use valid percentage values.");
    }

    return percentage;
  });

  this.gauge = document.querySelector(".js-simple-svg-gauge");
  this.needle = document.querySelector(".js-simple-svg-gauge-needle");
  this.circles = this.gauge.querySelectorAll("circle");
  this.width = this.gauge.getAttribute("width");
  this.height = this.gauge.getAttribute("height");
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SimpleSvgGauge);
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map