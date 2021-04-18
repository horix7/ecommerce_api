import ProductService from '@services/product.service';
import ExceptionHandler from '@helpers/exception';
import BaseController from '../base-controller';

class ProductsController extends BaseController {
  /**
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof ProductsController
   */
  getAllProducts() {
    return this.asyncWrapper(async (req, res) => {
      let products = await this.service.getAll({ plain: true });
       products = products.map(elem => {
        const { id, title, description, price, collection, createdAt, updatedAt} = elem
        
        try {
          const imageAddress = JSON.parse(elem.imageUrl)
          const imageUrl = imageAddress[0]
          return {
            id,title, description,price,collection,createdAt, updatedAt, imageUrl, imageAddress
          }
        } catch(error) {
          return {
            id,title, description,price,collection,createdAt, updatedAt, imageUrl: elem.imageUrl, imageAddress : [elem.imageUrl]
          }
        }
        
      })

      this.sendResponse(res, products);
    });
  }

  /**
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof ProductsController
   */
  getProduct() {
    return this.asyncWrapper(async (req, res) => {
      const { id: productId } = req.params;
      let product = await this.service.getById(productId, { plain: true });

      ExceptionHandler.throwErrorIfNull(product);
      const { id, title, description, price, collection, createdAt, updatedAt} = product
        
      try {
        const imageAddress = JSON.parse(product.imageUrl)
        const imageUrl = imageAddress[0]
        product =  {
          id,title, description,price,collection,createdAt, updatedAt, imageUrl, imageAddress
        }
      } catch(error) {
        product =  {
          id,title, description,price,collection,createdAt, updatedAt, imageUrl: product.imageUrl, imageAddress : [product.imageUrl]
        }
      }
      this.sendResponse(res, product);
    });
  }

  /**
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof ProductsController
   */
  createProduct() {
    return this.asyncWrapper(async (req, res) => {
      const { body } = req;
      const product = await this.service.create(body, { plain: true });

      this.sendResponse(res, product, undefined, 201);
    });
  }

  /**
   * Update a user resource
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof ProductsController
   */
  updateProduct() {
    return this.asyncWrapper(async (req, res) => {
      const {
        body,
        params: { id: productId }
      } = req;
      const product = await this.service.update(productId, body);

      this.sendResponse(res, product);
    });
  }

  /**
   * Remove a specific user
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof ProductsController
   */
  destroyProduct() {
    return this.asyncWrapper(async (req, res) => {
      const { id: productId } = req.params;

      await this.service.delete(productId);
      this.sendResponse(res, null, null, 204);
    });
  }



  getProductByColection()  {
    return this.asyncWrapper(async (req, res) => {

      let products = await this.service.findWhereCollection(req.params.collection);
      products = products.map(elem => {
        const { id, title, description, price, collection, createdAt, updatedAt} = elem
        
        try {
          const imageAddress = JSON.parse(elem.imageUrl)
          const imageUrl = imageAddress[0]
          return {
            id,title, description,price,collection,createdAt, updatedAt, imageUrl, imageAddress
          }
        } catch(error) {
          return {
            id,title, description,price,collection,createdAt, updatedAt, imageUrl: elem.imageUrl, imageAddress : [elem.imageUrl]
          }
        }
        
      })
      this.sendResponse(res, products);
    });
  }

  searchProducResults()  {
    return this.asyncWrapper(async (req, res) => {

      let products = await this.service.SearchProducts(req.query.q);
      products = products.map(elem => {
        const { id, title, description, price, collection, createdAt, updatedAt} = elem
        
        try {
          const imageAddress = JSON.parse(elem.imageUrl)
          const imageUrl = imageAddress[0]
          return {
            id,title, description,price,collection,createdAt, updatedAt, imageUrl, imageAddress
          }
        } catch(error) {
          return {
            id,title, description,price,collection,createdAt, updatedAt, imageUrl: elem.imageUrl, imageAddress : [elem.imageUrl]
          }
        }
        
      })
      this.sendResponse(res, products);
    });
  }
}

const controller = new ProductsController(ProductService);
export default controller;
