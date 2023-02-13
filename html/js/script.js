const selection = doc.getElementById('selection');
let talkingColor = '#FF4C4C';
let hideOxygen = false;
// Load draggable
window.addEventListener('load', () => {
  frameworkStartUp();
});

// Switches & Cases
window.addEventListener("message", function(event) {
  switch (event.data.action) {
    case "startUp":
      startDraggable();
      startColors();
      startColorpicker();
      startPositions();
      startSliders();
    break;

    case "show":
      startPhone();
    break;

    // Send Data
    case "hud":
      progressCircle(event.data.health, ".health");
      progressCircle(event.data.armor, ".armor");
      progressCircle(event.data.stamina, ".stamina");
      progressCircle(event.data.oxygen, ".oxygen");
      $("#time").text(event.data.time);
      if (Config.useFramework) {
        progressCircle(event.data.hunger, ".hunger");
        progressCircle(event.data.thirst, ".thirst");
        if (Config.useStress) {
          progressCircle(event.data.stress, ".stress");
        };
      };
    break;

    case "isPaused":
      cinemaId.style.display = 'none';
      healthCircle.style.display = 'none';
      armorCircle.style.display = 'none';
      staminaCircle.style.display = 'none';
      oxygenCircle.style.display = 'none';
      microphoneCircle.style.display = 'none';
      if (Config.useFramework) {
        hungerCircle.style.display = 'none';
        thirstCircle.style.display = 'none';
        if (Config.useStress) {
          stressCircle.style.display = 'none';
        }
      }
    break;

    case "notPaused":
      if (cinematic) {
        cinemaId.style.display = 'block';
      } else {
        setCircles('show');
        cinemaId.style.display = 'none';
      }
    break

    case "voiceMode":
      progressCircle(event.data.microphone, ".microphone");
    break;

    case "talking":
      if (event.data.talking) {
        $('#microphone-circle').css('stroke', talkingColor)
      } else {
        $('#microphone-circle').css('stroke', getStored('microphoneColor') || '#ff6f00')
      }
    break;

    case "swimming":
      hideOxygen = event.data.swimming
      if (oxygen) {
        if (event.data.swimming) {
          oxygenCircle.style.display = 'inline-block';
        } else {
          oxygenCircle.style.display = 'none';
        }
      }
    break;
  }
});

document.onkeyup = function(event) {
  if (event.key == 'Escape') {
      $("#phone").fadeOut();
      $.post('https://zd-hud/close');
      setTimeout(function() {
          phone.style.animation = 'none';
      }, 400)
  }
};

// Initialization
const startDraggable = ()=> {
  $('#main').draggable();
  $('#health').draggable();
  $("#armor").draggable();
  $("#stamina").draggable();
  $("#oxygen").draggable();
  $("#microphone").draggable();
  if (Config.useFramework) {
    $('#hunger').draggable();
    $('#thirst').draggable();
    if (Config.useStress) {
      $('#stress').draggable();
    };
  };
}

const startColors = ()=> {
  $('#health-circle').css('stroke', getStored('healthColor'));
  $('#armor-circle').css('stroke', getStored('armorColor'));
  $('#stamina-circle').css('stroke', getStored('staminaColor'));
  $('#oxygen-circle').css('stroke', getStored('oxygenColor'));
  $('#microphone-circle').css('stroke', getStored('microphoneColor'));
  talkingColor = getStored('talkingColor') || '#FF4C4C'
  if (Config.useFramework) {
    $('#hunger-circle').css('stroke', getStored('hungerColor'));
    $('#thirst-circle').css('stroke', getStored('thirstColor'));

    if (Config.useStress) {
      $("#stress-circle").css('stroke', getStored('stressColor'));
    };
  };
}

const startPositions = ()=> {
  $("#health").animate({ top: getStored('dragHealthTop'), left: getStored('dragHealthLeft')});
  $("#armor").animate({ top: getStored('dragArmorTop'), left: getStored('dragArmorLeft')});
  $("#stamina").animate({ top: getStored('dragStaminaTop'), left: getStored('dragStaminaLeft')});
  $("#oxygen").animate({ top: getStored('dragOxygenTop'), left: getStored('dragOxygenLeft')});
  $("#microphone").animate({ top: getStored('dragMicrophoneTop'), left: getStored('dragMicrophoneLeft')});
  if (Config.useFramework) {
    $("#hunger").animate({ top: getStored('dragHungerTop'), left: getStored('dragHungerLeft')});
    $("#thirst").animate({ top: getStored('dragThirstTop'), left: getStored('dragThirstLeft')});
    if (Config.useStress) {
      $("#stress").animate({ top: getStored('dragStressTop'), left: getStored('dragStressLeft')});
    };
  };
  $("#main").animate({ top: getStored('dragMainTop'), left: getStored('dragMainLeft')});
}

const startColorpicker = ()=> {
  colorPicker.value = rgb2hex($('#health-circle').css('stroke'));
  colorPicker.addEventListener("input", updateColorPicker, false);
  colorPicker.select();
}

