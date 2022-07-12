let savedEvents = [];
let events = {};

// create and edit events //
const createEvent = (rowId) => {
   let textAreaEl = $("<textarea>");
   textAreaEl.val("New Event");

   textAreaEl.focus();

   $("#" + rowId).append(textAreaEl);

};

const editEvent = rowId => {
    let eventEl = $("#"+rowId).children();
    let eventText = eventEl.text();
    let newEventEl = $("<textarea>").text(eventText);
    eventEl.replaceWith(newEventEl);
    newEventEl.focus();
};

// save and load events //
const saveEvent = () => {
    localStorage.setItem("events", JSON.stringify(savedEvents));
};


const loadEvents = () => {
    savedEvents = JSON.parse(localStorage.getItem("events"));
    if(!savedEvents) {
        savedEvents = [];
    }
    $.each(savedEvents, function(index) {
        let eventText =savedEvents[index].eventVal;
        let rowId = savedEvents[index].rowId;
        let eventEl = $("<p>").text(eventText);
        
        $(".event#"+ rowId).append(eventEl);
    });
};

// save button //
const saveButton = rowId => {
    let eventEl = $("#" + rowId + " textarea");
    let eventText = eventEl.val();

    let savedEventEl = $("<p>").text(eventText);
    
    let updatedEvent = eventEl.replaceWith(savedEventEl)
    let updatedVal = updatedEvent.val();
    if (updatedVal) {
        eventObjHandler(updatedVal, rowId);
        
        for(i=0; i < savedEvents.length; i++) {
            if(savedEvents[i].rowId === rowId) {
                savedEvents.splice(i, 1);
                
            } 
        }
       
    }
    savedEvents.push(events);
    saveEvent();
};

const eventObjHandler = (updatedVal,rowId) => {
    events = {
        eventVal: updatedVal,
        rowId: rowId
    }
};

// click on events function //
$(".event").on("click", function() {
    let length = $(this).html().length;
    let rowId = $(this).attr("id");
    if(length == 0) {
        createEvent(rowId);
    } 
    else {
        editEvent(rowId);
    } 
});


$(".saveBtn").on("click", function() {
    let rowId = $(this).siblings()[1].getAttribute("id");
    saveButton(rowId);
});

loadEvents();


// adding classes for events based on time //
let today = moment().format('dddd');
$("#currentDay").text(today);
let currentHour = moment().format('HH');

for(let i =9; i <=17; i++) {
    const events = $("#" + i);
    const rowId = events.attr("id");
    if(currentHour > i) {
        events.addClass("past");
    } else if(currentHour == i) {
        events.addClass("present");
    } else if(currentHour < i) {
        events.addClass("future");
    };
};