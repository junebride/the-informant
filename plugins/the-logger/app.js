const logger = require("./the_logger").init({ to: "june.yeo92@gmail.com" });

function main() {
	logger.error(main, "Test", ["test1", 0, false]);
	// try {
	// 	throw "This is a test error";
	// } catch (ex) {
	// 	logger.error(main, ex);
	// }
}

main();
