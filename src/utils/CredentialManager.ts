import { CREDENTIALS_STORE, UserCredentials, UserRole } from '../../config/credentials.config';
import { EnvironmentManager } from './EnvironmentManager';

export class CredentialManager {
  /**
   * Dynamically loads and returns credentials for a specified user role based on the current environment.
   * Checks environment variables first (e.g., QA_UPGRADE_ADMIN_USERNAME) and falls back to credentials.config.ts defaults.
   *
   * @param role The user role (e.g., 'Admin', 'Supervisor')
   */
  public static getCredentials(role: UserRole): UserCredentials {
    const env = EnvironmentManager.getEnv();
    const envKey = env.toUpperCase().replace(/[^A-Z0-9]/g, '_');
    const roleKey = role.toUpperCase().replace(/[^A-Z0-9]/g, '_');

    // Generate environment variable keys
    const envUsernameVar = `${envKey}_${roleKey}_USERNAME`;
    const envPasswordVar = `${envKey}_${roleKey}_PASSWORD`;

    const usernameEnv = process.env[envUsernameVar];
    const passwordEnv = process.env[envPasswordVar];

    if (usernameEnv && passwordEnv) {
      return {
        username: usernameEnv,
        password: passwordEnv
      };
    }

    // Fallback to configured defaults
    const envCredentials = CREDENTIALS_STORE[env];
    if (!envCredentials || !envCredentials[role]) {
      throw new Error(
        `Credentials configuration not found for environment: '${env}' and role: '${role}'.`
      );
    }

    return envCredentials[role];
  }
}
export { UserRole, UserCredentials };
