# MQTTThing Tasmota window cover

An [MQTTThing codec](https://github.com/arachnetech/homebridge-mqttthing/blob/master/docs/Codecs.md) for connecting [Tasmota-based shutters and blinds](https://tasmota.github.io/docs/Blinds-and-Shutters/) to [homebridge](https://homebridge.io/)

## Setup

- When your blinds are configured and calibrated, set up [MQTT on your tasmota device](https://tasmota.github.io/docs/MQTT/) and ensure you have enabled [`SetOption 4 1`](https://tasmota.github.io/docs/Commands/#setoptions).
  - This directs JSON results to the SHUTTER topic so they can be selectively read by the codec
- Add the codec to your homebridge config.json.

## Sample Config

Here's a sample configuration for a cover:

```json
{
    "type": "windowCovering",
    "name": "my-cover",
    "url": "mqtt.example.com",
    "codec": "/path/to/codec/tasmota-blind.mqtthing.js",
    "topics": {
        "getCurrentPosition": "stat/my-cover/SHUTTER",
        "getTargetPosition": "stat/my-cover/SHUTTER",
        "setTargetPosition": "cmnd/my-cover/shutterposition"
    },
    "startPub": [
        {
            "topic": "cmnd/tasmota_86B05C/shutterposition"
        }
    ],
    "accessory": "mqttthing"
}
```

# How it works

- setTarget homebridge commands are sent as the raw position integer to the `cmnd/my-cover/shutterposition` topic.
- when the device publishes a JSON response to the `stat/my-cover/SHUTTER` topic, the contents are parsed back to integers to be returned to homebrige as currentPosition and targetPosition

A typical setTargetPosition event is transmitted as `cmnd/my-cover/shutterposition 50`. A typical response is expected in the form `stat/my-cover/SHUTTER {"Shutter1": {"Position": 50, "Target": 50, "Direction": -1, "Tilt": 0}}`
