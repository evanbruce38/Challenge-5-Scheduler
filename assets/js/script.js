let savedEvents = [];
let events = {};

const createEvent = (rowId) => {
    // create text area
    let textAreaEl = $("<textarea>");
    textAreaEl.val("New Event")

    // highlight text box
    textAreaEl.focus();

    // append text area to selected event
    $("#" + rowId).append(textAreaEl);
 };

 const editEvents = rowId => {
    let eventEl = $("#" + rowId).children();
    let eventText = eventEl.text();
    let newEventEl = $("<textarea>").text(eventText);
    eventEl.replaceWith(newEventEl);
 };

 const saveEvent = () => {
    // save to local storage
    localStorage.setItem("events", JSON.stringify(savedEvents));
 };
