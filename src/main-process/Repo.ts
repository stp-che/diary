import { createConnection } from 'typeorm';
import {Note} from "../models/Note"

let connection: any;

const Repo = {
  Note: null,

  init: async () => {
    connection = await createConnection({
      type: 'sqlite',
      synchronize: true,
      logging: true,
      logger: 'simple-console',
      database: './db/database.sqlite',
      entities: [ Note ],
    });

    Repo.Note = connection.getRepository(Note);
  }
}

export default Repo;