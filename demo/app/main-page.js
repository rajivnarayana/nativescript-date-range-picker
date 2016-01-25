let dateRangePickerModule = require("nativescript-date-range-picker");
let observableModule = require("data/observable");

function onDateRangePickerLoaded(args) {
    let dateRangePicker = args.object;
    dateRangePicker.on(observableModule.Observable.propertyChangeEvent, function(propertyChangeData) {
        if (propertyChangeData.propertyName == dateRangePickerModule.DateRangePicker.startDateProperty.name) {
            console.log("Start change is : "+ propertyChangeData.value);   
        } else if (propertyChangeData.propertyName == dateRangePickerModule.DateRangePicker.endDateProperty.name) {
            console.log("End change is : "+ propertyChangeData.value);
        }
    }, this);
}

exports.onDateRangePickerLoaded = onDateRangePickerLoaded;
exports.onUserDraggedTo = function(eventData) {
    console.log(eventData.dayView);
}
