export type Role = 'ADMIN' | 'EMPLOYEE' | 'CLIENT' | 'JOB_SEEKER';

export function isAdmin(role?: string): boolean {
  return role === 'ADMIN';
}

export function isEmployee(role?: string): boolean {
  return role === 'EMPLOYEE' || role === 'ADMIN';
}

export function isClient(role?: string): boolean {
  return role === 'CLIENT' || role === 'ADMIN';
}

export function isJobSeeker(role?: string): boolean {
  return role === 'JOB_SEEKER';
}
