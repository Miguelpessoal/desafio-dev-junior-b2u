import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateCarValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({}, [rules.maxLength(255)]),
    manufacturer: schema.string.optional({}, [rules.maxLength(255)]),
    brand: schema.string.optional({}, [
      rules.maxLength(7),
      rules.alphaNum(),
      rules.unique({ table: 'cars', column: 'brand', whereNot: { id: this.ctx.params.id } }),
    ]),
    yearOfManufacture: schema.number.optional([rules.range(1886, 2023)]),
    description: schema.string.optional(),
    ownerId: schema.number.optional([rules.exists({ table: 'owners', column: 'id' })]),
  })
}
