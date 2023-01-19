import Owner from 'App/Models/Owner'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Owner, ({ faker }) => {
  return {
    name: faker.name.fullName(),
  }
}).build()
