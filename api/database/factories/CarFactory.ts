import Car from 'App/Models/Car'
import Factory from '@ioc:Adonis/Lucid/Factory'

import OwnerFactory from './OwnerFactory'

export default Factory.define(Car, ({ faker }) => {
  return {
    name: faker.vehicle.model(),
    manufacturer: faker.vehicle.manufacturer(),
    brand: faker.vehicle.vrm(),
    yearOfManufacture: faker.datatype.number({ min: 1886, max: 2023 }),
    yearOfModel: faker.datatype.number({ min: 1886, max: 2023 }),
    description: faker.lorem.sentence(5),
  }
})
  .relation('owner', () => OwnerFactory)
  .build()
