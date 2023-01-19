import Config from '@ioc:Adonis/Core/Config'

export function config(key: string, defaultValue?: any) {
  return Config.get(key, defaultValue)
}
