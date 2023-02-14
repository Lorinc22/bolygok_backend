import { Column, Entity,  PrimaryGeneratedColumn } from 'typeorm';

export class Bolygo {
    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nev: string;

  @Column()
  cim: number;

  @Column()
  atmero: number;



}