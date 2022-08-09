const { Router } = require('express');
const { wrap } = require('../utils');
const { validateRequest, passportAuthMiddleware } = require('../middlewares');
const { NoteController } = require('../controllers');
const {
	GetNoteRequest,
	CreateNoteRequest,
	DeleteNoteRequest,
	UpdateNoteRequest,
} = require('../requests');

const noteRouter = Router();

noteRouter.get(
	'/',
	passportAuthMiddleware(),
	wrap(async (req, res) => {
		const notes = await NoteController.getNotes(req.user.id);
		res.json(notes);
	})
);

noteRouter.get(
	'/:id',
	passportAuthMiddleware(),
	validateRequest(null, { params: GetNoteRequest }),
	wrap(async (req, res) => {
		const note = await NoteController.getNote(req.user.id, req.params.id);
		res.json(note);
	})
);

noteRouter.post(
	'/',
	passportAuthMiddleware(),
	validateRequest(CreateNoteRequest),
	wrap(async (req, res) => {
		const note = await NoteController.createNote(req.user.id, req.body);
		res.json({ success: true, note });
	})
);

noteRouter.patch(
	'/:id',
	passportAuthMiddleware(),
	validateRequest(UpdateNoteRequest, { params: GetNoteRequest }),
	wrap(async (req, res) => {
		const updatedNote = await NoteController.updateNote(
			req.user.id,
			req.params.id,
			req.body
		);
		res.json({ success: true, note: updatedNote });
	})
);

noteRouter.delete(
	'/:id',
	passportAuthMiddleware(),
	validateRequest(null, { params: DeleteNoteRequest }),
	wrap(async (req, res) => {
		await NoteController.deleteNote(req.user.id, req.params.id);
		res.json({ success: true });
	})
);

module.exports = noteRouter;
