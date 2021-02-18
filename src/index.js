import * as Tone from "tone";
const test = "nothing";
const elements = [{
    note: "play-all",
    character: 1,
    track: new Audio("tracks/rise/m-accompaniment.wav"),
    playing: false,
    x: 250,
    y: 60,
    radius: 30,
    color: 'rgb(0,255,0)'
  },
  {
    note: "v-rise",
    character: 2,
    track: new Audio("tracks/rise/m-vocals.wav"),
    playing: false,
    x: 325,
    y: 90,
    radius: 30,
    color: 'rgb(0,255,0)'
  },
  {
    note: "v-allfallsdown",
    track: new Audio("tracks/all falls down/m-vocals.wav"),
    playing: false,
    character: 3,
    x: 380,
    y: 155,
    radius: 30,
    color: 'rgb(0,255,0)'
  },
  {
    note: "v-heymama",
    character: 4,
    track: new Audio("tracks/heymama/m-vocals.wav"),
    playing: false,
    x: 390,
    y: 227,
    radius: 30,
    color: 'rgb(0,255,0)'
  },
  {
    note: "v-impossible",
    character: 5,
    track: new Audio("tracks/impossible/m-vocals.wav"),
    playing: false,
    x: 370,
    y: 295,
    radius: 30,
    color: 'rgb(0,255,0)'
  },
  {
    note: "v-lockedaway",
    character: 6,
    track: new Audio("tracks/locked away/m-vocals.wav"),
    playing: false,
    x: 315,
    y: 345,
    radius: 30,
    color: 'rgb(0,255,0)'
  },
  {
    note: "v-onecallaway",
    character: 7,
    track: new Audio("tracks/one call away/m-vocals.wav"),
    playing: false,
    x: 245,
    y: 360,
    radius: 30,
    color: 'rgb(0,255,0)'
  },
  {
    note: "v-stitches",
    character: 8,
    track: new Audio("tracks/stitches/m-vocals.wav"),
    playing: false,
    x: 176,
    y: 345,
    radius: 30,
    color: 'rgb(0,255,0)'
  },
  {
    note: "v-treatyoubetter",
    character: 9,
    track: new Audio("tracks/treat you better/m-vocals.wav"),
    playing: false,
    x: 125,
    y: 290,
    radius: 30,
    color: 'rgb(0,255,0)'
  },
  // {
  //   note: "v-uandi",
  //   character: 10,
  //   track: new Audio("tracks/uandi/vocals.wav"),
  //   playing: false,
  //   x: 100,
  //   y: 215,
  //   radius: 30,
  //   color: 'rgb(0,255,0)'
  // },
  // {
  //   note: "v-whateverittakes",
  //   character: 11,
  //   track: new Audio("tracks/whateverittakes/vocals.wav"),
  //   playing: false,
  //   x: 115,
  //   y: 150,
  //   radius: 30,
  //   color: 'rgb(0,255,0)'
  // }
];

const characters = [
  "Rafiki lifts Simba", "Simba, Timon and Pumbaa", "Zuzu, Simba and Nala as cubs",
  "Mufasa and Scar", "Scar and Simba", "Simba, Nala, Rafiki and Kiara", "The Hyenas", "Scar",
  "Nala", "Mufasa and Scar on the cliff", "A tiger", "Simba, Nala, Zuzu, Timon and Pumbaa",
]

const encouragmentsGood = ["Good job!", "Well done!", "Wow, you're amazing!", "You're doing great, keep going!", "You rock!", "You got it!", "WOOOOOW!!!"]
const encouragmentsBad = ["Try again! You can do it!", "Maybe another one?", "Not that one. But you're on the right track!","Sorry... Try again!", "Try something else...", "You're close!", "Almost there", "Not quite..."]

let currentCharacter = 0
let won = false; 
let a_rise = new Audio("tracks/rise/accompaniment.wav");
let v_heymama = new Audio("tracks/heymama/vocals.wav");
let v_allfallsdown = new Audio("tracks/all falls down/vocals.wav");
let v_impossible = new Audio("tracks/impossible/vocals.wav");
let v_lockedaway = new Audio("tracks/locked away/vocals.wav");
let v_onecallaway = new Audio("tracks/one call away/vocals.wav");
let v_rise = new Audio("tracks/rise/vocals.wav");
let v_stitches = new Audio("tracks/stitches/vocals.wav");
let v_treatyoubetter = new Audio("tracks/treat you better/vocals.wav");
let v_uandi = new Audio("tracks/uandi/vocals.wav");
let v_whateverittakes = new Audio("tracks/whateverittakes/vocals.wav");
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
  draw(34);
  advanceCharacter();
})

