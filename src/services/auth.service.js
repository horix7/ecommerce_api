import bcrypt from 'bcryptjs';
import createError from 'http-errors';

import UserService from '@services/user.service';
import JWTService from '@services/jwt.service';

import { messages } from '@helpers/constants';

/**
 * @export
 * @class AuthService
 */
class AuthService {
  static async register(user) {
    const newUser = await UserService.create(user, { plain: true });

    const token = JWTService.sign(newUser);
    return { ...newUser, token };
  }

  static async login(email, password) {
    // fetch user data
    const user = await UserService.getByEmail(email, { plain: true });

    // compare password
    if (!bcrypt.compareSync(password, user.password)) {
      const { INVALID_CREDENTIALS } = messages;
      throw createError(403, INVALID_CREDENTIALS);
    }

    // generate jwt token from user payload
    delete user.password;
    const token = JWTService.sign(user);
    return { ...user, token };
  }

  static async Adminlogin(email, password) {
    // fetch user data
    const user = await UserService.getByEmail(email, { plain: true });

    // compare password
    if (!bcrypt.compareSync(password, user.password)) {
      const { INVALID_CREDENTIALS } = messages;
      throw createError(403, INVALID_CREDENTIALS);
    }

    // generate jwt token from user payload
    delete user.password;
    const isAdmin =  user.isAdmin;
    if(isAdmin) {
      const token = JWTService.sign(user);
    return { ...user, token };
    }else {
      throw new Error("not An Admin ")
    }
  }
}

export default AuthService;
