# Simple SVG Gauge
SVG gauge with zero dependencies


## Usage
```html
<div class="simple-svg-gauge">
    <div class="simple-svg-gauge__container">
        <svg xmlns="http://www.w3.org/2000/svg" width="290" height="290" viewbox="0 0 290 290" class="simple-svg-gauge__svg js-simple-svg-gauge">
            <circle class="simple-svg-gauge__circle simple-svg-gauge__circle--above" />
            <circle class="simple-svg-gauge__circle simple-svg-gauge__circle--mid" />
            <circle class="simple-svg-gauge__circle simple-svg-gauge__circle--below" />
        </svg>

        <div class="simple-svg-gauge__control">
            <div class="simple-svg-gauge__needle">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="154" viewBox="0 0 8 154" class="js-simple-svg-gauge-needle">
                    <polygon id="needle" points="4 0 5 1 8 150 4 154 0 150 3 1 4 0" />
                </svg>
            </div>
        </div>
    </div>
</div>
```

### Importing via NPM
```js
    import SimpleSvgGauge from '@zeix/simple-svg-gauge';

    var myGauge = new SimpleSvgGauge();

    // Set sections according to your circle elements in percent
    myGauge.setSections([35, 5, 60]);

    // Set status of the needle in percent
    myGauge.setStatus(29);
```


### Script Tag
```js
    var SimpleSvgGauge = SimpleSvgGauge.default;
    var myGauge = new SimpleSvgGauge();

    // Set sections according to your circle elements in percent
    myGauge.setSections([35, 5, 60]);

    // Set status of the needle in percent
    myGauge.setStatus(29);
```

## Browser Support
All modern browser are supported.

IE 11 is only supported if the [gsap](https://github.com/greensock/GSAP) core library is loaded on your page. That way shortcomings with transforms and transform-origin on SVG elements are fixed.