# Simple SVG Gauge
SVG gauge with zero dependencies


## Usage
```js
    var myGauge = new SimpleSvgGauge();

    // Set sections according to your circle elements in percent
    myGauge.setSections([35, 5, 60]);

    // Set status of the needle in percent
    myGauge.setStatus(29);
```

## Browser Support
All modern browser are supported.

IE 11 is only supported if the [gsap](https://github.com/greensock/GSAP) core library is loaded on your page. That way shortcomings with transforms and transform-origin on SVG elements are fixed.