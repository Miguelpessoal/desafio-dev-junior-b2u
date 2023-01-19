import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateOwnerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({}, [rules.maxLength(255)]),
    email: schema.string.optional({}, [
      rules.email(),
      rules.unique({ table: 'owners', column: 'email', whereNot: { id: this.ctx.params.id } }),
    ]),
    phoneNumber: schema.string.optional({}, [
      rules.mobile({ strict: false, locale: ['pt-BR'] }),
      rules.unique({
        table: 'owners',
        column: 'phone_number',
        whereNot: { id: this.ctx.params.id },
      }),
    ]),
    address: schema.string.optional({}, [rules.maxLength(255)]),
  })
}
