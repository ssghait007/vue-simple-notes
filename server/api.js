const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();
const notes = [{
    name: "Note1",
    id: 1,
    content: "First note"
}, {
    name: "Note2",
    id: 2,
    content: "Second note"
}, {
    name: "Note3",
    id: 3,
    content: "Third note"
}]

router.get("/note", (req, res) => {
    /*
    * Add database get all notes query 
    */
    res.json({
        Notes: notes
    });
});

router.get("/note/:id", (req, res) => {
    /*
    * Add database get single note query 
    */
    const note = notes.filter(item => item.id == req.params.id)
    note.length ? res.json(note) : res.json([])
});

router.post("/note", (req, res) => {
    /*
    * Add database add note all query 
    */
    res.json({
        msg: "success",
        desc: "Note added"
    });
});

router.put('/note/:id', (req, res) => {
    /*
    * Add database update note query 
    */
    res.json({
        msg: "success",
        desc: "Note updated"
    });
});

router.delete('/note/:id', (req, res) => {
    /*
    * Add database delete note query 
    */
    res.json({
        msg: "success",
        desc: "Note deleted"
    });
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);