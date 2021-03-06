import { hash, compare } from 'bcryptjs';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  /**
   * generateHash
   */
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  /**
   * compareHash
   */
  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
