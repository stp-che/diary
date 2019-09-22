import {Note} from "../models/Note"
import Repo from "./Repo"

export default {
  init: (ipcMain: any) => {

    ipcMain.on('/notes/save', async (event: any, _note: Note) => {
      try {
        const note = await Repo.Note.create(_note);
        await Repo.Note.save(note);
      } catch (err) {
        throw err;
      }
    });
  
    ipcMain.on('/notes/list', async (event: any) => {
      try {
        event.returnValue = await Repo.Note.find();
      } catch (err) {
        throw err;
      }
    });
  }
}