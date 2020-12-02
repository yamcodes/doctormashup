import * as Tone from "tone";

const elements = [
  {
    note: "G4",
    x: 250,
    y: 60,
    radius: 30,
    color: 'rgb(255,0,0)'
  },
  {
    note: "E4",
    x: 325,
    y: 90,
    radius: 30,
    color: 'rgb(0,0,255)'
  },
  {
    note: "D4",
    x: 380,
    y: 155,
    radius: 30,
    color: 'rgb(0,255,0)'
  },
  {
    note: "G4",
    x: 390,
    y: 227,
    radius: 30,
    color: 'rgb(0,0,0)'
  },
  {
    note: "E4",
    x: 370,
    y: 295,
    radius: 30,
    color: 'rgb(0,0,0)'
  },
  {
    note: "C4",
    x: 315,
    y: 345,
    radius: 30,
    color: 'rgb(0,0,0)'
  },
  {
    note: "A3",
    x: 245,
    y: 360,
    radius: 30,
    color: 'rgb(0,0,0)'
  },
  {
    note: "A3",
    x: 176,
    y: 345,
    radius: 30,
    color: 'rgb(0,0,0)'
  },
  {
    note: "C4",
    x: 125,
    y: 290,
    radius: 30,
    color: 'rgb(0,0,0)'
  },
  {
    note: "F4",
    x: 100,
    y: 215,
    radius: 30,
    color: 'rgb(0,0,0)'
  },
  {
    note: "E4",
    x: 115,
    y: 150,
    radius: 30,
    color: 'rgb(0,0,0)'
  },
  {
    note: "D4",
    x: 175,
    y: 90,
    radius: 30,
    color: 'rgb(0,255,0)'
  },
];


const synth = new Tone.PolySynth();
synth.toDestination();

window.addEventListener('load', () => {
  synth.toDestination()
  updateListeners()
  draw()
  
})

function updateListeners() {
  /**
   * Listeners Implementation
   */
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

  canvas.addEventListener("touchstart", function(e) {
    sendUserEvent(e.touches[0], "note-on")
  }, false);

  canvas.addEventListener("touchend", function (e) {
    sendUserEvent(e.touches[0], "note-off")
  }, false);
}

function isIntersect(point, element) {
  return Math.sqrt((point.x-element.x) ** 2 + (point.y - element.y) ** 2) < element.radius;
}

function sendUserEvent(event, type) {
  const pos = getCurrentPosition(event);
  elements.forEach(element => {
    if (isIntersect(pos, element)) {
      if (type === 'note-on') {
        noteOn(element.note)
      } else {
        noteOff(element.note)
      }
    }
  });
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
