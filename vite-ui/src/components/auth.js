import apiLocation from "./apiLocation";

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = today.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

export default function generateAuthToken(){
  const date = getCurrentDate()

  const key = btoa(`for:${apiLocation}:authon${date}`)

  return key
}