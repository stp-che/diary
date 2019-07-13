import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Note
{
  @PrimaryGeneratedColumn()
  id: number;

  // @Column("date", {nullable: false})
  // date: Date;

  // @Column("string")
  // title: string;

  @Column("text")
  text: string;


  // constructor(text: string){
  //   this.text = text;
  // }

}