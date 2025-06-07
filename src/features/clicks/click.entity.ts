import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ShortUrl } from "../short-url/short-url.entity";

@Entity('clicks')
export class Click {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => ShortUrl, (shortUrl) => shortUrl.clicksLog)
  @JoinColumn({ name: 'shortUrlId' })
  shortUrl: ShortUrl;

  @Column()
  shortUrlId: number;

  @Column({ type: 'timestamp' })
  clickedAt: Date

  @CreateDateColumn()
  createdAt: Date
}
