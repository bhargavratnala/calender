let date = new Date();
let curYear = date.getFullYear();
let year = curYear;
let selectYear;
let curMonth = date.getMonth();
let month = curMonth;
let curDate = date.getDate();
let dateFrame = document.getElementById("date");
let monthNode = document.getElementById("month");
let yearNode = document.getElementById("year");
let yearBoard = document.getElementById("year-board");
let yearFrame = document.getElementById("year-frame");
let mainFrame = document.getElementById("main-frame");
let monthFrame = document.getElementById("month-frame");
mainFrame.style.display = "block";
let rightArrowMonth = document.getElementById("right-arrow-month");
let leftArrowMonth = document.getElementById("left-arrow-month");
let rightArrowYear = document.getElementById("right-arrow-year");
let leftArrowYear = document.getElementById("left-arrow-year");
let yearDrop = document.getElementById("year-drop");
rightArrowMonth.addEventListener("click", loadNextDate);
leftArrowMonth.addEventListener("click", loadPrevDate);
rightArrowYear.addEventListener("click", loadNextYear);
leftArrowYear.addEventListener("click", loadPrevYear);
window.addEventListener("keydown", e=>{
    if(mainFrame.style.display == "block")
    {
        if(e.key == "ArrowLeft")
        loadPrevDate();
        else if(e.key == "ArrowRight")
        loadNextDate();
    }
    else if(yearFrame.style.display == "block")
    {
        if(e.key == "ArrowLeft")
        loadPrevYear();
        else if(e.key == "ArrowRight")
        loadNextYear();
    }
});
yearDrop.addEventListener("click", ()=>{
    mainFrame.style.display = "none";
    yearFrame.style.display = "block";
})
let monDict = {0:"Jan",1:"Feb",2:"Mar",3:"Apr",4:"May",5:"June",6:"July",7:"Aug",8:"Sep",9:"Oct",10:"Nov",11:"Dec"}
function prevMonth(){
    let retDate;
    if(month==0)
    retDate =  new Date(year-1, 11, 0);
    else
    retDate =  new Date(year, month, 0);
    return retDate;
}
function loadDate(){
    let prevEnd = prevMonth().getDate();
    let presDay = date.getDay() - curDate%7 + 1;
    if(presDay < 0)
    presDay = 7 + presDay;
    let i = 0;
    let n = new Date(year, month+1,0).getDate();
    while(i<n+presDay | i%7!=0){
        let node = document.createElement("li");
        if(i<presDay)
        {
            node.classList.add("non-main");
            node.innerHTML = prevEnd - presDay + i + 1;
        }
        else if(i<n+presDay){
            node.innerHTML = i-presDay+1;
            if(i-presDay+1 == curDate & month == curMonth & year==curYear)
            node.classList.add("present");
        }
        else{
            node.classList.add("non-main");
            node.innerHTML = i-n-presDay+1;
        }
        if(i%7==0)
        node.classList.add("holiday");
        dateFrame.append(node);
        i++;
    }
    monthNode.innerHTML = monDict[month];
    yearNode.innerHTML = year;
}
function loadNextDate(){
    dateFrame.innerHTML = "";
    month++;
    if(month > 11)
    {
        month = 0;
        year++;
    }
    if(month == curMonth & year == curYear)
    date = new Date();
    else
    date = new Date(year, month, 1);
    curDate = date.getDate();
    loadDate();
}
function loadPrevDate(){
    dateFrame.innerHTML = "";
    month--;
    if(month < 0)
    {
        month = 11;
        year--;
    }
    if(month == curMonth & year == curYear)
    date = new Date();
    else
    date = new Date(year, month, 1);
    curDate = date.getDate();
    loadDate();
}
function loadYear(year){
    yearBoard.innerHTML = "";
    for(i = year-12; i<year+13; i++)
    {
        let node = document.createElement("li");
        node.innerHTML = i;
        node.setAttribute("onclick", "monthSelect("+ i +")");
        yearBoard.append(node);
    }
}
function loadNextYear(){
    year += 25;
    loadYear(year);
}
function loadPrevYear(){
    year -= 25;
    loadYear(year);
}
function monthSelect(year){
    monthFrame.style.display = "block";
    yearFrame.style.display = "none";
    selectYear = year;
}
function loadSelectDate(mon)
{
    if(selectYear==curYear & mon == curMonth)
    date = new Date();
    else
    date = new Date(selectYear, mon);
    year = selectYear;
    month = mon;
    curDate = date.getDate();
    monthFrame.style.display = "none";
    mainFrame.style.display = "block";
    dateFrame.innerHTML = "";
    loadDate();
}
loadDate();
loadYear(year);
