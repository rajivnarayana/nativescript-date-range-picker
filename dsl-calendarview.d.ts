declare module "nativescript-date-range-picker" {
    
    import { Property } from "ui/core/dependency-observable";
    import { Color } from "color";
    import { EventData } from "data/observable";
    
    export class DateRangePicker {
        
        public static startDateProperty : Property;
        public static endDateProperty : Property;
        public static maxDateProperty : Property;
        public static minDateProperty : Property;
        
        public static textColorProperty : Property;
        public static selectionColorProperty: Property;
        
        public static draggedToEvent : string;
        
        public static startDate : Date; 
        public static endDate : Date;
                
        public static minDate : Date;
        public static maxDate : Date;
        
        public static textColor : Color;
        public static selectionColor : Color;
        
        public ios: any; /* DSLCalendarView */
    }
    
    export interface DateRangeEventData extends EventData {
        dayView : any;
    }
}