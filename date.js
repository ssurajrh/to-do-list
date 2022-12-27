module.exports=getDate;

function getDate(){
  var today=new Date();
  var currentDay=today.getDay();
  var options={
    weekday:"long",
    day:"numeric",
    month:"long"
  };
  return today.toLocaleDateString("en-US",options);;
}
