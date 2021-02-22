import * as Tone from "tone";
const BASE_SIZE = 34;
const SMALL_SIZE = 17;
const MEDIUM_SIZE = 23;
const IMAGE_CIRCLE_RADIUS = 150;
let animating = false;
let animatingMode = "default";
let radius = BASE_SIZE;
const hoveredElements = new Set();
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext('2d');
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
const elements = [{
    id: "rise",
    title: "Jonas Blue - Rise ft. Jack & Jack",
    title_short: "Rise",
    type: "accompaniment",
    x: 250, // 250
    y: 60, // 60
    image_filename: "1.jpg",
  },
  {
    id: "rise",
    title: "Jonas Blue - Rise ft. Jack & Jack",
    title_short: "Rise",
    type: "vocals",
    x: 325,
    y: 90,
    image_filename:"2.jpg",
  },
  {
    id: "allfallsdown",
    title: "Alan Walker - All Falls Down ft. Noah Cyrus, Digital Farm Animals & Juliander",
    title_short: "All Falls Down",
    type: "vocals",
    x: 380,
    y: 155,
    image_filename:"3.jpg",
  },
  {
    id: "heymama",
    title: "Jonas Blue - Hey Mama ft. William Singe",
    title_short: "Hey Mama",
    type: "vocals",
    x: 390,
    y: 227,
    image_filename:"4.jpg",
  },
  {
    id: "impossible",
    title: "James Arthur - Impossible",
    title_short: "Impossible",
    type: "vocals",
    x: 370,
    y: 295,
    image_filename:"5.jpg",
  },
  {
    id: "lockedaway",
    title: "R. City - Locked Away ft. Adam Levine",
    title_short: "Locked Away",
    type: "vocals",
    x: 315,
    y: 345,
    image_filename:"6.jpg",
  },/*
  {
    id: "onecallaway",
    title: "Charlie Puth - One Call Away",
    title_short: "One Call Away",
    type: "vocals",
    x: 245,
    y: 360,
    image_filename:"7.jpg",
  },
  {
    id: "stitches",
    title: "Shawn Mendes - Stitches",
    title_short: "Stitches",
    type: "vocals",
    x: 176,
    y: 345,
    image_filename:"8.jpg",
  },
  {
    id: "treatyoubetter",
    title: "Shawn Mendes - Treat You Better",
    title_short: "Treat You Better",
    type: "vocals",
    x: 125,
    y: 290,
    image_filename:"9.jpg",
  },*/
  // {
  //   id: "v-uandi",
  //   character: 10,
  //   track: new Audio("tracks/uandi/vocals.wav"),
  //   playing: false,
  //   x: 100,
  //   y: 215,
  //   radius: 30,
  //   color: 'rgb(0,255,0)'
  // },
  // {
  //   id: "v-whateverittakes",
  //   character: 11,
  //   track: new Audio("tracks/whateverittakes/vocals.wav"),
  //   playing: false,
  //   x: 115,
  //   y: 150,
  //   radius: 30,
  //   color: 'rgb(0,255,0)'
  // }
];

//const player = new Tone.Player("./gummybear.mp3").toMaster();
// play as soon as the buffer is loaded
//player.autostart = true;

const synth = new Tone.PolySynth();
synth.toDestination();
//player.toDestination();

window.addEventListener('load', _ => {
  synth.toDestination();
  //player.toDestination();
  //player.autostart = true;
  //player.toDestination();
  updateListeners();
  draw();
  //drawCircle();
})

function updateListeners() {
  /**
   * Listeners Implementation
   */
}

function draw() {
  elements.forEach((e,i) => {
    //ctx.strokeStyle = element.color;
    e.track = new Audio ("tracks/"+e.id+"/m-"+e.type+".wav");
    e.track.muted = true;
    e.radius = SMALL_SIZE;
    let a = (i*360/elements.length-90)*Math.PI/180
    e.x = canvasWidth/2+ IMAGE_CIRCLE_RADIUS*Math.cos(a);
    e.y = canvasHeight/2+IMAGE_CIRCLE_RADIUS*Math.sin(a);
    e.image = new Image();
    e.image.src = 'image/' + e.image_filename;
    e.image.onload = function () {
      context.save();
      context.beginPath();
      context.arc(e.x, e.y, SMALL_SIZE, 0, Math.PI * 2, true); //ctx.arc(element.x, element.y, size, 0, Math.PI * 2, true);
      context.closePath();
      context.clip();
      context.drawImage(e.image, e.x - 60, e.y - 40, 120, 80);
      context.beginPath();
      context.arc(0, 0, 34, 0, Math.PI * 2, true);
      context.clip();
      context.closePath();
      context.restore();
    }
    //ctx.fill();
  });
  handleUserEvents(canvas);
}

function animateShrink(element){
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  elements.forEach(e => {
    context.save();
    context.beginPath();
    context.arc(e.x, e.y, e.radius, 0, Math.PI * 2, true); //ctx.arc(element.x, element.y, size, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    context.drawImage(e.image, e.x - 60, e.y - 40, 120, 80);
    context.beginPath();
    context.arc(0, 0, 34, 0, Math.PI * 2, true);
    context.clip();
    context.closePath();
    context.restore();
  });
  if (element.radius>SMALL_SIZE) {
    element.radius--;
    requestAnimationFrame(_=>animateShrink(element));
  }
}

