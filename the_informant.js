const nodemailer = require("nodemailer");
const logger = require("./plugins/the-logger/the_logger").init({ to: "june.yeo92@gmail.com" });

if (process.env.NODE_ENV !== "production") require("dotenv").config();

class Informant {
	#transporter = null;
	#mailOption = { to: "", subject: "", from: process.env.EMAIL };

	constructor(mailOption = this.#mailOption) {
		this.#mailOption.to = mailOption.to || this.#mailOption.to;
		this.#mailOption.subject = mailOption.subject || this.#mailOption.subject;
		this.#transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASS
			}
		});
	}

	async notify(message) {
		let mailOption = this.#mailOption;
		mailOption["text"] = message;

		try {
			await this.#transporter.sendMail(mailOption);
		} catch (err) {
			logger.error(this.notify, err);
		}
	}
}

module.exports.init = function (options) {
	return new Informant(options);
};
