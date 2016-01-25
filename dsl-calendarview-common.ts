import { View } from "ui/core/view";
import { DateRangePicker as DateRangePickerDefinition } from "nativescript-date-range-picker";
import { Property, PropertyMetadataSettings } from "ui/core/dependency-observable";
import { Color } from "color";
import { converters } from "ui/styling";
import { PropertyMetadata } from "ui/core/proxy";

let DATE_RANGE_PICKER: string = "DateRangePicker";

export class DateRangePicker extends View implements DateRangePickerDefinition {
    
    public static startDateProperty = new Property("startDate", DATE_RANGE_PICKER, new PropertyMetadata(new Date()));
    public static endDateProperty = new Property("endDate", DATE_RANGE_PICKER, new PropertyMetadata(new Date()));
    public static maxDateProperty = new Property("maxDate", DATE_RANGE_PICKER, new PropertyMetadata(undefined));
    public static minDateProperty = new Property("minDate", DATE_RANGE_PICKER, new PropertyMetadata(undefined));

    public static textColorProperty = new Property("textColor", DATE_RANGE_PICKER,
         new PropertyMetadata(new Color("black"), 
            PropertyMetadataSettings.None,
            undefined,
            Color.isValid), 
            converters.colorConverter);
    public static selectionColorProperty = new Property("selectionColor", DATE_RANGE_PICKER,
        new PropertyMetadata(new Color("purple"), 
            PropertyMetadataSettings.None,
            undefined,
            Color.isValid), 
            converters.colorConverter); 
    
    public static draggedToEvent : string = "draggedTo";
    
    get startDate() {
        return this._getValue(DateRangePicker.startDateProperty);
    }
    
    set startDate(startDate : Date) {
        this._setValue(DateRangePicker.startDateProperty, startDate);
    }
    
    get endDate() {
        return this._getValue(DateRangePicker.endDateProperty);
    }
    
    set endDate(endDate : Date) {
        this._setValue(DateRangePicker.endDateProperty, endDate);
    }
    
    get maxDate(): Date {
        return this._getValue(DateRangePicker.maxDateProperty);
    }
    
    set maxDate(value: Date) {
        this._setValue(DateRangePicker.maxDateProperty, value);
    }

    get minDate(): Date {
        return this._getValue(DateRangePicker.minDateProperty);
    }
    
    set minDate(value: Date) {
        this._setValue(DateRangePicker.minDateProperty, value);
    }
    
    set textColor(value: Color) {
        this._setValue(DateRangePicker.textColorProperty, value);
    }
    
    set selectionColor(value: Color) {
        this._setValue(DateRangePicker.selectionColorProperty, value);
    }
    
    get textColor() {
        return this._getValue(DateRangePicker.textColorProperty);
    }
    
    get selectionColor() {
        return this._getValue(DateRangePicker.selectionColorProperty);
    }
}