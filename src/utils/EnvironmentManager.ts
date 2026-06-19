import { ENV_URLS } from '../../config/environments.config';

export class EnvironmentManager {
  private static readonly ENV_URLS = ENV_URLS;

  /**
   * Retrieves the current environment name from the ENV environment variable.
   * Defaults to 'QA_UPGRADE' if not set.
   */
  public static getEnv(): string {
    const env = process.env.ENV;
    if (!env) {
      return 'QA_UPGRADE';
    }
    const upperEnv = env.toUpperCase();
    if (!this.ENV_URLS[upperEnv]) {
      throw new Error(
        `Invalid environment specified in ENV variable: '${env}'. Supported environments are: ${Object.keys(
          this.ENV_URLS
        ).join(', ')}`
      );
    }
    return upperEnv;
  }

  /**
   * Retrieves the base URL for the current environment.
   */
  public static getBaseUrl(): string {
    return this.ENV_URLS[this.getEnv()];
  }
}
