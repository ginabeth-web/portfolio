import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('title')
      table.text('about').nullable()
      table.string('profile_image').nullable()
      table.string('resume').nullable()
      table.string('email').nullable()
      table.string('location').nullable()
      table.string('github').nullable()
      table.string('linkedin').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
