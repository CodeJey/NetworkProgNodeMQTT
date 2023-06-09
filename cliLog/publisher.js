const mqtt = require("mqtt");

var mqttClient;

// подаваме детайли за MQTT брокера ни
//ако искаме да пуснем приложението в употреба извън устройството е необходимо тук да се зададе адреса на сървъра в LAN, ако се хостват в една мрежа
//или да се използва адрес на сървър в интернет, същото важи и за websockets настройката
//приложението става мултиклиент, като за пълно сработване се изискват и промени в конфигурационния файл на услугата, ако я предоставяме от същия хост
const mqttHost = "127.0.0.1";
const protocol = "mqtt";
const port = "1883";

function connectToBroker() {
  const clientId = "client" + Math.random().toString(36).substring(7);

  const hostURL = `${protocol}://${mqttHost}:${port}`;

  const options = {
    keepalive: 60,
    clientId: clientId,
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
  };

  mqttClient = mqtt.connect(hostURL, options);

  mqttClient.on("error", (err) => {
    console.log("Error: ", err);
    mqttClient.end();
  });

  mqttClient.on("reconnect", () => {
    console.log("Reconnecting...");
  });

  mqttClient.on("connect", () => {
    console.log("Client connected:" + clientId);
  });

  // При получено съобщение по даден топик
  mqttClient.on("message", (topic, message, packet) => {
    console.log(
      "Received Message: " + message.toString() + "\nOn topic: " + topic
    );
  });
}

function publishMessage(topic, message) {
  console.log(`Sending Topic: ${topic}, Message: ${message}`);
  mqttClient.publish(topic, message, {
    qos: 0,
    retain: false,
  });
}

connectToBroker();

publishMessage("temperature", "32")