function animateGrow(element, maxSize=BASE_SIZE){
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  elements.forEach((e, i) => {
    context.save();
    context.beginPath();
    context.arc(e.x, e.y, e.radius, 0, Math.PI * 2, true); //ctx.arc(element.x, element.y, size, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    context.drawImage(e.image, e.x - 60, e.y - 40, 120, 80);
    context.beginPath();
    context.arc(0, 0, 34, 0, Math.PI * 2, true);
    context.clip();
    context.closePath();
    context.restore();
  });
  if (element.radius<maxSize) {
    element.radius++;
    console.log("Growing " + element.id + " to " + element.radius);
    requestAnimationFrame(_=>animateGrow(element,maxSize));
  }
}

function animateShrinkGrow(element, size=BASE_SIZE){
  if (animating) return;
  animating = true;
  console.log("initiating shrinkgrow with " + element.id + ", size " + size + ", current radius: " + element.radius)
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  elements.forEach((e, i) => {
    context.save();
    context.beginPath();
    if (e === element) console.log("loop radius: " + e.radius + " actual radius: " + element.radius)
    context.arc(e.x, e.y, e.radius, 0, Math.PI * 2, true); //ctx.arc(element.x, element.y, size, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    context.drawImage(e.image, e.x - 60, e.y - 40, 120, 80);
    context.beginPath();
    context.arc(0, 0, 34, 0, Math.PI * 2, true);
    context.clip();
    context.closePath();
    context.restore();
  });
  animating = false;
  if (element.radius<size && animatingMode!== "shrinking") {
    element.radius++;
    console.log("growing " + element.id + " to " + element.radius);
    requestAnimationFrame(_=>animateShrinkGrow(element,size));
    animatingMode = "growing";
    return;
  }
  else if (element.radius>size && animatingMode!== "growing") {
    element.radius--;
    console.log("shrinking " + element.id + " to " + element.radius);
    requestAnimationFrame(_=>animateShrinkGrow(element,size));
    animatingMode="shrinking";
    return;
  }
  animatingMode = "default";
}

function handleUserEvents(canvas) {
  canvas.onmousedown = function (e) {
    sendUserEvent(e, "track-on")
  };
  canvas.onmouseup = function (e) {
    sendUserEvent(e, "track-off")
  };
  canvas.onmousemove = function (e) {
    sendUserEvent(e, "all-tracks-off")
  };
  

  canvas.addEventListener("touchstart", function (e) {
    sendUserEvent(e.touches[0], "track-on")
  }, false);

  canvas.addEventListener("touchend", function (e) {
    sendUserEvent(e.touches[0], "track-off")
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
    x: getOffset(document.getElementById("table-main")).left + element.x + 3,
    y: getOffset(document.getElementById("table-main")).top + document.getElementById("table-main").offsetHeight/2 - 205+ element.y + 3
  };
  return Math.sqrt((point.x - relativeElement.x) ** 2 + (point.y - relativeElement.y) ** 2) < element.radius;
}

function sendUserEvent(event, type) {
  const pos = getCurrentPosition(event);
  let intersected = false;
  elements.forEach(e => {
    if (isIntersect(pos, e)) {
      intersected = true;
      switch (type) {
        case 'track-on':
          trackOn(e);
          toggleTrack(e);
          break;
        case 'track-off':
          trackOff(e);
          break;
        case 'all-tracks-off':
          animateShrinkGrow(e, getCurrentSize(e)+6);
          canvas.style.cursor="pointer";
          break;
        default:
          break;
      }
    }
  });
  if (!intersected) {
    elements.forEach(e=> {
      animateShrinkGrow(e,getCurrentSize(e));
    });
    canvas.style.cursor="default";
  }
}

function getCurrentSize(element) {
  if (!element) return;
  if (element.track.muted) return SMALL_SIZE;
  return BASE_SIZE;
}

function getCurrentPosition(event) {
  return {
    x: event.clientX,
    y: event.clientY
  };
}

function trackOn(element) {
  //element.track.play();
}

function trackOff(element) {
}

function toggleTrack(element) {
  
  if (element.type === "accompaniment") {
    if (element.track.muted) { // "Play All"
      elements[0].track.play();
      elements[0].track.muted = false;
      for (let i=1;i<elements.length;i++) {
        elements[i].track.play();
        //elements[i].track.muted = true;
        //
      }
      animateShrinkGrow(element, getCurrentSize(element));
    }
    // else {
    //   element.playing = false;
    //   elements[0].track.pause();
    //   elements[0].playing = false;
    //   //elements[0].track.muted = false;
    //   for (let i=1;i<elements.length;i++) {
    //     elements[i].track.pause();
    //     //elements[i].playing = false;
    //     //elements[i].track.muted = true;
    //   }
    // }
  }
  else {
    if (element.track.muted) // "Play Vocals"
    {
      animateGrow(element);
      element.track.muted = false;
    }
    else { // "Mute Vocals"
      animateShrink(element);
      element.track.muted = true;
    }
    refreshVocalsList();
  }
}

function refreshVocalsList() {
  let vocals = "";
  elements.forEach(e=>{if(e.type==="vocals" && !e.track.muted) vocals+=", "+e.title;});
  if (vocals==="") vocals = "‎"; //empty character symbol to add space
  else vocals = vocals.substring(2);
  document.getElementsByClassName('vocals content')[0].innerHTML = vocals;
}