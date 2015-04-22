# ng-multi-point-slider

A multi range slider built with angularJS and the legendary [D3](http://d3js.org/). The ngMultiPointSlider supports (n) range points
on a slider and is capable of displaying an axis covering its entire range along with a bar chart representing all the
associated data points within the given ranges.

ngMultiPointSlider is a work in progress and not yet rated as stable. Feel free to twist in any direction.

![Image of slider](https://raw.githubusercontent.com/cyclomaticsegal/ngMultiSlider/master/img/slider.png)

## Setup

After downloading run a bower install. You should npm install if you wish run the examples.

$bower install

$npm install


## Configure

![Image of slider](https://raw.githubusercontent.com/cyclomaticsegal/ngMultiSlider/master/img/code.png)


## Callbacks

Register your own callback functions for drag

```javascript

$scope.reportOnDragStop = function(data){
        console.log('Dragging stopped. Here are the range points:', data);
    };

$scope.hoverOnDataPoint = function(data){
    console.log('Hovered on data point:', data);
};

```