import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {NoteTag} from './NoteTag';

@Entity()
export class Note
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column("datetime", {nullable: false})
  date: Date;

  @Column("varchar")
  title: string;

  @Column("text")
  text: string;

  @OneToMany(type => NoteTag, tag => tag.note)
  tags: NoteTag[];

  constructor(obj: any) {
    if (obj) {
      Object.assign(this, obj);
      this.date = new Date(obj.date);
    }
  }
}