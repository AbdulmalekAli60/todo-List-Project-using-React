export default function getDateAndTime() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  let hours = today.getHours();
  let minutes = String(today.getMinutes()).padStart(2, "0");
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  today = dd + "/" + mm + "/" + yyyy + " " + hours + ":" + minutes + " " + ampm;
  return today;
}
