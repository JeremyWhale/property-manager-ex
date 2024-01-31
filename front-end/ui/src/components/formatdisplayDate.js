export default function formatDisplayDate(date){
    //yyyy-mm-dd
    const dateParts = date.split('-')

    return (`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`)
};