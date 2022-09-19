const informant = require("./the_informant").init({to: "june.yeo92@gmail.com", subject:"this is a test email"});

function main() {
	informant.notify("This is a test email");
}

main();
