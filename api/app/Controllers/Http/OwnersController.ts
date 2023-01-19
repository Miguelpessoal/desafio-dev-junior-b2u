import { bind } from '@adonisjs/route-model-binding'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Owner from 'App/Models/Owner'

import StoreOwnerValidator from 'App/Validators/Owner/StoreOwnerValidator'
import UpdateOwnerValidator from 'App/Validators/Owner/UpdateOwnerValidator'

export default class OwnersController {
  public async index({}: HttpContextContract) {
    return await Owner.all()
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(StoreOwnerValidator)

    const owner = await Owner.create(data)

    return response.created(owner)
  }

  @bind()
  public async show({}: HttpContextContract, owner: Owner) {
    return owner
  }

  @bind()
  public async update({ request }: HttpContextContract, owner: Owner) {
    const data = await request.validate(UpdateOwnerValidator)

    return owner.merge(data).save()
  }

  @bind()
  public async destroy({ response }: HttpContextContract, owner: Owner) {
    await owner.delete()

    return response.noContent()
  }
}
