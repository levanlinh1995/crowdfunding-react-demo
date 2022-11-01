export const checkPermission = (roles: string[] | undefined, scopes: (string | undefined)[]) => {
  const scopesMap: { [key: string]: boolean } = {}
  scopes.forEach((scope) => {
    if (scope) {
      scopesMap[scope] = true
    }
  })
  return roles && roles.some((roles) => scopesMap[roles])
}
