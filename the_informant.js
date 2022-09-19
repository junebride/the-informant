const fs = require("fs");
const nodemailer = require("nodemailer");
if (process.env.NODE_ENV !== "production") require("dotenv").config();

class Informant {
	#transporter = null;
	#mailOption = { to: "", subject: "" };

	constructor(mailOption = this.#mailOption) {
		this.#mailOption.to = mailOption.to || this.#mailOption.to;
		this.#mailOption.subject = mailOption.subject || this.#mailOption.subject;
	}

	notify(message) {
		let mailOption = this.#mailOption;
		mailOption["text"] = message;

		this.#transporter.sendMail(mailOption, function (error, info) {
			if (error) fs.appendFileSync(`${dir}/error.log`, `${error}\n`);
		});
	}
}

module.exports.initLogger = function (options) {
	return new Informant(options);
};
