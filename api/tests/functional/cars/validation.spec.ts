import { test } from '@japa/runner'

import CarFactory from 'Database/factories/CarFactory'
import OwnerFactory from 'Database/factories/OwnerFactory'

import { route } from '../../../helpers/Functions/Router'

test.group('Cars Validation', (group) => {
  group.transaction()

  test('it should not be able to create a car without required data', async ({ client }) => {
    const response = await client.post(route('cars.store'))

    response.assertStatus(422)
    response.assertInvalid(['name', 'manufacturer', 'brand', 'yearOfManufacture', 'ownerId'])
  })

  test('it should not be able to create a car without valid data', async ({ client }) => {
    const owner = await OwnerFactory.create()

    const car = await CarFactory.merge({ ownerId: owner.id }).make()

    const request = {
      ...car,
      name: 12345,
      ownerId: 'teste',
    }

    const response = await client.post(route('cars.store')).json(request)

    response.assertStatus(422)
    response.assertInvalid(['name', 'ownerId'])
  })

  test('it should not be able to create a car with duplicate unique data', async ({ client }) => {
    const firstCar = await CarFactory.with('owner').create()

    const secondCar = await CarFactory.merge({
      ownerId: firstCar.owner.id,
      brand: firstCar.brand,
    }).make()

    const response = await client.post(route('cars.store')).json(secondCar)

    response.assertStatus(422)
    response.assertInvalid(['brand'])
  })

  test('it should not be able to update a car without valid data', async ({ client }) => {
    const car = await CarFactory.with('owner').create()

    const request = {
      ...car,
      name: 12345,
      ownerId: 'teste',
    }

    const response = await client.put(route('cars.update', { id: car.id })).json(request)

    response.assertStatus(422)
    response.assertInvalid(['name', 'ownerId'])
  })

  test('it should not be able to update a car with duplicate unique data', async ({ client }) => {
    const firstCar = await CarFactory.with('owner').create()
    const secondCar = await CarFactory.with('owner').create()

    const request = {
      ...secondCar,
      brand: firstCar.brand,
    }

    const response = await client.put(route('cars.update', { id: secondCar.id })).json(request)

    response.assertStatus(422)
    response.assertInvalid(['brand'])
  })
})
