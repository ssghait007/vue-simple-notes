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
    res.json({
        Notes: notes
    });
});

router.get("/note/:id", (req, res) => {
    const note = notes.filter(item => {
        console.log(item.id, req.params.id);
        return item.id == req.params.id;
    })
    note.length?res.json(note):res.json([])
});

router.post("/note", (req, res) => {
    res.json({
        msg: "success",
        desc: "Note added"
    });
});
router.put('/note/:id', (req, res) => {
    res.json({
        msg: "success",
        desc: "Note updated"
    });
});
router.delete('/note/:id', (req, res) => {
    res.json({
        msg: "success",
        desc: "Note deleted"
    });
});
app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);