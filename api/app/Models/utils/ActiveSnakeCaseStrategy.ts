import { BaseModel, SnakeCaseNamingStrategy } from '@ioc:Adonis/Lucid/Orm'

export class CamelCaseNamingStrategy extends SnakeCaseNamingStrategy {
  public serializedName(_model: typeof BaseModel, propertyName: string) {
    return propertyName
  }
}
