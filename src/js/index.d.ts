declare class SimpleSvgGauge {
    width: number;
    height: number;
    circles: NodeListOf<SVGCircleElement>;
    needle: SVGElement;
    gauge: SVGElement;
    constructor();
    setSections: (sections: number[]) => void;
    setValue: (percentage: number) => void;
    private percentageToDegree;
    private validatePercentage;
}
export default SimpleSvgGauge;
