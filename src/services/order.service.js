import models from '@models';
import ExceptionHandler from '@helpers/exception';
import BaseService from './base.service';
import CartService from './cart.service';

class OrderService extends BaseService {
  async placeOrder(payload, body) {
    const { userId } = payload;
    const cart = await CartService.cart(userId);
    const orderData = {
      userId: cart.userId,
      items: cart.cartItem.items,
      grandTotal: cart.cartItem.totalAmount,
      location: body.location,
      street: body.street,
      message: body.message,
    };
    const order = await super.create(orderData, { plain: true });

    CartService.clearCart(cart);

    return order;
  }


  async getAllOrders() {
  
    const order = await super.findAllOrders();
  
    return order;
  }

  async cancelOrder(userId, orderId) {
    const order = await super.find({ id: orderId, userId });

    ExceptionHandler.throwErrorIfNull(order);

    if (order.status === 'completed') {
      ExceptionHandler.throwOperationOutOfBound();
    }

    order.status = 'cancelled';
    await order.save();
    return order;
  }
}

const { Order } = models;
export default new OrderService(Order);
