export const printTime = (timestamp) => {
    const dateInfo = new Date(timestamp);

    var totalTime = dateInfo.getTime();

    var currentTotalTime = Date.now();

    var timeDifference = currentTotalTime - totalTime;

    var secondDifference = timeDifference / 1000;
    var minuteDifference = secondDifference / 60;
    var hourDifference = minuteDifference / 60;
    var dayDifference = hourDifference / 24;
    var monthDifference = dayDifference / 30;
    var yearDifference = monthDifference / 12;

    let displayTime = "";
    if (secondDifference < 60) {
      displayTime = "Just recently";
    }
    else if (minuteDifference >= 1 && minuteDifference < 60) {
      minuteDifference = Math.floor(minuteDifference);
      if (minuteDifference == 1) {
        displayTime = minuteDifference + " minute";
      }
      else {
        displayTime = minuteDifference + " minutes";
      }
    }
    else if (hourDifference >= 1 && hourDifference < 24) {
      hourDifference = Math.floor(hourDifference);
      if (hourDifference == 1) {
        displayTime = hourDifference + " hour";
      }
      else {
        displayTime = hourDifference + " hours";
      }
    }
    else if (dayDifference >= 1 && dayDifference < 31) {
      dayDifference = Math.floor(dayDifference);
      if (dayDifference == 1) {
        displayTime = dayDifference + " day";
      }
      else {
        displayTime = dayDifference + " days";
      }
    }
    else if (monthDifference >= 1 && monthDifference < 12) {
      monthDifference = Math.floor(monthDifference);
      if (monthDifference == 1) {
        displayTime = monthDifference + " month";
      }
      else {
        displayTime = monthDifference + " months";
      }
    }
    else if (yearDifference >= 1) {
      yearDifference = Math.floor(yearDifference);
      if (yearDifference == 1) {
        displayTime = yearDifference + " year";
      }
      else {
        displayTime = yearDifference + " years";
      }
    }

    return displayTime;
}