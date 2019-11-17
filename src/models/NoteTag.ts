import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import {Note} from './Note';


@Entity()
export class NoteTag
{
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column("varchar")
  name: string;
  
  @ManyToOne(type => Note, note => note.tags)
  note: Note;

  constructor(obj: any) {
    if (obj) {
      Object.assign(this, obj);
      this.date = new Date(obj.date);
    }
  }
}