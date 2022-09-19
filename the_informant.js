const fs = require("fs");
const nodemailer = require("nodemailer");
const logger = require("./the-logger/the_logger").init();

if (process.env.NODE_ENV !== "production") require("dotenv").config();

class Informant {
	#transporter = null;
	#mailOption = { to: "", subject: "", from:  };

	constructor(mailOption = this.#mailOption) {
		this.#mailOption.to = mailOption.to || this.#mailOption.to;
		this.#mailOption.subject = mailOption.subject || this.#mailOption.subject;
		this.#transporter = nodemailer.createTransport({
			service: "gmail",
			user: process.env.EMAIL,
			pass: process.env.PASS
		})
	}

	notify(message) {
		let mailOption = this.#mailOption;
		mailOption["text"] = message;

		this.#transporter.sendMail(mailOption, function (error, info) {
			if (error) 
			logger.error(notify, error)
		});
	}
}

module.exports.init = function (options) {
	return new Informant(options);
};
