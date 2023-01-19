import { test } from '@japa/runner'

import { route } from '../../../helpers/Functions/Router'

import OwnerFactory from 'Database/factories/OwnerFactory'

test.group('Owners Validation', () => {
  test('it should not be able to create a owner without required data', async ({ client }) => {
    const response = await client.post(route('owners.store'))

    response.assertStatus(422)
  })

  test('it should not be able to create a owner without valid data', async ({ client }) => {
    const owner = await OwnerFactory.make()

    const request = {
      ...owner,
      name: 1245,
    }

    const response = await client.post(route('owners.store')).json(request)

    response.assertStatus(422)
    response.assertInvalid(['name'])
  })

  test('it should not be able to store a owner with duplicate unique data', async ({ client }) => {
    const firstOwner = await OwnerFactory.create()

    const secondOwner = await OwnerFactory.merge({
      email: firstOwner.email,
      phoneNumber: firstOwner.phoneNumber,
    }).make()

    const response = await client.post(route('owners.store')).json(secondOwner)

    response.assertStatus(422)
    response.assertInvalid(['email', 'phoneNumber'])
  })

  test('it should not be able to update without valid data', async ({ client }) => {
    const owner = await OwnerFactory.create()

    const request = {
      ...owner,
      name: 12345,
    }

    const response = await client.put(route('owners.update', { id: owner.id })).json(request)

    response.assertStatus(422)
  })

  test('it should not be able to update a owner with duplicate unique data', async ({ client }) => {
    const firstOwner = await OwnerFactory.create()
    const secondOwner = await OwnerFactory.create()

    const request = {
      ...secondOwner,
      email: firstOwner.email,
      phoneNumber: firstOwner.phoneNumber,
    }

    const response = await client.put(route('owners.update', { id: secondOwner.id })).json(request)

    response.assertStatus(422)
    response.assertInvalid(['email', 'phoneNumber'])
  })
})
