import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare title: string

  @column()
  declare about: string | null

  @column()
  declare profileImage: string | null

  @column()
  declare resume: string | null

  @column()
  declare email: string | null

  @column()
  declare location: string | null

  @column()
  declare github: string | null

  @column()
  declare linkedin: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
