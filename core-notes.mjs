import * as fs from 'fs';
import chalk from 'chalk';

const findNote = function (notes, title) {
    return notes.find(note => note.title === title);
}

const displayNote = function (note) {
    return `${chalk.red(note.title)}:\n${chalk.green(note.body)}`;
}

const errorHelper = function () {
    return chalk.red('Nota non trovata.');
}

const addNote = function (title, body) {
    const notes = loadNotes();
    const noteExist = findNote(notes, title);
    
    if (!noteExist) {
        
        notes.push({
            title: title,
            body: body
        })
        
        saveNotes(notes);
        
        return "Done";
        
    } else {
        
        return chalk.red('Non puoi inserire la nota, esiste già.');
        
    }
}

const removeNote = function (title) {
    const notes = loadNotes();
    const noteExist = findNote(notes, title);

    if (noteExist) {
        
        const newNotes = notes.filter(note => note != noteExist);
        
        saveNotes(newNotes);
        
        return "Done";
        
    } else {
        
        errorHelper();
        
    }    
}

const listNotes = function () {
    const notes = loadNotes();
    
    const output = notes.map( note => chalk.red(note.title) );
    
    return output.join('\n');
}

const readNote = function (title) {
    const notes = loadNotes();
    const noteExist = findNote(notes, title);

    if (noteExist) {
        
        return displayNote(noteExist);
        
    } else {
        
        return errorHelper();
        
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('database/notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        
        const data = fs.readFileSync('database/notes.json')
        const result = data.toString()
        return JSON.parse(result)
        
    } catch (e) {
        
        return []
        
    }
}

export {
    addNote,
    removeNote,
    listNotes,
    readNote
}
