const fs = require('fs');
var originalNote = {
    title: 'New Title',
    body: 'Body'
};
var originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('data.json', originalNoteString);
var noteString = fs.readFileSync('data.json');
var note = JSON.parse(noteString);
console.log(typeof note);
console.log(note);