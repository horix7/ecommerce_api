import { Router } from 'express';

import Validator from '@middlewares/validator';
import AuthGuard from '@middlewares/authenticate';
import Controller from './products.controller';
import Caching from '../../middlewares/cachingresults'

const router = Router();

router.get('/shop', Caching.cacheMiddleware,  Controller.getAllProducts());
router.get('/products', Caching.cacheMiddleware,  Controller.getAllProductsFeat());


router.get('/products/home', Caching.cacheMiddleware,  Controller.getHomeProducts());

router.get(
  '/products/:id',
  Validator.validate('idParam'),
  Controller.getProduct()
);

router.get(
  '/product/search',
  Caching.cacheMiddleware,
  Controller.searchProducResults()
);

router.get(
  '/products/collection/:collection',
  Caching.cacheMiddleware,
  Controller.getProductByColection()
);

/* Create a product */
router.post(
  '/products',
  AuthGuard.verifyToken,
  Validator.validate('createProduct'),
  Controller.createProduct()
);

/* Edit a specific product */
router.put(
  '/products/:id',
  AuthGuard.verifyToken,
  AuthGuard.adminOnly,
  Validator.validate('idParam'),
  Controller.updateProduct()
);

/* Delete a product */
router.delete(
  '/products/:id',
  AuthGuard.verifyToken,
  AuthGuard.adminOnly,
  Validator.validate('idParam'),
  Controller.destroyProduct()
);

export default router;
