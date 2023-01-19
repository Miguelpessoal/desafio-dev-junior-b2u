import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import Owner from './Owner'

import { CamelCaseNamingStrategy } from './utils/ActiveSnakeCaseStrategy'

export default class Car extends BaseModel {
  public static namingStrategy = new CamelCaseNamingStrategy()

  @column({ isPrimary: true })
  public id: number

  @column()
  public ownerId: number

  @column()
  public name: string

  @column()
  public manufacturer: string

  @column()
  public brand: string

  @column()
  public yearOfManufacture: number

  @column()
  public yearOfModel: number

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //Relationships
  @belongsTo(() => Owner)
  public owner: BelongsTo<typeof Owner>
}
