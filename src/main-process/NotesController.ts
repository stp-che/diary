import {Note} from "../models/Note"
import {NoteTag} from "../models/NoteTag"
import {fetch as fetchTags} from "../lib/Tags"
import Repo from "./Repo"

export default {
  init: (ipcMain: any) => {

    ipcMain.on('/notes/save', async (event: any, _note: Note) => {
      try {
        const note = await Repo.Note.create(_note);
        await Repo.Note.save(note);
        await Repo.NoteTag.delete({ note: note });
        fetchTags(note.text).forEach(async (tagName) => {
          const tag = await Repo.NoteTag.create({note: note, name: tagName});
          await Repo.NoteTag.save(tag);
        });
        event.returnValue = note;
      } catch (err) {
        throw err;
      }
    });
  
    ipcMain.on('/notes/list', async (event: any) => {
      try {
        event.returnValue = await Repo.Note.find({order: {date: "DESC"}});
      } catch (err) {
        throw err;
      }
    });
  }
}