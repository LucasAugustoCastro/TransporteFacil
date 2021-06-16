import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class Regioes1588550598560 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'regioes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'origem',
            type: 'varchar',
          },
          {
            name: 'destino',
            type: 'varchar',
          },
          {
            name: 'info',
            type: 'varchar',
          },
          {
            name: 'hour',
            type: 'varchar',
          },
          {
            name: 'driver_id',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('regioes');
  }
}
