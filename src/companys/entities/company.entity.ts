import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
@Entity('companys')
export class Company {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;
  
  @Column({ length: 50 })
  @Field()
  name: string;

  @Column({ length: 500 })
  @Field()
  logo: string;

  @CreateDateColumn({ select: false, type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ select: false, type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;

  @DeleteDateColumn({ select: false })
  deleted_at: Date;

  @Column({ type: 'int', nullable: true, select: false })
  deleted_by: number;

}
