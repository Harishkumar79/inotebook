const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const router = express.Router();
const { body, validationResult } = require('express-validator');


//Route 1: getting all notes of user using : GET "/api/notes/getuser"
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occured")
    }

})

//Route 2: adding a note for the user using : POST "/api/notes/addnote"
router.post('/addnotes', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //if there is an error then send bad request and the error
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occurred");
    }
});

//Route 3: Updating the existing notes of user using : PUT "/api/notes/updatenote"
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;

    // Create a newNote object
    const newNote = {};
    if (title) { newNote.title = title; }
    if (description) { newNote.description = description; }
    if (tag) { newNote.tag = tag; }

    try {
        // Find the note to be updated
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }

        // Check if the user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Access denied");
        }

        // Update the note
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

        // Respond with the updated note
        res.json({ note });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//Route 4: Deleted the existing notes of user using : DELETE "/api/notes/deletenote"
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Find the note to be deleted
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }

        // Check if the user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Access denied");
        }

        // Delete the note
        note = await Note.findByIdAndDelete(req.params.id);

        // Respond
        res.json({"Success":"Note has been deleted" , note : note });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;