export interface UserCredentials {
  username: string;
  password: string;
}

export type UserRole = 'Admin' | 'Supervisor' | 'Manager' | 'Adjuster' | 'Claims Examiner' | 'Read Only User';

// Default mock credentials structure for testing
// In production, these should be loaded from secure environment variables or vault.
export const CREDENTIALS_STORE: Record<string, Record<UserRole, UserCredentials>> = {
  DEV: {
    Admin: { username: 'dev_admin', password: 'DevPassword123!' },
    Supervisor: { username: 'dev_supervisor', password: 'DevPassword123!' },
    Manager: { username: 'dev_manager', password: 'DevPassword123!' },
    Adjuster: { username: 'dev_adjuster', password: 'DevPassword123!' },
    'Claims Examiner': { username: 'dev_examiner', password: 'DevPassword123!' },
    'Read Only User': { username: 'dev_readonly', password: 'DevPassword123!' }
  },
  DEVAT: {
    Admin: { username: 'devat_admin', password: 'DevatPassword123!' },
    Supervisor: { username: 'devat_supervisor', password: 'DevatPassword123!' },
    Manager: { username: 'devat_manager', password: 'DevatPassword123!' },
    Adjuster: { username: 'devat_adjuster', password: 'DevatPassword123!' },
    'Claims Examiner': { username: 'devat_examiner', password: 'DevatPassword123!' },
    'Read Only User': { username: 'devat_readonly', password: 'DevatPassword123!' }
  },
  QA: {
    Admin: { username: 'admin', password: 'adm@usqc6' },
    Supervisor: { username: 'qa_supervisor', password: 'QaPassword123!' },
    Manager: { username: 'qa_manager', password: 'QaPassword123!' },
    Adjuster: { username: 'qa_adjuster', password: 'QaPassword123!' },
    'Claims Examiner': { username: 'qa_examiner', password: 'QaPassword123!' },
    'Read Only User': { username: 'qa_readonly', password: 'QaPassword123!' }
  },
  QA2: {
    Admin: { username: 'admin', password: 'adm@usqc6' },
    Supervisor: { username: 'qa2_supervisor', password: 'Qa2Password123!' },
    Manager: { username: 'qa2_manager', password: 'Qa2Password123!' },
    Adjuster: { username: 'qa2_adjuster', password: 'Qa2Password123!' },
    'Claims Examiner': { username: 'qa2_examiner', password: 'Qa2Password123!' },
    'Read Only User': { username: 'qa2_readonly', password: 'Qa2Password123!' }
  },
  CLOUDQA: {
    Admin: { username: 'cloudqa_admin', password: 'CloudQaPassword123!' },
    Supervisor: { username: 'cloudqa_supervisor', password: 'CloudQaPassword123!' },
    Manager: { username: 'cloudqa_manager', password: 'CloudQaPassword123!' },
    Adjuster: { username: 'cloudqa_adjuster', password: 'CloudQaPassword123!' },
    'Claims Examiner': { username: 'cloudqa_examiner', password: 'CloudQaPassword123!' },
    'Read Only User': { username: 'cloudqa_readonly', password: 'CloudQaPassword123!' }
  },
  UAT: {
    Admin: { username: 'uat_admin', password: 'UatPassword123!' },
    Supervisor: { username: 'uat_supervisor', password: 'UatPassword123!' },
    Manager: { username: 'uat_manager', password: 'UatPassword123!' },
    Adjuster: { username: 'uat_adjuster', password: 'UatPassword123!' },
    'Claims Examiner': { username: 'uat_examiner', password: 'UatPassword123!' },
    'Read Only User': { username: 'uat_readonly', password: 'UatPassword123!' }
  },
  QA_UPGRADE: {
    Admin: { username: 'admin', password: 'adm@usqc6' },
    Supervisor: { username: 'qaupgrade_supervisor', password: 'QaUpgradePassword123!' },
    Manager: { username: 'qaupgrade_manager', password: 'QaUpgradePassword123!' },
    Adjuster: { username: 'qaupgrade_adjuster', password: 'QaUpgradePassword123!' },
    'Claims Examiner': { username: 'qaupgrade_examiner', password: 'QaUpgradePassword123!' },
    'Read Only User': { username: 'qaupgrade_readonly', password: 'QaUpgradePassword123!' }
  }
};
