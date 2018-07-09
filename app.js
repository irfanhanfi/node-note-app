const _ = require('lodash');
const yargs = require('yargs');
const fs = require('fs');
const notes = require('./notes');
const titleOptions = {
    describe:'Title of note',
    demand:true,
    alias:'t'
};
const bodyOptions = {
    describe:'body of note',
    demand:true,
    alias:'b'
};
const argv = yargs
    .command('add', 'Add a new note',{
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note',{
        title: titleOptions
    })
    .command('remove', 'Remove a note',{
        title: titleOptions
    })
    .help()
    .argv;
const command = argv._[0];

if (command === "add"){
    var note = notes.addNote(argv.title, argv.body);
    if (note === undefined)
    {
        console.log(`Note already exists with tile: ${argv.title}`)
    }else{
        console.log(`Note added with title: ${note.title}, Body: ${note.body}`)
    }
}else if (command === "list"){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach(note => {
        notes.logNote(note);
    });
}else if (command === "read"){
    var note = notes.getNote(argv.title);
    if (note){
        console.log('Note Found.', note);
    }else{
        console.log('Note not found.');
    }
}else if (command === "remove"){
    var result = notes.removeNote(argv.title);
    if (result){
        console.log('Note removed.');
    }else{
        console.log('Note not found.');
    }
}else {
    console.log("Command not recongnized..");
}
// console.log(yargs.argv);
// console.log(process.argv);
// fs.appendFile('notes.txt')