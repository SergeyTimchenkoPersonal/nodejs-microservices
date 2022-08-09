const { messageTemplates } = require('../constants');

function generateMessage(type, payload) {
	let template = messageTemplates[type];
	template.text = template.text.replace(/{(\w+)}/g, (_, k) => {
		return payload[k];
	});
	return template;
}

module.exports = {
	generateMessage,
};
