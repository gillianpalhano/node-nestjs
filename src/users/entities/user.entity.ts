import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('int')
  @Field()
  register: number;

  @Column({length: 10})
  @Field()
  key: string;

  @Column({length: 50})
  @Field()
  login: string;
  
  @Column({ length: 100 })
  @Field()
  name: string;

  @Column({ length: 20 })
  @Field()
  name_usual: string;

  @Column({ length: 50 })
  @Field()
  email: string;

  @CreateDateColumn({ select: false, type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ select: false, type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;

  @DeleteDateColumn({ select: false })
  deleted_at: Date;

  @Column({ type: 'int', nullable: true, select: false })
  deleted_by: number;

}
