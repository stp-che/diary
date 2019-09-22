import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  constructor(obj: any) {
    if (obj) {
      Object.assign(this, obj);
      this.date = new Date(obj.date);
    }
  }
}