import AuthService from '@services/auth.service';
import BaseController from '../base-controller';

class AuthController extends BaseController {
  
  register() {

    return this.asyncWrapper(async (req, res) => {

      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        location: req.body.location,
        phone: req.body.phone,
        password: req.body.password
      };
      const payload = await AuthService.register(user);
      console.log("arrived")

      this.sendResponse(res, payload, undefined, 201);
    });
  }

  login() {
    return this.asyncWrapper(async (req, res) => {
      console.log(req.body)
      const { email, password } = req.body;
      const payload = await AuthService.login(email, password);

      this.sendResponse(res, payload);
    });
  }

  Adminlogin() {
    return this.asyncWrapper(async (req, res) => {
      console.log(req.body)
      const { email, password } = req.body;
      const payload = await AuthService.Adminlogin(email, password);

      this.sendResponse(res, payload);
    });
  }
}

const controller = new AuthController(AuthService);
export default controller;
