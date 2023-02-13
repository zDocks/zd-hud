const doc = document

// Sliders vars
const checkHealth = doc.getElementById('check-health')
const checkArmor = doc.getElementById('check-armor')
const checkStamina = doc.getElementById('check-stamina')
const checkOxygen = doc.getElementById('check-oxygen')
const checkMic = doc.getElementById('check-microphone')
const checkCinematic = doc.getElementById('check-cinematic')
const checkBreak = doc.getElementById('check-break')

// Hud ids
const healthCircle = doc.getElementById('health')
const armorCircle = doc.getElementById('armor')
const staminaCircle = doc.getElementById('stamina')
const oxygenCircle = doc.getElementById('oxygen')
const microphoneCircle = doc.getElementById('microphone')
const cinemaId = doc.getElementById('cinematic')

// Framework stuff
const checkHunger = doc.getElementById('check-hunger')
const checkThirst = doc.getElementById('check-thirst')
const hungerCircle = doc.getElementById('hunger')
const thirstCircle = doc.getElementById('thirst')
const hungerSlider = doc.getElementById('slider-hunger')
const thirstSlider = doc.getElementById('slider-thirst')
const hungerOption = doc.getElementById('hunger-option')
const thirstOption = doc.getElementById('thirst-option')

const checkStress = doc.getElementById('check-stress')
const stressCircle = doc.getElementById('stress')
const stressSlider = doc.getElementById('slider-stress')
const stressOption = doc.getElementById('stress-option')

let health, armor, stamina, oxygen, microphone, hunger, thirst, stress;
health = armor = stamina = oxygen = microphone = hunger = thirst = stress = true;

let cinematic = false;
let separate = true;

// Sliders saving
window.addEventListener('load', () => {
    checkHealth.addEventListener('click', () => {
      health = checkHealth.checked
      if (health) {
        healthCircle.style.display = 'inline-block';
      } else {
        healthCircle.style.display = 'none';
      }
    })
  
    checkArmor.addEventListener('click', () => {
      armor = checkArmor.checked
      if (armor) {
        armorCircle.style.display = 'inline-block';
      } else {
        armorCircle.style.display = 'none'
      }
    })

  
    checkCinematic.addEventListener('click', () => {
      cinematic = checkCinematic.checked
      if (cinematic) {
        doc.getElementById('top').style.animation = 'slideDown 1.0s forwards'
        doc.getElementById('bottom').style.animation = 'slideUp 1.0s forwards'
        setTimeout(function() {
          cinemaId.style.animation = 'none'
        }, 1100)
        setCircles('hide');
      } else {
        doc.getElementById('top').style.animation = 'slideBackUp 1.0s forwards'
        doc.getElementById('bottom').style.animation = 'slideBackDown 1.0s forwards'
        setTimeout(function() {
          cinemaId.style.animation = 'none'
        }, 1100)
        setCircles('show');
      }
    })
  
      separate = checkBreak
      if (separate) {
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
    })

    if (Config.useFramework) {
      checkHunger.addEventListener('click', () => {
        hunger = checkHunger.checked
        if (hunger) {
          hungerCircle.style.display = 'inline-block';
        } else {
          hungerCircle.style.display = 'none'
        }
      })

      checkThirst.addEventListener('click', () => {
        thirst = checkThirst.checked
        if (thirst) {
          thirstCircle.style.display = 'inline-block';
        } else {
          thirstCircle.style.display = 'none'
        }
      })
      if (Config.useStress) {
        checkStress.addEventListener('click', () => {
          stress = checkStress.checked
          if (stress) {
            stressCircle.style.display = 'inline-block';
          } else {
            stressCircle.style.display = 'none'
          }
        })
      };
    };

const setCircles = (boolean)=> {
    if (boolean == "show") {
        if (health) {
            healthCircle.style.display = 'inline-block';
        } else {
            healthCircle.style.display = 'none'
        }
        if (armor) {
            armorCircle.style.display = 'inline-block';
        } else {
            armorCircle.style.display = 'none'
        }
        if (stamina) {
            staminaCircle.style.display = 'inline-block';
        } else {
            staminaCircle.style.display = 'none'
        }
        if (oxygen) {
            oxygenCircle.style.display = 'inline-block';
        } else {
            oxygenCircle.style.display = 'none'
        }
        if (microphone) {
            microphoneCircle.style.display = 'inline-block';
        } else {
            microphoneCircle.style.display = 'none'
        }
        if (Config.useFramework) {
            if (hunger) {
                hungerCircle.style.display = 'inline-block';
            } else {
                hungerCircle.style.display = 'none'
            }
            if (thirst) {
                thirstCircle.style.display = 'inline-block';
            } else {
                thirstCircle.style.display = 'none'
            }
            if (Config.useStress) {
                if (stress) {
                    stressCircle.style.display = 'inline-block';
                } else {
                    stressCircle.style.display = 'none'
                }
            };
        };
    } else if (boolean == "hide") {
        cinemaId.style.display = 'block';
        healthCircle.style.display = 'none'
        armorCircle.style.display = 'none'
        staminaCircle.style.display = 'none'
        oxygenCircle.style.display = 'none'
        microphoneCircle.style.display = 'none'
        if (Config.useFramework) {
          hungerCircle.style.display = 'none'
          thirstCircle.style.display = 'none'
          if (Config.useStress) {
            stressCircle.style.display = 'none'
          }
        }
    }
}

const frameworkStartUp = ()=> {
  if (Config.useFramework && !Config.useStress) {
  } else if (Config.useFramework && Config.useStress) {
      return
  } else {
      hungerCircle.style.display = 'none';
      thirstCircle.style.display = 'none';
      stressCircle.style.display = 'none';
      hungerSlider.style.display = 'none';
      thirstSlider.style.display = 'none';
      stressSlider.style.display = 'none';
      hungerOption.style.display = 'none';
      thirstOption.style.display = 'none';
      stressOption.style.display = 'none';
  };
}