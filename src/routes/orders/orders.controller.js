import OrderService from '@services/order.service';
import ExceptionHandler from '@helpers/exception';
import BaseController from '../base-controller';
import RawQueryService from "../../services/rawQueries.service"
import user from '@factories/user';


class OrdersController extends BaseController {

  getOrders() {
    return this.asyncWrapper(async (req, res) => {
      const { id: userId } = req.user;
      const orders = await this.service.findWhereId(userId);

      this.sendResponse(res, orders);
    });
  }


  /**
   * Fetch a specific order by id
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof OrdersController
   */
  getOrder() {
    return this.asyncWrapper(async (req, res) => {
      const {
        params: { id: orderId },
        user: { id: userId }
      } = req;
      const product = await this.service.find(
        { id: orderId, userId },
        { plain: true }
      );

      ExceptionHandler.throwErrorIfNull(product);

      this.sendResponse(res, product);
    });
  }

  /**
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof OrdersController
   */
  placeOrder() {
    return this.asyncWrapper(async (req, res) => {
      const { id: userId } = req.user;
      const order = await this.service.placeOrder({ userId }, req.body);

      this.sendResponse(res, order, undefined, 201);
    });
  }

  getReferals() {
    return this.asyncWrapper(async (req, res) => {
      const referals = await this.service.getReferalMade();
      this.sendResponse(res, referals, undefined, 200);
    });
  }

  getReferalByUser() {
    return this.asyncWrapper(async (req, res) => {
      let referals = await this.service.getReferalMade();
      referals = referals.filter(req.params.email)
      this.sendResponse(res, referals, undefined, 200);
    });
  }

  /**
   * Cancel an order
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof OrdersController
   */
  cancelOrder() {
    return this.asyncWrapper(async (req, res) => {
      const {
        params: { id: orderId },
        user: { id: userId }
      } = req;
      const order = await this.service.cancelOrder(userId, orderId);

      this.sendResponse(res, order);
    });
  }

  /**
   * Update an order
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof OrdersController
   */
  updateOrder() {
    return this.asyncWrapper(async (req, res) => {
      const {
        body,
        params: { id: orderId }
      } = req;
      const order = await this.service.update(orderId, body);

      this.sendResponse(res, order);
    });
  }
  

  getAllOrders() {
    return this.asyncWrapper(async (req, res) => {
      
      const order = await this.service.getAllOrdersWithUsers();

      this.sendResponse(res, order);
    });
  }
}

const controller = new OrdersController(OrderService);
export default controller;
