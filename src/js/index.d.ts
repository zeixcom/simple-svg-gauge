declare class SimpleSvgGauge {
    private width;
    private height;
    private radius;
    private circumference;
    private circles;
    private needle;
    private gauge;
    private strokeWidth;
    constructor();
    init: () => void;
    setSections: (sections: number[]) => void;
    setValue: (percentage: number) => void;
    private setVariables;
    private updateAttributes;
    private setRotation;
    private setDimensions;
    private percentageToDegree;
    private validatePercentage;
}
export default SimpleSvgGauge;
