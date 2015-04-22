var multipointApp = angular.module('multipointApp', ['ngMultiPointSliderModule']);
multipointApp.controller('exampleMultiSliderController', ['$scope', function($scope){

    $scope.data = new Array(3);
    $scope.dataPoints = new Array(3);
    $scope.sliderConfig = new Array(3);
    $scope.histogramConfig = new Array(3);

    $scope.data[0] = [986, 3125, 4553, 8588, 10780];
    $scope.dataPoints[0] = [
        {value:590, label:"First", data:{field1:"..."}},
        {value:1000, label:"Second", data:{field1:"..."}},
        {value:1700, label:"Third", data:{field1:"..."}},
        {value:2780, label:"Fourth", data:{field1:"..."}},
        {value:3265, label:"Fifth", data:{field1:"..."}},
        {value:3786, label:"Sixth", data:{field1:"..."}},
        {value:4000,label:"Seventh", data:{field1:"..."}},
        {value:4377,label:"Eighth", data:{field1:"..."}},
        {value:4625,label:"Ninth", data:{field1:"..."}},
        {value:5030,label:"Tenth", data:{field1:"..."}},
        {value:6553,label:"Eleventh", data:{field1:"..."}},
        {value:7090,label:"Twelfth", data:{field1:"..."}},
        {value:8800,label:"Thirteenth", data:{field1:"..."}},
        {value:9588,label:"Fourteenth", data:{field1:"..."}},
        {value:10390,label:"Fifteenth", data:{field1:"..."}},
        {value:11780,label:"Sixteenth", data:{field1:"..."}}];

    $scope.sliderConfig[0] = new ngMultiPoint.ScaleConfig(1, 12000, 40, 840);
    $scope.histogramConfig[0] = new ngMultiPoint.ScaleConfig(1, 12000, 1, 100);

    $scope.data[1] = [233, 555, 774, 813, 920];
    $scope.dataPoints[1] = [
        {value:100, label:"First", data:{field1:"..."}},
        {value:200, label:"Second", data:{field1:"..."}},
        {value:280, label:"Third", data:{field1:"..."}},
        {value:320, label:"Fourth", data:{field1:"..."}},
        {value:339, label:"Fifth", data:{field1:"..."}},
        {value:470, label:"Sixth", data:{field1:"..."}},
        {value:540,label:"Seventh", data:{field1:"..."}},
        {value:689,label:"Eighth", data:{field1:"..."}},
        {value:763,label:"Ninth", data:{field1:"..."}},
        {value:812,label:"Tenth", data:{field1:"..."}},
        {value:941,label:"Eleventh", data:{field1:"..."}}];

    $scope.sliderConfig[1] = new ngMultiPoint.ScaleConfig(1, 1400, 20, 520);
    $scope.histogramConfig[1] = new ngMultiPoint.ScaleConfig(1, 1400, 1, 200);

    $scope.data[2] = [-140, -100, -50, 110, 230, 360, 470];
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

    $scope.sliderConfig[2] = new ngMultiPoint.ScaleConfig(-200, 500, 1, 500);
    $scope.histogramConfig[2] = new ngMultiPoint.ScaleConfig(-200, 500, 1, 50);

    $scope.reportOnDragStop = function(data){
        console.log('Dragging stopped. Here are the range points:', data);
    };

    $scope.hoverOnDataPoint = function(data){
        console.log('Hovered on data point:', data);
    };

}]);
