const { NotFound, Forbidden } = require('http-errors');
const { Note } = require('../models');

const getNote = async (userId, noteId) => {
	const note = await Note.findOne({ where: { userId, id: noteId } });
	if (!note) throw new NotFound('Note');
	return note;
};

const getNotes = async (userId) => {
	return Note.findAll({ where: { userId } });
};

const createNote = async (userId, createData) => {
	return Note.create({ ...createData, userId });
};

const updateNote = async (userId, noteId, updateData) => {
	const note = await Note.findByPk(noteId);

	console.log(userId);
	console.log(note);
	if (!note) throw new NotFound('Note');
	if (note.userId !== userId) throw new Forbidden();

	const updatedNote = await Note.update(
		{ ...updateData },
		{
			where: { userId, id: noteId },
			returning: true,
			plain: true,
		}
	);
	return updatedNote[1];
};

const deleteNote = async (userId, noteId) => {
	const note = await Note.findByPk(noteId);

	if (!note) throw new NotFound('Note');
	if (note.userId !== userId) throw new Forbidden();

	await Note.destroy({ where: { userId, id: noteId } });
};

module.exports = { getNote, getNotes, updateNote, createNote, deleteNote };
