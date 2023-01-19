import { test } from '@japa/runner'

import { route } from '../../../helpers/Functions/Router'

import OwnerFactory from 'Database/factories/OwnerFactory'

import Owner from 'App/Models/Owner'

test.group('Crud Owners', (group) => {
  group.transaction()

  test('it should be able to list owners', async ({ client, assert }) => {
    await OwnerFactory.createMany(20)

    const response = await client.get(route('owners.index'))

    response.assertStatus(200)

    const data = response.body()

    assert.lengthOf(data, 20)
  })

  test('it should be able to create a owner', async ({ client, assert }) => {
    const request = await OwnerFactory.make()

    const response = await client.post(route('owners.store')).json(request)

    response.assertStatus(201)

    const createdOwner = await Owner.query().first()

    assert.isNotNull(createdOwner)
  })

  test('it should be able to update a car', async ({ client, expect }) => {
    const owner = await OwnerFactory.create()

    const request = { name: 'New Owner' }

    const response = await client.put(route('owners.update', { id: owner.id })).json(request)

    response.assertStatus(200)

    const updatedOwner = await Owner.findOrFail(owner.id)

    expect(updatedOwner.name).toBe(request.name)
    response.assertJsonStructure(['name'])
  })

  test('it should be able to delete a owner', async ({ client, expect }) => {
    const owner = await OwnerFactory.create()

    const response = await client.delete(route('owners.destroy', { id: owner.id }))

    response.assertStatus(204)

    const deletedOwner = await Owner.find(owner.id)

    expect(deletedOwner).toBeNull()
  })

  test('it should be able to show a owner', async ({ client }) => {
    const owner = await OwnerFactory.create()

    const response = await client.get(route('owners.show', { id: owner.id }))

    response.assertStatus(200)
    response.assertJsonStructure(['name'])
  })
})
