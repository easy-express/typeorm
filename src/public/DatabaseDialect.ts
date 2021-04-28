// The possible database dialects supported
export const DATABASE_DIALECTS = ['mysql', 'mssql', 'sqlite', 'postgres', 'mariadb', 'mongodb'] as const;
export type DatabaseDialect = typeof DATABASE_DIALECTS[number];

export function isDatabaseDialect(str: string): str is DatabaseDialect {
  return DATABASE_DIALECTS.includes(str as DatabaseDialect);
}
