import { test } from '@japa/runner'

import { route } from '../../../helpers/Functions/Router'

import CarFactory from 'Database/factories/CarFactory'
import OwnerFactory from 'Database/factories/OwnerFactory'

import Car from 'App/Models/Car'

test.group('Crud Cars', (group) => {
  group.transaction()

  test('it should be able to list cars', async ({ client, assert }) => {
    await CarFactory.with('owner').createMany(20)

    const response = await client.get(route('cars.index'))

    response.assertStatus(200)

    const data = response.body()

    assert.lengthOf(data, 20)
  })

  test('it should be able to create a car', async ({ client, assert }) => {
    const owner = await OwnerFactory.create()

    const request = await CarFactory.merge({ ownerId: owner.id }).make()

    const response = await client.post(route('cars.store')).json(request)

    response.assertStatus(201)

    const createdCar = await Car.query().first()

    assert.isNotNull(createdCar)
    response.assertJsonStructure([
      'name',
      'manufacturer',
      'brand',
      'yearOfManufacture',
      'description',
      'ownerId',
    ])
  })

  test('it should be able to update a car', async ({ client, expect }) => {
    const car = await CarFactory.with('owner').create()

    const request = { name: 'New Car' }

    const response = await client.put(route('cars.update', { id: car.id })).json(request)

    response.assertStatus(200)

    const updatedCar = await Car.findOrFail(car.id)

    expect(updatedCar.name).toBe(request.name)
    response.assertJsonStructure(['name'])
  })

  test('it should be able to delete a car', async ({ client, expect }) => {
    const car = await CarFactory.with('owner').create()

    const response = await client.delete(route('cars.destroy', { id: car.id }))

    response.assertStatus(204)

    const deletedCar = await Car.find(car.id)

    expect(deletedCar).toBeNull()
  })

  test('it should be able to show a car', async ({ client }) => {
    const car = await CarFactory.with('owner').create()

    const response = await client.get(route('cars.show', { id: car.id }))

    response.assertStatus(200)
    response.assertJsonStructure([
      'name',
      'manufacturer',
      'brand',
      'yearOfManufacture',
      'description',
      'ownerId',
    ])
  })
})
