var ngMultiPoint = {};

var ngMultiSliderModule = angular.module('ngMultiPointSliderModule', []);

ngMultiSliderModule.controller('ngMultiPointSliderController', ['$scope', '$timeout',

        function($scope, $timeout) {

            console.log('in the controller', $scope);

            $scope.timeout = $timeout;

            $scope.bob = function(){
                return 'bob';
            }
        }
]);

ngMultiSliderModule.directive('ngMultiPointSlider', function() {

    return {
        restrict: 'E',
        scope: {
            data:'=',
            datapoints:'=',
            sliderConfig:'=',
            histogramConfig:'=',
            sliderHeight:'=',
            sliderStyle:'=',
            uniqueName:'@',
            backColor:'@',
            histogramHoverColor:'@',
            showAxis:'@'
        },
        controller: 'ngMultiPointSliderController',
        link: function (scope, elem, attrs) {

            var slider = new MultiSlider(scope.data, scope.datapoints, scope.sliderConfig,
                scope.histogramConfig, scope.sliderHeight);

            scope.timeout(function () {
                scope.offsets = {
                    top:elem.children()[0].offsetTop,
                    left:elem.children()[0].offsetLeft,
                    width:elem.children()[0].offsetWidth
                };
                slider.render(scope.offsets, scope.uniqueName,
                              scope.backColor, scope.histogramHoverColor);
            },200, true);


        },
        replace: true,
        template: '<div id="ngSlider_{{uniqueName}}" ng-style="sliderStyle">' +
        '<div id="ngSliderContainer_{{uniqueName}}" style="clear:both;"></div>'+
        '<svg id="ngSliderAxis_{{uniqueName}}" ng-if="showAxis" ' +
        'style="margin-top:10px; clear: both; display: block ; height:20px"></svg>'+
        '<div id="ngSliderHistogram_{{uniqueName}}" ng-show="{{datapoints.length > 0}}"></div></div>'
    }
});

var ScaleFactory = function(ngMultiPoint){

    ngMultiPoint.Scale = function(scaleConfig){
        return d3.scale.linear()
            .domain(scaleConfig.domain)
            .range(scaleConfig.range);
    };

    ngMultiPoint.ScaleConfig = function(dMin, dMax, rMin, rMax){
        return{
            domain:[dMin, dMax],
            range: [rMin, rMax]
        }
    };

}(ngMultiPoint);

var MultiSlider = function(data, datapoints, sliderconfig, histoconfig, sliderheight) {

    var instance = {};

    var moving = undefined;

    var histogram = new Histogram();
    var axis = new Axis();

    var sorter = function (a, b) {
        return a < b;
    };

    var sliderHeight = sliderheight;

    var closestEvenForNotchPadding = Math.ceil(sliderheight / 4);
    closestEvenForNotchPadding = 2 * Math.round(closestEvenForNotchPadding / 2);

    var sliderNotchDimension = sliderheight + closestEvenForNotchPadding;
    var middleOfNotchDimension =  sliderNotchDimension / 3;

    var sliderNotchBorderRadius = sliderheight + 1;

    var s = new ngMultiPoint.Scale(sliderconfig);
    var y = new ngMultiPoint.Scale(histoconfig);

    var topOfNegatives = y(d3.max(data));

    var barWidth = sliderconfig.range[1] - sliderconfig.range[0];

    var dragEnd = function () {

        data.sort(sorter);

        var lefts = [];

        d3.select('#ngSliderContainer_' + instance.name)
            .selectAll('div')
            .each(function () {
                var left = d3.select(this).style('left');
                lefts.push(parseInt(left.substr(0, left.length - 2)));
            });

        lefts.sort(sorter);

        lefts.reverse();

        d3.select('#ngSliderContainer_' + instance.name)
            .selectAll('div')
            .attr('itemref', function () {
                var myLeft = d3.select(this).style('left');
                myLeft = parseInt(myLeft.substr(0, myLeft.length - 2));
                var index = lefts.indexOf(myLeft);
                return index;
            })
            .style('z-index', 88888888)
            .style('box-shadow', '1px 1px 1px gray');

        console.log(data.reverse(), lefts);
    }

    var dragMove = function () {

        var leftEnd = instance.offsets.left;
        var rightEnd = barWidth + instance.offsets.left;

        var d = d3.event.sourceEvent.x;

        if (d >= leftEnd && d <= rightEnd) {

            var val = [d-instance.offsets.left + sliderconfig.range[0]];
            var current = parseInt(s.invert(val[0]));
            var elem = d3.select(this);
            var idx = parseInt(elem.attr('itemref'));
            data[idx] = current;

            elem.style('left', Math.ceil(d - (sliderNotchDimension) / 2) + 'px')
                .attr('title', current);

            d3.select(this).style('z-index', 99999999);
        }
    };

    var dragStart = function(){
        moving = d3.select(this);
        var darker = d3.rgb(instance.color).darker(0.2);
        moving.style('z-index', 99999999)
              .style('box-shadow', '1px 1px 1px '+ darker.toString());
    }

    instance.render = function (offsets, name, color, histoColor) {

        var defaultColor = d3.rgb('#4170BA').toString();
        if(!instance.color){
            color = defaultColor;
        }

        instance.offsets = offsets;
        instance.name = name;
        instance.color = color;

        var drag = d3.behavior.drag()
            .origin(function () {
                return d3.mouse(this)[0];
            })
            .on('drag', dragMove)
            .on('dragstart', dragStart)
            .on('dragend', dragEnd);

        d3.select('#ngSliderContainer_'+name)
            .style('width', sliderconfig.range[1] - sliderconfig.range[0] + 'px')
            .style('height', sliderHeight + 'px')
            .style('background', color)
            .style('display', 'inline-block')
            .style('border-radius', (sliderHeight / 2) + 'px')
            .selectAll('div')
            .data(data)
            .enter()
            .append('div')
            .append('span');

        d3.select('#ngSliderContainer_'+name)
            .selectAll('div')
            .call(drag)
            .attr('itemref', function (d, i) {
                return i;
            })
            .attr('title', function (d) {
                return d;
            })
            .classed('tooltip', true)
            .style('background', '#F5EDF5')
            .style('left', function (d) {
                var sVal = Math.ceil(s(d));
                var val = [sVal + instance.offsets.left - sliderconfig.range[0]];
                return parseInt(val[0] - (sliderNotchDimension / 2)) + 'px';
            })
            .style('width', sliderNotchDimension + 'px')
            .style('height', sliderNotchDimension + 'px')
            .style('position', 'absolute')
            .style('display', 'inline-block')
            .style('border-radius', sliderNotchBorderRadius + 'px')
            .style('box-shadow', '1px 1px 1px gray')
            .style('top', function () {
                var top = d3.select(this).property('offsetTop')-3
                return top + 'px';
            })
            .style('z-index', 1 + 'px')
            .style('cursor', 'ew-resize')
            .select('span')
            .classed('', true)
            .style('background', color)
            .style('left', function () {
                return middleOfNotchDimension + 'px';
            })
            .style('width', middleOfNotchDimension + 'px')
            .style('height', middleOfNotchDimension + 'px')
            .style('position', 'absolute')
            .style('display', 'inline-block')
            .style('border-radius', sliderNotchBorderRadius + 'px')
            .style('top', function () {
                return middleOfNotchDimension + 'px'
            });

        axis.draw(s, sliderconfig, offsets, name, color);
        if((datapoints) && (datapoints.length > 0)){
            histogram.draw(datapoints, barWidth, y, topOfNegatives, name, color, histoColor);
        }
    }

    return instance;
};

