export type Role = 'MANAGER' | 'STAFF' | 'CLIENT'
type Action = 'read'|'create'|'update'|'delete'
export function can(role: Role, action: Action, entity: string) {
  if (role === 'MANAGER') return true
  if (role === 'STAFF') return action !== 'delete' && entity !== 'billing'
  if (role === 'CLIENT') return ['read','create'].includes(action) && entity !== 'admin'
  return false
}
