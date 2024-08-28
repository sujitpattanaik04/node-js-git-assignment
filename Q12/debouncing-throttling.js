const input = document.querySelector("input");
const defaultText = document.getElementById("default");
const debounceText = document.getElementById("debounce");
const throttleText = document.getElementById("throttle");

const updateDebounceText = debounce((text) => {
  debounceText.textContent = text;
});

const updateThrottleText = throttle((text) => {
  throttleText.textContent = text;
});

input.addEventListener("input", (e) => {
  defaultText.textContent = e.target.value;
  console.log(e.target.value);
  updateDebounceText(e.target.value);
  updateThrottleText(e.target.value);
});

function debounce(cb, delay = 1000) {
  let setTimeoutId;
  return (arg) => {
    if (setTimeoutId) clearTimeout(setTimeoutId);
    setTimeoutId = setTimeout(() => {
      cb(arg);
    }, delay);
  };
}

function throttle(cb, delay = 1000) {
  let wait = false;
  let waitingArgs;

  const timeoutFunc = () => {
    if (waitingArgs) {
      cb(waitingArgs);
      waitingArgs = null;
      timeoutFunc();
    } else {
      wait = false;
    }
  };

  return (args) => {
    if (wait) {
      waitingArgs = args;
      return;
    }

    cb(args);
    wait = true;

    setTimeout(timeoutFunc, delay);
  };
}

// USE CASES OF DEBOUNCING:
// 1. Search Input In Search Box
// 2. Window Resize Events
// 3. Form Validation
// 4. Auto-Save Feature

// USE CASES OF THROTTLING:
// 1. Scrolling Events
// 2. Mouse Move Events
// 3. Button Click Prevention
// 4. APIs With Rate Limits