function updateListeners() {
  /**
   * Listeners Implementation
   */
}

function advanceCharacter() {
  currentCharacter++;
  if (currentCharacter > 12) {
    currentCharacter = 12;
    victory();
    return;
  }
  document.getElementById("character").textContent = characters[currentCharacter - 1];
}

function success() {
  const randomEncouragment = encouragmentsGood[getRandomInt(encouragmentsGood.length)];
  document.getElementById("encouragment").textContent = randomEncouragment;
  document.getElementById("encouragment").style.color = "#72ff72";
  advanceCharacter();
}

function failure() {
  const randomEncouragment = encouragmentsBad[getRandomInt(encouragmentsBad.length)];
  document.getElementById("encouragment").textContent = randomEncouragment;
  document.getElementById("encouragment").style.color = "red";

}

function victory() {
  won = true;
  document.getElementById("character").style.color = "#72ff72";
  document.getElementById("character").textContent = "You found them all!";
  document.getElementById("encouragment").textContent = "Congratulations!!! You're the best!!! You just played the song \"Can you feel the love tonight\" by Elton John.";
  document.getElementById("encouragment").style.color = "#72ff72";
  let iframe = document.createElement("iframe");
  iframe.width = 420;
  iframe.height = 236;
  iframe.style = "border:0px";
  iframe.src = "http://www.youtube.com/embed/25QyCxVkXwQ?autoplay=1";
  iframe.allowFullscreen = true;
  document.getElementById("video-frame").appendChild(iframe);
}

function draw(size) {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext('2d');
  elements.forEach((element, i) => {
    //ctx.strokeStyle = element.color;
    let base_image = new Image();
    base_image.src = 'imag/' + (i + 1) + '.jfif';
    base_image.onload = function () {
      ctx.save();
      ctx.beginPath();
      ctx.arc(element.x, element.y, size, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(base_image, element.x - 60, element.y - 40, 120, 80);
      ctx.beginPath();
      ctx.arc(0, 0, 34, 0, Math.PI * 2, true);
      ctx.clip();
      ctx.closePath();
      ctx.restore();
    }
    //ctx.fill();
  });
  handleUserEvents(canvas)
}


function handleUserEvents(canvas) {
  canvas.onmousedown = function (e) {
    sendUserEvent(e, "note-on")
  };
  canvas.onmouseup = function (e) {
    sendUserEvent(e, "note-off")
  };
  canvas.onmousemove = function (e) {
    sendUserEvent(e, "all-notes-off")
  };

  canvas.addEventListener("touchstart", function (e) {
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
    x: getOffset(document.getElementById("table-main")).left + element.x + 3,
    y: getOffset(document.getElementById("table-main")).top + document.getElementById("table-main").offsetHeight/2 - 205+ element.y + 3
  };
  return Math.sqrt((point.x - relativeElement.x) ** 2 + (point.y - relativeElement.y) ** 2) < element.radius;
}

function sendUserEvent(event, type) {
  const pos = getCurrentPosition(event);
  let intersected = false;
  elements.forEach(element => {
    if (isIntersect(pos, element)) {
      intersected = true;
      switch (type) {
        case 'note-on':
          noteOn(element.note);
          toggleTrack(element);
          if (!won) {
            if (element.character === currentCharacter) {
              success();
            } else {
              failure();
            }
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
  //note.track.play();
}

function toggleTrack(element) {
  if (element.note === "play-all") {
    if (!element.playing) {
      element.playing = true;
      elements[0].track.play();
      elements[0].playing = true;
      elements[0].track.muted = false;
      draw(17);
      for (let i=1;i<elements.length;i++) {
        elements[i].track.play();
        elements[i].playing = false;
        elements[i].track.muted = true;
        //

      }
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
    if (!element.playing)
    {
      element.track.muted = false;
      element.playing = true;
    }
    else {
      element.track.muted = true;
      element.playing = false;
    }
  }
}


function noteOff(note) {
  synth.triggerRelease(note);
}

function getRandomInt(max) { // get random int from 0 (including) to max (not including)
  return Math.floor(Math.random() * Math.floor(max));
}