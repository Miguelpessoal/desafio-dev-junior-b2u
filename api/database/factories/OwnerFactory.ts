import Owner from 'App/Models/Owner'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Owner, ({ faker }) => {
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number('+55 (##) ########'),
    address: faker.address.streetAddress(),
  }
}).build()
