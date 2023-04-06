const MQTTServ = require("../servMqtt/mqttService");

//Тук оказваме отново нашия адрес за хоста, на който е стартирана услугата/брокера за mqtt
const MQTT_HOST_NAME = "mqtt://127.0.0.1:1883";
var mqttClient = new MQTTServ(MQTT_HOST_NAME);
mqttClient.connect();

exports.getPublisherPage = async function (req, res) {
    try {
        res.render("pages/publisher");
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};

exports.publishMQTTMessage = async function (req, res) {
    try {
        const topic = req.body.topic;
        const message = req.body.message;

        console.log(`Request Topic :: ${topic}`);
        console.log(`Request Message :: ${message}`);

        mqttClient.publish(topic, message, {});
        res
            .status(200)
            .json({ status: "200", message: "Sucessfully published MQTT Message" });
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
};