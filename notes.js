const fs = require('fs');

var fetchNotes = () => {
    try{
        var notesString = fs.readFileSync('note-data.json');
        return JSON.parse(notesString);
    }catch(e){
        return [];
    }
}

var saveNotes = (notes) => {
    fs.writeFileSync('note-data.json', JSON.stringify(notes));
}
var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };

    var duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0)
    {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
    
};


var removeNote = (title) => {
    var allNotes = fetchNotes();
    var filteredNotes = allNotes.filter((note) => note.title !== title);

    if (allNotes.length !== filteredNotes.length)
    {
        saveNotes(filteredNotes);
        return true;
    }
};

var getNote = (title) => {
    var allNotes = fetchNotes();
    var filteredNotes = allNotes.filter((note) => note.title === title);

    if (filteredNotes.length)
    {
        return filteredNotes.pop();
    }
};

var getAll = () => {
    return fetchNotes();
};

var logNote = (note) => {
    console.log('------');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

module.exports = {
    addNote,
    removeNote,
    getNote,
    getAll
}