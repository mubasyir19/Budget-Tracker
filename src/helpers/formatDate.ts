export function formatDate(dateInput: string | Date) {
  if (!dateInput) return "";

  let date: Date;

  if (dateInput instanceof Date) {
    date = dateInput;
  } else {
    date = new Date(dateInput); // ISO string dari backend
  }

  if (isNaN(date.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short", // "Mei", "Agt", "Okt"
    year: "numeric",
  }).format(date);
}
