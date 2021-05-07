declare var gsap: any;

class SimpleSvgGauge {
  private width: number;
  private height: number;
  private radius: number;
  private circumference: number;
  private circles: NodeListOf<SVGCircleElement>;
  private needle: SVGElement;
  private gauge: SVGElement;
  private strokeWidth: number = 42;

  constructor() {}

  init = () => {
    this.setVariables();
    this.setDimensions(
      Number(this.gauge.getAttribute("width")),
      Number(this.gauge.getAttribute("height"))
    );
  };

  setSections = (sections: number[]) => {
    const currentRotation: number = 180;
    let lastRotation: number = 0;

    this.radius = this.width / 2 - this.strokeWidth / 2;
    this.circumference = this.radius * 2 * Math.PI;

    // loop all circles
    [].forEach.call(this.circles, (el: SVGCircleElement, i: number) => {
      const percentage = this.validatePercentage(sections[i]);
      const rotation = currentRotation + lastRotation;
      let offset =
        this.circumference - ((percentage / 100) * this.circumference) / 2;

      if (i < this.circles.length - 1) {
        offset += 2;
      }

      this.updateAttributes(el, offset);
      this.setRotation(el, rotation);

      lastRotation = lastRotation + this.percentageToDegree(percentage);
    });
  };

  setValue = (percentage: number) => {
    const degree = this.percentageToDegree(this.validatePercentage(percentage));

    this.needle.style.transform =
      "rotate(" + Number(270 + degree) + "deg) translate(0, 6px)";
  };

  private setVariables = () => {
    this.gauge = document.querySelector(".js-simple-svg-gauge");
    this.needle = document.querySelector(".js-simple-svg-gauge-needle");
    this.circles = this.gauge.querySelectorAll("circle");

    if (this.circles.length) {
      this.strokeWidth = parseInt(
        window.getComputedStyle(this.circles[0]).strokeWidth,
        10
      );
    }
  };

  private updateAttributes = (el: SVGCircleElement, offset: number) => {
    el.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    el.style.strokeDashoffset = String(offset);

    el.setAttribute("cx", String(this.width / 2));
    el.setAttribute("cy", String(this.height / 2));
    el.setAttribute("r", String(this.radius));
  };

  private setRotation = (el: SVGCircleElement, rotation: number) => {
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
  };

  private setDimensions = (width: number, height: number) => {
    this.width = width;
    this.height = height;
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
