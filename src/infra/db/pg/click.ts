import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ShortUrl } from "./short-url.entity";

@Entity('clicks')
export class Click {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ShortUrl, (shortUrl) => shortUrl.clicksLog, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'shortUrlId' })
  shortUrl: ShortUrl;

  @Column()
  shortUrlId: number;

  @Column({ type: 'timestamp' })
  clickedAt: Date

  @CreateDateColumn()
  createdAt: Date
}