const startSliders = ()=> {
  setSliders();
  setContainer('sliderHealth', 'check-health', 'health');
  setContainer('sliderArmor', 'check-armor', 'armor');
  setContainer('sliderStamina', 'check-stamina', 'stamina');
  setContainer('sliderOxygen', 'check-oxygen', 'oxygen');
  setContainer('sliderMicrophone', 'check-microphone', 'microphone');
  setContainer('slider', 'check-microphone', 'microphone');
  setBreak();
  if (Config.useFramework) {
    setContainer('sliderHunger', 'check-hunger', 'hunger');
    setContainer('sliderThirst', 'check-thirst', 'thirst');
    if (Config.useStress) {
      setContainer('sliderStress', 'check-stress', 'stress');
    };
  };
}

const setSliders = ()=> {
  if (null != getId('sliderHealth')) {
    health = getId('sliderHealth')
  }
  if (null != getId('sliderArmor')) {
    armor = getId('sliderArmor')
  }
  if (null != getId('sliderStamina')) {
    stamina = getId('sliderStamina')
  }
  if (null != getId('sliderOxygen')) {
    oxygen = getId('sliderOxygen')
  }
  if (null != getId('sliderMicrophone')) {
    microphone = getId('sliderMicrophone')
  }
  if (null != getId('sliderBreak')) {
    separate = getId('sliderBreak')
  }
  if (Config.useFramework) {
    if (null != getId('sliderHunger')) {
      hunger = getId('sliderHunger')
    }
    if (null != getId('sliderThirst')) {
      thirst = getId('sliderThirst')
    }
    if (Config.useStress) {
      if (null != getId('sliderStress')) {
        stress = getId('sliderStress')
      }
    };
  }
}

// https://stackoverflow.com/a/3627747
const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

// Color picker function
window.addEventListener('load', ()=> {
  selection.addEventListener('change', ()=> {
    switch (selection.value) {
      case "health-option":
        colorPicker.value = rgb2hex($('#health-circle').css('stroke'))
        colorPicker.value = rgb2hex($('#armor-circle').css('stroke'))
        colorPicker.value = rgb2hex($('#stamina-circle').css('stroke'))
        colorPicker.value = rgb2hex($('#hunger-circle').css('stroke'))
        colorPicker.value = rgb2hex($('#thirst-circle').css('stroke'))
        colorPicker.value = rgb2hex($('#stress-circle').css('stroke'))
        colorPicker.value = rgb2hex($('#oxygen-circle').css('stroke'))
        colorPicker.value = rgb2hex($('#microphone-circle').css('stroke'))
        colorPicker.value = talkingColor
      break;
    };
  $('#selection').blur();
  });
});

let updateColorPicker = (event)=> {
  let color = event.target.value;
  switch (selection.value) {
    case "health-option":
      $('#health-circle').css('stroke', color);
      saveId('healthColor', color);
      $('#armor-circle').css('stroke', color);
      saveId('armorColor', color);
      $('#stamina-circle').css('stroke', color);
      saveId('staminaColor', color);
      $('#oxygen-circle').css('stroke', color);
      saveId('oxygenColor', color);
      $('#microphone-circle').css('stroke', color);
      saveId('microphoneColor', color);
      $('#hunger-circle').css('stroke', color);
      saveId('hungerColor', color);
      $('#thirst-circle').css('stroke', color);
      saveId('thirstColor', color);
      $('#stress-circle').css('stroke', color);
      saveId('stressColor', color);
      saveId('talkingColor', color);
    break;
  };
}

// Circumference
let progressCircle = (percent, element) => {
  const circle = document.querySelector(element);
  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;
  const html = $(element).parent().parent().find("span");

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  const offset = circumference - ((-percent * 100) / 100 / 100) * circumference;
  circle.style.strokeDashoffset = -offset;

  html.text(Math.round(percent));
}

// Container
function setContainer(slider, check, container) {
  if (getId(slider) == null) {
    doc.getElementById(check).checked = true;
    return
  } else {
    doc.getElementById(check).checked = getId(slider)
    if (getId(slider)) {
      doc.getElementById(container).style.display = 'inline-block';
    } else {
      doc.getElementById(container).style.display = 'none';
    }
  }
}

const setBreak = () => {
  if (getId('sliderBreak') == null) {
    checkBreak.checked = true;
    return
  } else {
    checkBreak.checked = getId('sliderBreak')
    if (getId('sliderBreak')) {
      $("#main").draggable({ disabled: true });

      $('#health').draggable({ disabled: false});
      $("#armor").draggable({ disabled: false});
      $("#stamina").draggable({ disabled: false});
      $("#oxygen").draggable({ disabled: false});
      $("#microphone").draggable({ disabled: false});
      if (Config.useFramework) {
        $('#hunger').draggable({ disabled: false});
        $('#thirst').draggable({ disabled: false});
        if (Config.useStress) {
          $('#stress').draggable({ disabled: false});
        };
      };
    } else {
      $("#main").draggable({ disabled: false });

      $('#health').draggable({ disabled: true});
      $("#armor").draggable({ disabled: true});
      $("#stamina").draggable({ disabled: true});
      $("#oxygen").draggable({ disabled: true});
      $("#microphone").draggable({ disabled: true});
      if (Config.useFramework) {
        $('#hunger').draggable({ disabled: true});
        $('#thirst').draggable({ disabled: true});
        if (Config.useStress) {
          $('#stress').draggable({ disabled: true});
        };
      };
    }
  }
}