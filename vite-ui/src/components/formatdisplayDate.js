export default function formatDisplayDate(date){
    if (date.length < 1){
        return ''
    }
    else {
        //yyyy-mm-dd
        const dateParts = date.split('-')

        return (`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`)
    }
};