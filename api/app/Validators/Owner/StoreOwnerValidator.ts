import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreOwnerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.required(), rules.maxLength(255)]),
    email: schema.string({}, [
      rules.required(),
      rules.email(),
      rules.unique({ table: 'owners', column: 'email' }),
    ]),
    phoneNumber: schema.string({}, [
      rules.required(),
      rules.mobile({ strict: false, locale: ['pt-BR'] }),
      rules.unique({ table: 'owners', column: 'phone_number' }),
    ]),
    address: schema.string({}, [rules.required(), rules.maxLength(255)]),
  })
}
