const fs = require("fs");

class Logger {
	#dir = "./the_lumberyard/";
	#mailOption = { to: "", subject: "[The Logger] Your application had encountered an error" };
	#informant = null;

	constructor(mailOption = this.#mailOption) {
		this.#mailOption.to = mailOption.to || this.#mailOption.to;
		this.#mailOption.subject = mailOption.subject || this.#mailOption.subject;

		// if (!this.#isNullOrEmpty(this.#mailOption.to)) this.#informant = require("./the-informant/the_informant").init(this.#mailOption);

		if (!fs.existsSync(this.#dir)) fs.mkdirSync(this.#dir);
	}

	#isNullOrEmpty(value) {
		return value == null || value === "";
	}

	error(callerFunction, errorMessage, optionalParameter = []) {
		let functionName = callerFunction.name;
		let datetime = new Date();
		let logMessage = `[${datetime.toISOString()}] - [${functionName}()] ${errorMessage}\n`;

		let dir = this.#dir;

		fs.appendFileSync(`${dir}/error.log`, `${logMessage}`);

		if (!this.#informant) {
			let mailMessage = `[${datetime.toISOString()}]\nAn error has occured at function "${functionName}:\n\n${errorMessage}`;
			// this.#informant.notify(mailMessage);
		}
	}
}

module.exports.init = function (options) {
	return new Logger(options);
};
