import { giveMePi } from "./modules/madhava-leibniz.js";

const ports = new Set();

function broadcastMessage(message) {
  for (const port of ports) {
    try {
      port.postMessage(message);
    } catch (err) {
      ports.delete(port);
    }
  }
}

onconnect = (connectEvent) => {
  const port = connectEvent.ports[0];
  ports.add(port);

  port.onmessage = (event) => {
    const message = event.data;
    if (message.seconds && !isNaN(message.seconds)) {
      broadcastMessage({text: "running"});
      let guess = giveMePi(message.seconds);
      broadcastMessage({guess: guess});
    }
  };
};

onerror = (errorEvent) => {
  console.debug(`Error in sharedWorker: ${errorEvent.message}`);
};
