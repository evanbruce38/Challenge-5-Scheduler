let savedEvents = [];
let events = {};

const createEvent = (rowId) => {
    let textAreaEl = $("<textarea>");
    textAreaEl.val("New Event")

    textAreaEl.focus();

    $("#" + rowId).append(textAreaEl);
 };

 const editEvents = rowId => {
    let eventEl = $("#" + rowId).children();
    let eventText = eventEl.text();
    let newEventEl = $("<textarea>").text(eventText);
    eventEl.replaceWith(newEventEl);
 };

 const saveEvent = () => {

    localStorage.setItem("events", JSON.stringify(savedEvents));
 };

 const loadEvents = () => {
    savedEvents = JSON.parse(localStorage.getItem("events"));
    if(!savedEvents) {
        savedEvents = [];
    }
    $.each(savedEvents, function(index) {
        let eventText = savedEvents[index].eventVal;
        let rowId = savedEvents[index].rowId;
        let eventEl = $("<p>").text(eventText);

        $(".event#" + rowID).append(eventEl);
    });
 };

 const saveButton = rowId => {
    let eventEl = $("#" + rowId + "textarea");
    let eventText = eventEl.val();

    let savedEventEl = $("<p>").text(eventText);

    let updatedEvent = eventEl.replaceWith(savedEventEl);
    let updatedVal = updatedEvent.val();
    if (updatedVal) {
        eventObjHandler(updatedVal, rowId);

        for (i=0, i < savedEvents.length; i++) {
            if(savedEvents[i].rowId === rowId) {
                savedEvents,splice(i, 1);
            }
        }
    }
    savedEvents.push(events);
    saveEvent();
 };
