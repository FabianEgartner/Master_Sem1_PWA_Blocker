import { giveMePi } from "./modules/madhava-leibniz.js";

onmessage = (event) => {
  const message = event.data;
  if (message.seconds && !isNaN(message.seconds)) {
    let guess = giveMePi(message.seconds);
    postMessage(guess);
  }
};

onerror = (errorEvent) => {
  console.log(`Error in worker: ${errorEvent.message}`);
};
