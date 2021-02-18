let date, dateString, timeZone, 
    hrs, hrsTwelveHrVersion, mins, scnds, clockVersion, partOfDay;
const timeContainer = document.getElementById("time");
const timeVersionChangers = document.querySelectorAll(".timeVersionChanger");
const timeVersionChangerContainer = document.getElementById("timeVersionChangerContainer");
const timeVersionChangersArray = Array.from(timeVersionChangers);
const timeZoneNode = document.getElementById("timeZone");
const customizerNode = document.getElementById("customizer");
const colorsDropdownNode = document.getElementById("colorsDropdwn");
const fontsDropdownNode = document.getElementById("fontsDropdwn");
const colors = [
  {name: "Golden Sand", hslCode: "hsl(45, 78%, 67%)"},
  {name: "Coral", hslCode: "hsl(16, 100%, 66%)"},
  {name: "Wild Watermelon", hslCode: "hsl(351, 100%, 71%)"},
  {name: "Lime Soap", hslCode: "hsl(139, 76%, 71%)"},
  {name: "French Sky Blue", hslCode: "hsl(219, 100%, 72%)"}
];
let selectedColor = colors[0];
const fonts = ["Arial", "Georgia", "Garamond", "Helvetica", "Tahoma",
  "Times New Roman", "Verdana"];
const mainContainerNode = document.getElementById("mainContainer");

function changeTimeVersion(clickedId){

  if(clickedId == "twelveHourTime"){
    hrsTwelveHrVersion = toTwelveHour(hrs);
  }
  else {
    hrs = toMilitary(hrsTwelveHrVersion);
  }

  showTime();
}

function toTwelveHour(hrs) {
  let convertedHrs;

  if(hrs == 0){
    convertedHrs = 12;
  } 
  else if (hrs > 12){
    convertedHrs = hrs - 12;
  }
  else {
    convertedHrs = hrs;   
  }

  return convertedHrs;
  
}

function toMilitary(hrs){
  let convertedHrs; 

  if(partOfDay == "AM" && hrs == 12){
    convertedHrs = 0;
  }
  else if (partOfDay == "AM" || (partOfDay == "PM" && hrs == 12)){
    convertedHrs = hrs;
  } else {
    convertedHrs = hrs + 12;
  }

  return convertedHrs; 

}

function showTime() {
  if(clockVersion === "twelveHourTime"){
    timeContainer.textContent = `${hrsTwelveHrVersion} : ${mins} : ${scnds} ${partOfDay}`;
  }
  else {
    timeContainer.textContent = `${hrs} : ${mins} : ${scnds} ${partOfDay}`;
  }
  
}

function setColor(color){

  hslString = color.hslCode.split(" ");
  // hslLightnessString = hslString[2];

  let lightness = "";
  
  if(hrs < 3){
    lightness = "30%)";
  }
  else if(hrs < 6){
    lightness = "40%)";
  } 
  else if(hrs < 18){
    lightness = hslString[2];
  }
  else{
    lightness = "25%)";
  }

  hslString[2] = lightness;

  hslString = hslString.join(" ");

  return hslString;

}

function changeBackgroundColor(){
  let newColor = setColor(selectedColor);
  mainContainerNode.style.backgroundColor = newColor;
}


function calculateTime(){
  date = new Date(),
  hrs = date.getHours(),
  mins = date.getMinutes(),
  scnds = date.getSeconds();

  if(hrs <= 11){
    partOfDay = 'AM';   
  }
  else {
    partOfDay = 'PM';  
  }

  if(clockVersion == "twelveHourTime"){
    hrsTwelveHrVersion = toTwelveHour(hrs);
  }

  showTime();

  changeBackgroundColor();

}

function showTimeZone(){
  dateString = new Date().toString();
  timeZone = dateString.split(" ").slice(5, dateString.length).join(" ");
  timeZoneNode.textContent = timeZone;
}


timeVersionChangers.forEach(
  function(timeVersionChanger){
    timeVersionChanger.addEventListener("click", function(event){
    
      //get the index of the timeVersion clicked    
      let indexClicked = timeVersionChangersArray.indexOf(event.target);

      //loop through all the timeVersions and remove the "clicked" class
      //from the options that weren't clicked to enable them to be clicked
      for(let i = 0; i < timeVersionChangers.length; ++i){
        if(indexClicked == i){
          continue;
        }
        else{
          timeVersionChangers[i].classList.remove("clicked");  
        }
      }

      //add the "clicked" class to the timeVersion clicked by the user
      event.target.classList.add("clicked");

      clockVersion = event.target.id;
      changeTimeVersion(event.target.id);

    });     
  }
);

colors.forEach(function(color){
  let option = document.createElement("div");
  option.textContent = color.name + " ";
  option.id = color.name;

  let colorSample = document.createElement("span");

  colorSample.style.backgroundColor = color.hslCode;
  colorSample.className = "colorSampler";

  option.classList.add("listItems");

  option.append(colorSample);

  option.addEventListener("click", function(event){

    let clickedColor = event.target.id;

    for(let i = 0; i < colors.length; ++i){
      if(colors[i].name === clickedColor){
        selectedColor = colors[i];
        break;
      }
    }
    
    changeBackgroundColor();
  });

  colorsDropdownNode.append(option);
});

fonts.forEach(function(font){
  let option = document.createElement("div");

  option.classList.add("listItems");

  option.textContent = font;
  option.style.fontFamily = font;

  option.addEventListener("click", function(){
    timeContainer.style.fontFamily = option.style.fontFamily;
    timeZoneNode.style.fontFamily = option.style.fontFamily;
  });

  fontsDropdwn.append(option);
});

clockVersion = "twelveHourTime";
calculateTime();
showTimeZone();
setInterval(calculateTime, 1000);

