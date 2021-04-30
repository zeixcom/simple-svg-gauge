class SimpleSvgGauge {
  constructor() {
    this.gauge = document.querySelector(".js-simple-svg-gauge");
    this.needle = document.querySelector(".js-simple-svg-gauge-needle");
    this.circles = this.gauge.querySelectorAll("circle");
    this.width = this.gauge.getAttribute("width");
    this.height = this.gauge.getAttribute("height");
  }

  setSections = function (sections) {
    const $this = this;
    const currentRotation = 180;
    let lastRotation = 0;

    // loop all circles
    [].forEach.call(this.circles, function (el, i) {
      const strokeWidth = parseInt(window.getComputedStyle(el).strokeWidth, 10);

      el.setAttribute("cx", $this.width / 2);
      el.setAttribute("cy", $this.height / 2);
      el.setAttribute("r", $this.width / 2 - strokeWidth / 2);

      const radius = el.getAttribute("r");
      const circumference = radius * 2 * Math.PI;
      const percentage = $this.validatePercentage(sections[i]);
      const rotation = parseInt(currentRotation + lastRotation, 10);
      let offset = circumference - ((percentage / 100) * circumference) / 2;

      if (i < $this.circles.length - 1) {
        offset += 2;
      }

      el.style.strokeDasharray = circumference + " " + circumference;
      el.style.strokeDashoffset = offset;

      // use gsap for transform if available for IE 11 support
      if (typeof gsap !== "undefined") {
        gsap.to(el, {
          duration: 0,
          rotation: rotation,
          transformOrigin: "50% 50%",
        });
      } else {
        el.style.transform = "rotate(" + rotation + "deg)";
      }

      lastRotation = lastRotation + $this.percentageToDegree(percentage);
    });
  };

  setStatus = function (percentage) {
    const degree = this.percentageToDegree(this.validatePercentage(percentage));

    this.needle.style.transform =
      "rotate(" + parseInt(270 + degree, 10) + "deg) translate(0, 6px)";
  };

  percentageToDegree = function (percentage) {
    return (percentage / 100) * 180; // 180 deg for half circle
  };

  validatePercentage = function (percentage) {
    if (!(percentage >= 0 && percentage <= 100)) {
      percentage = 0;
      console.error("Please use valid percentage values.");
    }

    return percentage;
  };
}

export default SimpleSvgGauge;
