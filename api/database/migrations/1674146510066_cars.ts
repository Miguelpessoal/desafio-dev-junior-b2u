import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cars'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('manufacturer').notNullable()
      table.string('brand').unique().notNullable()
      table.integer('year_of_manufacture').notNullable()
      table.text('description')
      table.integer('owner_id').unsigned().references('id').inTable('owners').notNullable()
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
