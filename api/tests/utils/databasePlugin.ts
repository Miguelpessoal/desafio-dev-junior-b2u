import Database from '@ioc:Adonis/Lucid/Database'
import { PluginFn } from '@japa/runner'

declare module '@japa/runner' {
  interface Group {
    /**
     * Start a global transaction before all the
     * tests and roll back it after the tests.
     */
    transaction: () => void
  }
}

export function databasePlugin() {
  const plugin: PluginFn = (_config, _runner, { Group }) => {
    Group.macro('transaction', function () {
      this.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
      })
    })
  }

  return plugin
}
