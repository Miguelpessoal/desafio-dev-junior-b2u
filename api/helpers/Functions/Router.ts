import Route, { MakeUrlOptions } from '@ioc:Adonis/Core/Route'

export function route(
  routeIdentifier: string,
  params?: any[] | MakeUrlOptions,
  options?: MakeUrlOptions
) {
  return Route.makeUrl(routeIdentifier, params, options)
}
