const logger = require("./the-informant").initLogger({ to: "june.yeo92@gmail.com" });

function main() {
	try {
		throw "This is a test error";
	} catch (ex) {
		logger.error(main, ex);
	}
}

main();
