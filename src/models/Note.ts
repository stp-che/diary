import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Note
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column("date", {nullable: false})
  date: Date;

  @Column("varchar")
  title: string;

  @Column("text")
  text: string;

}