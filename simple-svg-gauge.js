var SimpleSvgGauge = (function() {
    'use strict';

    function percentageToDegree(percentage) {
        return percentage / 100 * 180; // 180 deg for half circle
    }

    function validatePercentage(percentage) {
        if (! (percentage >= 0 && percentage <= 100)) {
            percentage = 0;
            console.error('Please use valid percentage values.');
        }

        return percentage;
    }

    var Gauge = function() {
        var gauge = document.querySelector('.js-simple-svg-gauge');
        var needle = document.querySelector('.js-simple-svg-gauge-needle');
        var circles = gauge.querySelectorAll('circle');
        var width = gauge.getAttribute('width');
        var height = gauge.getAttribute('height');

        var api = {
            setSections: function(sections) {
                var currentRotation = 180;
                var lastRotation = 0;

                // loop all circles
                [].forEach.call(circles, function(el, i) {
                    var strokeWidth = parseInt(window.getComputedStyle(el).strokeWidth, 10);

                    el.setAttribute('cx', width / 2);
                    el.setAttribute('cy', height / 2);
                    el.setAttribute('r', width / 2 - strokeWidth / 2);

                    var radius = el.getAttribute('r');
                    var circumference = radius * 2 * Math.PI;
                    var percentage = validatePercentage(sections[i]);
                    var offset = circumference - (percentage / 100 * circumference) / 2;
                    var rotation = parseInt(currentRotation + lastRotation);

                    if (i < circles.length - 1) {
                        offset = offset + 2;
                    }

                    el.style.strokeDasharray = circumference + ' ' + circumference;
                    el.style.strokeDashoffset = offset;

                    // use gsap for transform if available for IE 11 support
                    if (typeof gsap !== 'undefined') {
                        gsap.to(el, {
                            duration: 0,
                            rotation: rotation,
                            transformOrigin: '50% 50%'
                        });
                    } else {
                        el.style.transform = 'rotate(' + rotation + 'deg)';
                    }

                    lastRotation = lastRotation + percentageToDegree(percentage);
                });
            },
            setStatus: function(percentage) {
                var degree = percentageToDegree(validatePercentage(percentage));

                needle.style.transform = 'rotate(' + parseInt(270 + degree)  + 'deg) translate(0, 6px)';
            }
        };

        return api;
    };

    return Gauge;
}());
