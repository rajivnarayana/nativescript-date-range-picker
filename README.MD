# NativeScript Date range picker plugin

An iOS plugin for choosing a date range from a calendar. This is built on top of native ios library by [PeteC](https://github.com/PeteC/DSLCalendarView).  

## Installation

Run the following command from the root of your project:

```
$ tns plugin add nativescript-date-range-picker
```

This command automatically installs the necessary files, as well as stores nativescript-date-range-picker as a dependency in your project's `package.json` file.

## Examples

The code below creates a date range picker in xml with text color for all the date labes as #AA0000 (~red) and selection color as #0000AA (~blue).

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" loaded="pageLoaded" xmlns:tools="nativescript-date-range-picker">
  <StackLayout>
    <tools:DateRangePicker textColor="#AA0000" selectionColor="#0000AA" draggedTo="onUserDraggedTo" />
  </StackLayout>
</Page>

```
The following code listen to drag events

```javascript
exports.onUserDraggedTo = function(eventData) {
    console.log(eventData.dayView);
}
```

## Screen Shots
<img src="https://raw.githubusercontent.com/rajivnarayana/nativescript-date-range-picker/master/ScreenShot.png" width="320"/>

