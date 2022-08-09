const yup = require('yup');

const GetNoteRequest = yup.object().required().shape({
	id: yup.string().required(),
});

const CreateNoteRequest = yup.object().required().shape({
	title: yup.string().required(),
	text: yup.string().required(),
});

const DeleteNoteRequest = yup.object().required().shape({
	id: yup.string().required(),
});

const UpdateNoteRequest = yup.object().required().shape({
	title: yup.string(),
	text: yup.string(),
});

module.exports = {
	GetNoteRequest,
	CreateNoteRequest,
	DeleteNoteRequest,
	UpdateNoteRequest,
};
