type SessionLike =
  | {
      user?: {
        role?: string;
      };
    }
  | null
  | undefined;

export function hasAdminAccess(session: SessionLike): boolean {
  return session?.user?.role === 'ADMIN';
}
