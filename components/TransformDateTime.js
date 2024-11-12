import { format, isToday, isYesterday } from "date-fns";

export default function formatDate(date) {
  const parsedDate = new Date(date);

  let dateString = "";
  let timeString = "";

  if (isToday(parsedDate)) {
    dateString = "Today";
    timeString = format(parsedDate, "HH:mm");
  } else if (isYesterday(parsedDate)) {
    dateString = "Yesterday";
    timeString = format(parsedDate, "HH:mm");
  } else {
    dateString = format(parsedDate, "dd.MM.yyyy");
    timeString = format(parsedDate, "HH:mm");
  }

  return {
    date: dateString,
    time: timeString,
  };
}
