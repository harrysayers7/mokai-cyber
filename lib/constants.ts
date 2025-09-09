// Essential Eight Controls and Maturity Levels
// Hard-coded as per government requirements

export const ESSENTIAL_EIGHT = [
  { id: 'app-control', name: 'Application Control' },
  { id: 'patch-apps', name: 'Patch Applications' },
  { id: 'ms-office', name: 'Configure Microsoft Office Macro Settings' },
  { id: 'user-apps', name: 'User Application Hardening' },
  { id: 'admin-priv', name: 'Restrict Administrative Privileges' },
  { id: 'patch-os', name: 'Patch Operating Systems' },
  { id: 'mfa', name: 'Multi-Factor Authentication' },
  { id: 'backup', name: 'Regular Backups' }
] as const;

export const MATURITY_LEVELS = [
  { level: 0, name: 'Not Implemented', color: 'red' },
  { level: 1, name: 'Partially Implemented', color: 'orange' },
  { level: 2, name: 'Largely Implemented', color: 'yellow' },
  { level: 3, name: 'Fully Implemented', color: 'green' }
] as const;

export type ControlId = typeof ESSENTIAL_EIGHT[number]['id'];
export type MaturityLevel = typeof MATURITY_LEVELS[number]['level'];