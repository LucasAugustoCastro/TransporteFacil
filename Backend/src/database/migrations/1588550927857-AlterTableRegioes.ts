import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AlterTableRegioes1588550927857
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createForeignKey(
      'regioes',
      new TableForeignKey({
        name: 'driver_id',
        columnNames: ['driver_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'drivers',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('regioes', 'driver_id');
  }
}
