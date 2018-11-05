const bunyan = require("bunyan");
const logger = bunyan.createLogger({
	name: "API",
	streams: [
		{
			level: "info",
			stream: process.stdout, // log INFO and above to stdout
		},
		{
			level: "error",
			path: "/var/tmp/social-error.log", // log ERROR and above to a file
		},
	],
});

module.exports = logger;
