function formateDate(datetime) {
	// let  = "2019-11-06T16:00:00.000Z"
	let d = new Date(datetime);
	let formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate() 
	+ " " + addDateZero(d.getHours()) + ":" + addDateZero(d.getMinutes()));
	return formatdatetime;
}

function addDateZero(num) {
	return (num < 10 ? "0" + num : num);
}
export default formateDate