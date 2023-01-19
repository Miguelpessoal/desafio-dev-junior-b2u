import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreCarValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.required(), rules.maxLength(255)]),
    manufacturer: schema.string({}, [rules.required(), rules.maxLength(255)]),
    brand: schema.string({}, [
      rules.required(),
      rules.maxLength(7),
      rules.alphaNum(),
      rules.unique({ table: 'cars', column: 'brand' }),
    ]),
    yearOfManufacture: schema.number([rules.required(), rules.range(1886, 2023)]),
    description: schema.string({}, [rules.nullable()]),
    ownerId: schema.number([rules.required(), rules.exists({ table: 'owners', column: 'id' })]),
  })
}
