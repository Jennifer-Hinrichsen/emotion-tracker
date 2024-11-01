import { format, isToday, isYesterday } from "date-fns";

function formatDate(date) {
  const parsedDate = new Date(date);

  if (isToday(parsedDate)) {
    return `Today ${format(parsedDate, "HH:mm")}`;
  } else if (isYesterday(parsedDate)) {
    return `Yesterday ${format(parsedDate, "HH:mm")}`;
  } else {
    return format(parsedDate, "dd.MM.yyyy HH:mm");
  }
}

export default formatDate;
