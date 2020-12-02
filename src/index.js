import * as Tone from "tone";

const elements = [
  {
    note: "G4",
    character: 1,
    x: 250,
    y: 60,
    radius: 30,
    color: 'rgb(255,0,0)'
  },
  {
    note: "E4",
    character: 2,
    x: 325,
    y: 90,
    radius: 30,
    color: 'rgb(0,0,255)'
  },
  {
    note: "D4",
    character: 3,
    x: 380,
    y: 155,
    radius: 30,
    color: 'rgb(0,255,0)'
  },
  {
    note: "G4",
    character: 4,
    x: 390,
    y: 227,
    radius: 30,
    color: 'rgb(0,0,0)'
  },
  {
    note: "E4",
    character: 5,
    x: 370,
    y: 295,
    radius: 30,
    color: 'rgb(0,0,0)'
  },
  {
    note: "C4",
    character: 6,
    x: 315,
    y: 345,
    radius: 30,
    color: 'rgb(0,0,0)'
  },
  {
    note: "A3",
    character: 7,
    x: 245,
    y: 360,
    radius: 30,
    color: 'rgb(0,0,0)'
  },
  {
    note: "A3",
    character: 8,
    x: 176,
    y: 345,
    radius: 30,
    color: 'rgb(0,0,0)'
  },
  {
    note: "C4",
    character: 9,
    x: 125,
    y: 290,
    radius: 30,
    color: 'rgb(0,0,0)'
  },
  {
    note: "F4",
    character: 10,
    x: 100,
    y: 215,
    radius: 30,
    color: 'rgb(0,0,0)'
  },
  {
    note: "E4",
    character: 11,
    x: 115,
    y: 150,
    radius: 30,
    color: 'rgb(0,0,0)'
  },
  {
    note: "D4",
    character: 12,
    x: 175,
    y: 90,
    radius: 30,
    color: 'rgb(0,255,0)'
  },
];

const characters = [
  "Rafiki lifts Simba", "Simba, Timon and Pumbaa", "Simba, Nala and Zuzu as children",
  "Mufasa and Scar", "Scar and Simba", "Simba, Nala, Rafiki and Kiara", "The Hyenas", "Scar",
  "Nala", "Mufasa and Scar on the cliff", "A tiger", "Simba, Nala, Zuzu, Timon and Pumbaa"
]

let currentCharacter = 0

const synth = new Tone.PolySynth();
synth.toDestination();

window.addEventListener('load', _ => {
  synth.toDestination();
  updateListeners();
  draw();
  advanceCharacter()
  
})

function updateListeners() {
  /**
   * Listeners Implementation
   */
}
function advanceCharacter() { 
  currentCharacter++;
  if (currentCharacter>13) currentCharacter=12;
  document.getElementById("character").textContent=characters[currentCharacter-1];
}
function draw() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext('2d');
  elements.forEach((element,i) => {
    //ctx.strokeStyle = element.color;
    let base_image = new Image();
    base_image.src = 'imag/'+(i+1)+'.jfif';
    base_image.onload = function(){
      ctx.save();
      ctx.beginPath();
      ctx.arc(element.x, element.y, 30, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(base_image, element.x-30, element.y-30, 60, 60);
      ctx.beginPath();
      ctx.arc(0, 0, 30, 0, Math.PI * 2, true);
      ctx.clip();
      ctx.closePath();
      ctx.restore();
    }
    //ctx.fill();
  });
  handleUserEvents(canvas)
}


function handleUserEvents(canvas) {
  canvas.onmousedown = function(e) { 
    sendUserEvent(e, "note-on") 
  };
  canvas.onmouseup = function(e) { 
    sendUserEvent(e, "note-off") 
  };
  canvas.onmousemove = function(e) { 
    sendUserEvent(e, "all-notes-off") 
  };

  canvas.addEventListener("touchstart", function(e) {
    sendUserEvent(e.touches[0], "note-on")
  }, false);

  canvas.addEventListener("touchend", function (e) {
    sendUserEvent(e.touches[0], "note-off")
  }, false);
}
function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}
function isIntersect(point, element) {
  const relativeElement = { 
    x: getOffset(document.getElementById("table-main")).left + element.x+3,
    y: getOffset(document.getElementById("table-main")).top + element.y+3 
  };
  return Math.sqrt((point.x-relativeElement.x) ** 2 + (point.y - relativeElement.y) ** 2) < element.radius;
}

function sendUserEvent(event, type) {
  const pos = getCurrentPosition(event);
  let intersected = false;
  elements.forEach(element => {
    if (isIntersect(pos, element)) {
      intersected = true;
      switch (type)
      {
        case 'note-on':
          noteOn(element.note);
          if (element.character==currentCharacter) {
            advanceCharacter();

          }
        break;
        case 'note-off':
          noteOff(element.note);
        break;
        default:
        break;
      }
    }
  });
  if (!intersected) synth.releaseAll();
}

function getCurrentPosition(event) {
  return {
    x: event.clientX,
    y: event.clientY
  };
}

function noteOn(note) {
  synth.triggerAttack(note);
} 

function noteOff(note) {
  synth.triggerRelease(note);
}
