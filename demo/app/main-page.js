let dateRangePickerModule = require("nativescript-date-range-picker");
let observableModule = require("data/observable");

var viewModel = new observableModule.Observable();

function onPageLoaded(args) {
    var page = args.object;
    viewModel.set("startDate", new Date());
    var futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 2);
    viewModel.set("endDate", futureDate);
    page.bindingContext = viewModel;
    viewModel.on(observableModule.Observable.propertyChangeEvent, function(propertyChangeData) {
        if (propertyChangeData.propertyName == "endDate") {
            viewModel.set("formattedDateRange" , getDisplay(viewModel.get('startDate'))+ " - " + getDisplay(viewModel.get('endDate')));
            console.log("ViewModel: " + viewModel.get('endDate'));
        }
    });
}

function onDateRangePickerLoaded(args) {
    let dateRangePicker = args.object;
    dateRangePicker.on(observableModule.Observable.propertyChangeEvent, function(propertyChangeData) {
        if (propertyChangeData.propertyName == dateRangePickerModule.DateRangePicker.startDateProperty.name) {
            // console.log("Start change is : "+ propertyChangeData.value);   
        } else if (propertyChangeData.propertyName == dateRangePickerModule.DateRangePicker.endDateProperty.name) {
            console.log("End change is : "+ propertyChangeData.value);
        }        
    }, this);
}

function getDisplay(date) {
    let iosDate = NSDate.dateWithTimeIntervalSince1970(date.getTime() / 1000.0);
    return NSDateFormatter.localizedStringFromDateDateStyleTimeStyle(iosDate, NSDateFormatterShortStyle, NSDateFormatterShortStyle);
}

exports.onDateRangePickerLoaded = onDateRangePickerLoaded;
exports.onUserDraggedTo = function(eventData) {
    // console.log(eventData.dayView);
}

exports.pageLoaded = onPageLoaded; 
