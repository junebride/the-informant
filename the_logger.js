const fs = require("fs");

class Logger {
	#dir = "./the_lumberyard/";
	#mailOption = { to: "", subject: "[The Logger] Your application had encountered an error" };

	constructor(mailOption = this.#mailOption) {
		this.#mailOption.to = mailOption.to || this.#mailOption.to;
		this.#mailOption.subject = mailOption.subject || this.#mailOption.subject;

		if (!fs.existsSync(this.#dir)) fs.mkdirSync(this.#dir);
	}

	error(callerFunction, errorMessage, optionalParameter = []) {
		let functionName = callerFunction.name;
		let datetime = new Date();
		let parameterMessage = "";
		let logMessage = "";

		for (let i = 0; i < optionalParameter.length; i++) parameterMessage += optionalParameter[i] + ", ";

		parameterMessage = parameterMessage.substring(0, parameterMessage.length - 2);

		logMessage = `[${datetime.toISOString()}] - [${functionName}(${parameterMessage})] ${errorMessage}\n`;

		let dir = this.#dir;

		fs.appendFileSync(`${dir}/error.log`, `${logMessage}`);
	}
}

module.exports.init = function (options) {
	return new Logger(options);
};
