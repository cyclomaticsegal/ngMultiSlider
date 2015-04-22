# ng-multi-point-slider

A multi range slider built with angularJS and the legendary [D3](http://d3js.org/). The ngMultiPointSlider supports (n) range points
on a slider and is capable of displaying an axis covering its entire range along with a bar chart representing all the
associated data points within the given ranges.

ngMultiPointSlider is a work in progress and not yet rated as stable. Feel free to twist in any direction.

![Image of slider](https://raw.githubusercontent.com/cyclomaticsegal/ngMultiSlider/master/img/slider.png)

## Setup

After downloading run a bower install. You should npm install if you wish run the examples.

$ bower install

$ npm install


## Configure

Configuring the ngMultPointSlider is where things get interesting. The directive has a number of properties than
enable the end user to choose their colours, setup some callback functions and bind data. 

![Image of slider](https://raw.githubusercontent.com/cyclomaticsegal/ngMultiSlider/master/img/code.png)

### data

The data property requires an array of numbers that represent the points along the slider for draggable round handles.
The numeric points between these numbers make up one of the (n) ranges.

```javascript

$scope.data[2] = [-140, -100, -50, 110, 230, 360, 470];

```

### data-points

The data-points property takes an array of objects that must adhere to a partial convention that it should contain
a value and label property. In the example below a data property has also been added which maybe be useful if the case
where the consumer application wishes to register a callback on the on-hover-data-point event.

```javascript

$scope.dataPoints[2] = [
        {value:-33, label:"First", data:{field1:"..."}},
        {value:-44, label:"Second", data:{field1:"..."}},
        {value:-55, label:"Third", data:{field1:"..."}},
        {value:-66, label:"Fourth", data:{field1:"..."}},
        {value:-77, label:"Fifth", data:{field1:"..."}},
        {value:-88, label:"Sixth", data:{field1:"..."}},
        {value:-100,label:"Seventh", data:{field1:"..."}},
        {value:-123,label:"Eighth", data:{field1:"..."}},
        {value:-133,label:"Ninth", data:{field1:"..."}},
        {value:144,label:"Tenth", data:{field1:"..."}},
        {value:177, label:"Eleventh", data:{field1:"..."}},
        {value:234, label:"Twelfth", data:{field1:"..."}},
        {value:256, label:"Thirteenth", data:{field1:"..."}},
        {value:277, label:"Fourteenth", data:{field1:"..."}},
        {value:289, label:"Fifteenth", data:{field1:"..."}},
        {value:305, label:"Sixteenth", data:{field1:"..."}},
        {value:340,label:"Seventeenth", data:{field1:"..."}},
        {value:380,label:"Eighteenth", data:{field1:"..."}},
        {value:429,label:"Nineteenth", data:{field1:"..."}},
        {value:450,label:"Twentieth", data:{field1:"..."}},
        {value:490,label:"Twenty first", data:{field1:"..."}}];
        
```

### show-axis

The show-axis property takes any truth value and indicates that the axis should be rendered at runtime.

### unique-name

The unique-name property is required to distinguish multiple instances of the directive from each other. If more than
one instance of the directive is placed on a view concurrently and the names are not unique, layout issues will arrise.

### slider-config

The ng-multi-point-slider internalises D3 and uses linear scales to create the domain and range for the slider,
histogram and axis. The slider-config property is responsible for configuring the scale for the slider.

From the example:

```javascript

$scope.sliderConfig[2] = new ngMultiPoint.ScaleConfig(-200, 500, 1, 500);

```

### histogram-config

This property is responsible for configuring the scale of the histogram.


### back-color

The back-color property is self explanatory and determines the background color of the slider, axis and histogram.


### histogram-hover-color

Determines the hover color of the histogram.

### slider-height

This property determines the height of the slider.

### slider-style

The slider style can be applied to affect the style of the container div that houses all the ng-multi-point-slider assets.

### on-release-slider

A callback function that passes the discrete numeric values representing all the range divisions.

### on-hover-data-point

A callback function that passes the data object bound to the column of the histogram. This data object is the equivalent
object primed in the initial binding of the directive through the data-points property.

## Callbacks

Register your own callback functions for the drag end event or the hover event over any of columns in the histogram. The
example above shows the following function bound to the on-release-slider property.

```javascript

$scope.reportOnDragStop = function(data){
        console.log('Dragging stopped. Here are the range points:', data);
};

```

In the example, the function below has been bound to the on-hover-data-point property.

```javascript

$scope.hoverOnDataPoint = function(data){
    console.log('Hovered on data point:', data);
};

```

> - Enjoy! cyclomaticsegal