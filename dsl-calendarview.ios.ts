import { DateRangePicker as DateRangePickerBase } from "./dsl-calendarview-common";
import { PropertyMetadata } from "ui/core/proxy";
import { PropertyChangeData } from "ui/core/dependency-observable";
import { layout } from "utils/utils";
import { View } from "ui/core/view";
import { EventData } from "data/observable";
import { Color } from "color";

function onMaxDatePropertyChanged(data: PropertyChangeData) {
    let picker = <DateRangePicker>data.object;

    if (picker.ios) {
        let nsDate = NSDate.dateWithTimeIntervalSince1970((<Date>data.newValue).getTime() / 1000);
        picker.ios.maximumDate = nsDate;
    }
}

(<PropertyMetadata>DateRangePickerBase.maxDateProperty.metadata).onSetNativeValue = onMaxDatePropertyChanged;

function onMinDatePropertyChanged(data: PropertyChangeData) {
    let picker = <DateRangePicker>data.object;

    if (picker.ios) {
        picker.ios.minimumDate = NSDate.dateWithTimeIntervalSince1970((<Date>data.newValue).getTime() / 1000);
    }
}

(<PropertyMetadata>DateRangePickerBase.minDateProperty.metadata).onSetNativeValue = onMinDatePropertyChanged;

function onTextColorPropertyChanged(data: PropertyChangeData) {
    let picker = <DateRangePicker>data.object;
    if (picker.ios && data.newValue) {
        picker.ios.textColor = (<Color>data.newValue).ios;
    }
}

(<PropertyMetadata>DateRangePickerBase.textColorProperty.metadata).onSetNativeValue = onTextColorPropertyChanged;

function onSelectionColorPropertyChanged(data: PropertyChangeData) {
    let picker = <DateRangePicker>data.object;
    if (picker.ios && data.newValue) {
        picker.ios.selectionColor = (<Color>data.newValue).ios;
    }
}

(<PropertyMetadata>DateRangePickerBase.selectionColorProperty.metadata).onSetNativeValue = onSelectionColorPropertyChanged;

function onStartDatePropertyChanged(data: PropertyChangeData) {
    let picker = <DateRangePicker>data.object;
    if (picker.ios && data.newValue) {
        picker._setNativeStartDate(data.newValue);
    }
}

(<PropertyMetadata>DateRangePickerBase.startDateProperty.metadata).onSetNativeValue = onStartDatePropertyChanged;

export class DateRangePicker extends DateRangePickerBase {
    
    private _ios: any;
    private static MIN_HEIGHT : number = 330;
    private _delegate : DSLCalendarViewDelegateImpl;
    
    constructor() {
        super();
        this._ios = DSLCalendarView.alloc().initWithFrame(CGRectMake(0,0, 320, DateRangePicker.MIN_HEIGHT));
        this._ios.delegate = this._delegate = DSLCalendarViewDelegateImpl.initWithOwner(new WeakRef(this)); 
    }
    
    get ios() {
        return this._ios;
    }
    
    public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
        let width = layout.getMeasureSpecSize(widthMeasureSpec);
        let widthMode = layout.getMeasureSpecMode(widthMeasureSpec);

        let height = layout.getMeasureSpecSize(heightMeasureSpec);
        let heightMode = layout.getMeasureSpecMode(heightMeasureSpec);
        
        let newHeight = height;
        
        if (heightMode != layout.EXACTLY) {
            newHeight = DateRangePicker.MIN_HEIGHT;
            heightMode = layout.EXACTLY;
        }
        
        let heightAndState = View.resolveSizeAndState(height, newHeight, heightMode, 0);
        this.setMeasuredDimension(widthMeasureSpec, heightAndState);
    }
    
    public onSelectionRangeChanged(startDate: Date, endDate: Date) {
        
    }
    
    public notifyPositionCallout(dayView : any) {
        let args : EventData = {eventName : DateRangePickerBase.draggedToEvent, object: this, dayView:dayView };
        this.notify(args);
    }
    
    public _setNativeStartDate(date : Date) : void {
        console.log("_setNativeStartDate");
        let startDateComponents = NSCalendar.currentCalendar().componentsFromDate(NSYearCalendarUnit | NSMonthCalendarUnit | NSDayCalendarUnit | NSCalendarCalendarUnit | NSWeekdayCalendarUnit, NSDate.dateWithTimeIntervalSince1970(date.getTime()/1000.0));
        let endDateComponents = NSCalendar.currentCalendar().componentsFromDate(NSYearCalendarUnit | NSMonthCalendarUnit | NSDayCalendarUnit | NSCalendarCalendarUnit | NSWeekdayCalendarUnit, NSDate.dateWithTimeIntervalSince1970(this.endDate.getTime()/1000.0));
        this.ios.selectedRange = DSLCalendarRange.alloc().initWithStartDayEndDay(startDateComponents, endDateComponents);
    }
}

class DSLCalendarViewDelegateImpl extends NSObject {
    private _owner : WeakRef<DateRangePicker>;
    
    public static ObjCProtocols = [DSLCalendarViewDelegate];
    
    public static initWithOwner(owner: WeakRef<DateRangePicker>): DSLCalendarViewDelegateImpl {
        let handler = <DSLCalendarViewDelegateImpl>DSLCalendarViewDelegateImpl.new();
        handler._owner = owner;
        return handler;
    }
    
    public calendarViewDidSelectRange(nativeCalendarView : any /*DSLCalendarView*/, selectedRange: any /*DSLCalendarRange */) : void {
        let owner = this._owner.get();
        if (owner) {
            let startDate = NSCalendar.currentCalendar().dateFromComponents(selectedRange.startDay);
            let endDate = NSCalendar.currentCalendar().dateFromComponents(selectedRange.endDay);
            owner._onPropertyChangedFromNative(DateRangePickerBase.startDateProperty, startDate);
            owner._onPropertyChangedFromNative(DateRangePickerBase.endDateProperty, endDate);
        }
    }

    public calendarViewPositionCalloutViewForDayView(nativeCalendarView : any /*DSLCalendarView*/, dayView: any /*DSLCalendarDayView*/): void {
        let owner = this._owner.get();
        if (owner) {
            owner.notifyPositionCallout(dayView);
        }
    }
}