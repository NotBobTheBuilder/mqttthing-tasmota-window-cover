module.exports = {
  init: function(params) {
    return {
      properties: {
	currentPosition: {
          decode: function(message) {
            const msgs = JSON.parse(message.toString());
            if (Array.isArray(msgs)) {
	    	return msgs[0].Shutter1.Position;
            }
	    return msgs.Shutter1.Position;
          },
	},
        targetPosition: {
          encode: function(message) { return message },
          decode: function(message) {
            const msgs = JSON.parse(message.toString());
            if (Array.isArray(msgs)) {
	    	return msgs[0].Shutter1.Target;
            }

	    return msgs.Shutter1.Target;
	  }
        }
      },
      encode: function(msg) { return msg },
      decode: function(msg) { return msg }
    }
  }
}
