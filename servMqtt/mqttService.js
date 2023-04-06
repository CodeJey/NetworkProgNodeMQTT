const mqtt = require("mqtt");
class MQTTServ {
    //използва се callback метод, заради паралелната работа с websocket
    constructor(host, messageCallback) {
        this.mqttClient = null;
        this.host = host;
        this.messageCallback = messageCallback;
    }
    connect() {
        this.mqttClient = mqtt.connect(this.host);
        //в случай на грешка(error)
        this.mqttClient.on("error", (err) => {
            console.log(err);
            this.mqttClient.end();
        });
        // Callback метод при свързване
        this.mqttClient.on("connect", () => {
            console.log(`MQTT client connected`);
        });

        // При пристигане на съобщение
        this.mqttClient.on("message", function (topic, message) {
            console.log(message.toString());
            if (this.messageCallback) this.messageCallback(topic, message);
        });
        //При затваряне на връзката с брокера/сървъра
        this.mqttClient.on("close", () => {
            console.log(`MQTT client disconnected`);
        });
    }

    // Publish метод
    publish(topic, message, options) {
        this.mqttClient.publish(topic, message);
    }

    // Subscribe метод
    subscribe(topic, options) {
        this.mqttClient.subscribe(topic, options);
    }
}

module.exports = MQTTServ;