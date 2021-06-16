import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Driver from './Driver';

@Entity('regioes')
class Regiao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  origem: string;

  @Column()
  destino: string;

  @Column()
  info: string;

  @Column()
  hour: string;

  @ManyToOne(() => Driver, driver => driver.regiao, { eager: true })
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @Column()
  driver_id: string;
}
export default Regiao;
