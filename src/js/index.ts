declare var gsap: any;

class SimpleSvgGauge {
  width: number;
  height: number;
  circles: NodeListOf<SVGCircleElement>;
  needle: SVGElement;
  gauge: SVGElement;

  constructor() {
    this.gauge = document.querySelector(".js-simple-svg-gauge");
    this.needle = document.querySelector(".js-simple-svg-gauge-needle");
    this.circles = this.gauge.querySelectorAll("circle");
    this.width = Number(this.gauge.getAttribute("width"));
    this.height = Number(this.gauge.getAttribute("height"));
  }

  setSections = (sections: number[]) => {
    const $this = this;
    const currentRotation: number = 180;
    let lastRotation: number = 0;

    // loop all circles
    [].forEach.call(this.circles, (el: SVGElement, i: number) => {
      const strokeWidth = parseInt(window.getComputedStyle(el).strokeWidth, 10);

      el.setAttribute("cx", String($this.width / 2));
      el.setAttribute("cy", String($this.height / 2));
      el.setAttribute("r", String($this.width / 2 - strokeWidth / 2));

      const radius: number = Number(el.getAttribute("r"));
      const circumference = radius * 2 * Math.PI;
      const percentage = $this.validatePercentage(sections[i]);
      const rotation = currentRotation + lastRotation;
      let offset = circumference - ((percentage / 100) * circumference) / 2;

      if (i < $this.circles.length - 1) {
        offset += 2;
      }

      el.style.strokeDasharray = `${circumference} ${circumference}`;
      el.style.strokeDashoffset = String(offset);

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

  setValue = (percentage: number) => {
    const degree = this.percentageToDegree(this.validatePercentage(percentage));

    this.needle.style.transform =
      "rotate(" + Number(270 + degree) + "deg) translate(0, 6px)";
  };

  private percentageToDegree = (percentage: number): number => {
    return (percentage / 100) * 180; // 180 deg for half circle
  };

  private validatePercentage = (percentage: number): number => {
    if (!(percentage >= 0 && percentage <= 100)) {
      percentage = 0;
      console.error("Please use valid percentage values.");
    }

    return percentage;
  };
}

export default SimpleSvgGauge;
