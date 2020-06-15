// object
class Drumkit {
  constructor() {
    this.kick_audio = document.querySelector(".kick_sound");
    this.snare_audio = document.querySelector(".snare_sound");
    this.hihat_audio = document.querySelector(".hihat_sound");
    this.index = 0;
    this.bpm = document.querySelector(".slider").value;
    this.is_playing = false;
    this.playing = null;
  }

  start_or_stop() {
    if (drum.is_playing) {
      clearInterval(this.playing);
      this.is_playing = false;
      document.querySelector(".play_button").innerText = "Play";
    } else {
      const interval = (60 / this.bpm) * 1000;
      this.playing = setInterval(() => {
        this.moving();
      }, interval);
      this.is_playing = true;
      document.querySelector(".play_button").innerText = "Stop";
    }
  }

  moving() {
    let term = this.index % 9;
    console.log(term);
    let pads_set = document.querySelectorAll(`.p${term}`);

    pads_set.forEach((one_pad) => {
      one_pad.style.animation = `moving 0.5s alternate ease-in-out 2`;

      //play the sound
      if (one_pad.classList.contains("active")) {
        if (one_pad.classList.contains("kick_pad")) {
          this.kick_audio.currentTime = 0;
          this.kick_audio.play();
        }
        if (one_pad.classList.contains("snare_pad")) {
          this.snare_audio.currentTime = 0;
          this.snare_audio.play();
        }
        if (one_pad.classList.contains("hihat_pad")) {
          this.hihat_audio.currentTime = 0;
          this.hihat_audio.play();
        }
      }
    });
    this.index++;
  }
}

const drum = new Drumkit();

// event listeners
const all_pads = document.querySelectorAll(".pad");
all_pads.forEach((pad) => {
  pad.addEventListener("click", toggle_active);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });

  /*
  pad.addEventListener("animationend", () => {
    console.log(this); // refers to the window
  });
  */
  /*
  pad.addEventListener("animationend", function () {
    console.log(this); // refers to the pad
  });
  */
  /*
  pad.addEventListener("animationend", callthis);
  function callthis() {
    console.log(this); // refers to the pad
  }
  */
});

function toggle_active() {
  this.classList.toggle("active");
}

const play_button = document.querySelector(".play_button");
play_button.addEventListener("click", () => {
  drum.start_or_stop();
});

const mute_button = document.querySelectorAll(".mute");
mute_button.forEach((button) => {
  button.addEventListener("click", function () {
    button.classList.toggle("muting");
    if (button.classList.contains("muting")) {
      if (button.classList.contains("kick_mute")) {
        drum.kick_audio.volume = 0;
      }
      if (button.classList.contains("snare_mute")) {
        drum.snare_audio.volume = 0;
      }
      if (button.classList.contains("hihat_mute")) {
        drum.hihat_audio.volume = 0;
      }
    } else {
      if (button.classList.contains("kick_mute")) {
        drum.kick_audio.volume = 1;
      }
      if (button.classList.contains("snare_mute")) {
        drum.snare_audio.volume = 1;
      }
      if (button.classList.contains("hihat_mute")) {
        drum.hihat_audio.volume = 1;
      }
    }
  });
});

const selects = document.querySelectorAll("select");
selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    console.log(e.target);
    console.log(e.target.value);
    let new_src = e.target.value;
    if (e.target.classList.contains("kick_select")) {
      drum.kick_audio.src = new_src;
    }
    if (e.target.classList.contains("snare_select")) {
      drum.snare_audio.src = new_src;
    }
    if (e.target.classList.contains("hihat_select")) {
      drum.hihat_audio.src = new_src;
    }
  });
});

const slider = document.querySelector(".slider");
slider.addEventListener("input", function (e) {
  //console.log(e.target.value);
  drum.bpm = e.target.value;
  document.querySelector(".bpm_number").innerText = drum.bpm;
});
slider.addEventListener("change", function () {
  if (drum.is_playing == true) {
    clearInterval(drum.playing);
    drum.is_playing = false;
    drum.start_or_stop();
  } else {
    drum.start_or_stop();
  }
});
