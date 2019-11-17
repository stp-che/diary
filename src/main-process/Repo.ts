import { createConnection } from 'typeorm';
import {Note} from "../models/Note"
import {NoteTag} from "../models/NoteTag"

let connection: any;

const Repo = {
  Note: null,
  NoteTag: null,

  init: async () => {
    connection = await createConnection({
      type: 'sqlite',
      synchronize: true,
      logging: true,
      logger: 'simple-console',
      database: './db/database.sqlite',
      entities: [ Note, NoteTag ],
    });

    Repo.Note = connection.getRepository(Note);
    Repo.NoteTag = connection.getRepository(NoteTag);
  }
}

export default Repo;