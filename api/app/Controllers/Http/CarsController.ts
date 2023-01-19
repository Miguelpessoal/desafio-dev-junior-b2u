import { bind } from '@adonisjs/route-model-binding'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Car from 'App/Models/Car'

import StoreCarValidator from 'App/Validators/Car/StoreCarValidator'
import UpdateCarValidator from 'App/Validators/Car/UpdateCarValidator'

export default class CarsController {
  public async index({}: HttpContextContract) {
    return await Car.all()
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(StoreCarValidator)

    const car = await Car.create(data)

    return response.created(car)
  }

  @bind()
  public async show({}: HttpContextContract, car: Car) {
    return car
  }

  @bind()
  public async update({ request }: HttpContextContract, car: Car) {
    const data = await request.validate(UpdateCarValidator)

    return await car.merge(data).save()
  }

  @bind()
  public async destroy({ response }: HttpContextContract, car: Car) {
    await car.delete()

    return response.noContent()
  }
}
