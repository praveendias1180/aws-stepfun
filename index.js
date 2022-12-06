exports.handler = (event, context, callback) => {
    callback(null, "Hello from " + event.who + "!");
};