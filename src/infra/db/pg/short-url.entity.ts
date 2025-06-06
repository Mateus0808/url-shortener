import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Click } from "./click";

@Entity('short_urls')
export class ShortUrl {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true, length: 6 })
  shortCode: string;

  @Column()
  originalUrl: string;

  @ManyToOne(() => User, (user) => user.shortUrls, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @Column({ nullable: true })
  userId?: number;

  @Column({ default: 0 })
  clicks: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @OneToMany(() => Click, (click) => click.shortUrl)
  clicksLog: Click[];
}
