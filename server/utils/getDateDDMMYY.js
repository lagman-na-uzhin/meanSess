export const getDateDDMMYY = () =>{
    const currentDate = new Date();

    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    return `${currentDay}.${currentMonth}.${currentYear}`
}