var Histogram = function(){

    var draw = function (datapoints, barWidth, yScale, topOfNegatives, name, color, histoColor){

        var relativeParent = d3.select('#ngSliderContainer_'+name);

        d3.select('#ngSliderHistogram_'+name)
            .style('width', barWidth + 'px')
            .style('background', 'white')
            .style('margin-left', relativeParent.style('margin-left'))
            .style('margin-top', '10px')
            .selectAll('div')
            .data(datapoints)
            .enter()
            .append('div');

        d3.select('#ngSliderHistogram_'+name)
            .selectAll('div')
            .style('vertical-align', function(d){
                if(d.value > 0){
                    return 'baseline';
                }else{
                    return 'top';
                }
            })
            .style('top' , function(d){
                if(d.value < 0){
                    return Math.abs(topOfNegatives)+'px';
                }else{
                    return 0+'px';
                }
            })
            .style('height', function(d){
                if(d.value>0){
                    return Math.round(yScale(d.value))+'px';
                }else{
                    return Math.abs(yScale(d.value)) + 'px';
                }
            })
            .style('width', function(){
                return (barWidth) / datapoints.length - 1 + 'px';
            })
            .style('background-color', color)
            .style('position', 'relative')
            .style('display', 'inline-block')
            .style('cursor', 'pointer')
            .style('margin-left', '1px')
            .on("mouseover", function(d,i) {
                console.log('mouse over', d , d3.select(this).style('height'), i);
                d3.select(this)
                    .transition()
                    .duration(50)
                    .style('background', histoColor || 'orange');
            })
            .on("mouseout", function() {
                d3.select(this)
                    .transition()
                    .duration(250)
                    .style('background', color);
            })
            .on('click', function(d, i){
                console.log({
                    data:d,
                    index:i,
                    d3Selector:d3.select(this),
                    element:this
                });
            });
    }

    return{
        draw:draw
    }
}

var Axis = function(){
    var draw = function(scale, config, offsets, name, color){

        var leftEdgeForTicks = 10;
        var width = config.range[1] + config.range[0] + 20 + 'px'

        var xAxis = d3.svg.axis()
            .scale(scale)
            .orient("bottom")
            .ticks(15);  //Set rough # of ticks

        d3.select('#ngSliderAxis_'+name)
            .style('color', color)
            .style('padding-left', leftEdgeForTicks + 'px')
            .style('margin-left', -Math.abs(leftEdgeForTicks) + 'px')
            .style('width',width)
            .append("g")
            .attr("class", "axis")
            .attr('color', color)
            .attr('stroke', color)
            .attr("transform", "translate(-" +  config.range[0] + "," + 0 + ")")
            .style('width', width)
            .call(xAxis);
    }
    return {
        draw:draw
    }
}