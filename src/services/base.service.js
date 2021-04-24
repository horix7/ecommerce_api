import ExceptionHandler from '@helpers/exception';
import { QueryTypes } from 'sequelize';

export default class BaseService {
  constructor(model) {
    this.model = model;
  }

  /**
   * Get a list of resources
   *
   * @param {object} options - Query options
   * @returns {Array} List of users
   * @memberof BaseService
   */
  async getAll(options = {}) {
    const { plain, ...option } = options;

    console.log(options)
    const rows = await this.model.findAll(option);

    return plain === true ? rows.map(row => row.get({ plain })) : rows;
  }

  getFeaturedProducts = async () => {
    const convertProduct  = (products) => {
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

      return products
    }
    const featured = await this.model.sequelize.query(`select * from \"Products\"  order by "createdAt" desc  LIMIT 50`)
    return convertProduct(featured[0])

  } 



  async HomePageQuery() {

    const jordans = await this.model.sequelize.query(`select * from \"Products\" where collection=\'${"JORDANs"}\'   order by "createdAt" desc  LIMIT 8`)
    const NIKEDUNKs = await this.model.sequelize.query(`select * from \"Products\" where collection=\'${"NIKE DUNKs"}\'  order by "createdAt" desc  LIMIT 8`)
    const NEWBALANCE = await this.model.sequelize.query(`select * from \"Products\" where collection=\'${"NEW BALANCE"}\'  order by "createdAt" desc  LIMIT 8`)
    const YEEZY = await this.model.sequelize.query(`select * from \"Products\" where collection=\'${"YEEZY"}\'  order by "createdAt" desc  LIMIT 8`)
    const air_max = await this.model.sequelize.query(`select * from \"Products\" where collection=\'${"AIR MAX"}\'  order by "createdAt" desc  LIMIT 8`)
    const air_force = await this.model.sequelize.query(`select * from \"Products\" where collection=\'${"AIR FORCE"}\'  order by "createdAt" desc  LIMIT 8`)

    const convertProduct  = (products) => {
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

      return products
    }
    return {
      AIRFORCE: convertProduct(air_force[0]),
      JORDAN: convertProduct(jordans[0]),
      AIRMAX: convertProduct(air_max[0]),
      YEEZY: convertProduct(YEEZY[0]),
      NEWBALANCE: convertProduct(NEWBALANCE[0]),
      NIKEDUNKs: convertProduct(NIKEDUNKs[0]),

    }
  }



  async findDatabaseStats() {
    const productsCounts = await this.model.sequelize.query("select count(*) from \"Products\"")
    const userCount = await this.model.sequelize.query("select count(*) from \"Users\"")
    const orderCount = await this.model.sequelize.query("select count(*) from \"Orders\"")
    const revenue = await this.model.sequelize.query("select \"grandTotal\" from \"Orders\"")

    try {
    
      return {
        products: productsCounts[0][0].count,
        users: userCount[0][0].count,
        orders: orderCount[0][0].count,
        revenue: revenue[0].map(elem => elem.grandTotal).reduce((a,b) => a + b)  
      }
    } catch (error) {
      return {
        products: productsCounts[0][0].count,
        users: userCount[0][0].count,
        orders: orderCount[0][0].count,
        revenue: 0
      }
    }
  }


  async findWhereId(id) {
    const rows = await this.model.sequelize.query(`select * from \"Orders\" where \"userId\"=${id}`, {
      plain: false,
      raw: true,
      type: QueryTypes.SELECT
    });
    
      return rows 
  } 
  

  async findWhereCollection(collection) {
    const rows = await this.model.sequelize.query(`select * from \"Products\" where \"collection\"=\'${collection}\'`, {
      plain: false,
      raw: true,
      type: QueryTypes.SELECT
    });
    
      return rows 
  } 
  
  

  async SearchProducts(description) {
    const query = description.split(" ").join("&").split("&&").join("&").split("&&").join("&")
    const rows = await this.model.sequelize.query(`select * from "Products" where to_tsvector(title || '' || description) @@ to_tsquery(\'${query}\')`, {
      plain: false,
      raw: true,
      type: QueryTypes.SELECT
    });
    
      return rows 
  } 
  
  


  async findAllOrdersIncludeUser(options = {}) {
    const { plain, ...option } = options;
    const rows = await this.model.findAll(option)

    return  rows;
  }

  async findAllOrders(options = {}) {
    const { plain, ...option } = options;
    const rows = await this.model.findAll(option);

    return plain === true ? rows.map(row => row.get({ plain })) : rows;
  }

  /**
   * Get a specific resource by id
   *
   * @param {number} id - The resource unique identifier
   * @param {object} options - Query options
   * @returns {object} The resource (if found)
   * @memberof BaseService
   */
  async getById(id, options = {}) {
    const { plain, ...option } = options;
    const row = await this.model.findByPk(id, option);

    return row && plain === true ? row.get({ plain }) : row;
  }

  /**
   * Search for a specific resource using the WHERE clause
   *
   * @param {object} where - Where clause
   * @param {object} options - Query options
   * @returns {object} The resource (if found)
   * @memberof BaseService
   */
  async find(where, options = {}) {
    const row = await this.model.findOne({ where });
    const { plain } = options;

    return row && plain === true ? row.get({ plain }) : row;
  }
  
  /**
   * Create a new resource
   *
   * @param {object} data - The resource data
   * @param {object} options - Query options
   * @returns {object} The newly created resource
   * @memberof BaseService
   */
  async create(data, options = {}) {
    const row = await this.model.create(data);

    return options.plain === true ? row.toJSON() : row;
  }

  /**
   * Update a specific resource
   *
   * @param {number} id - The resource unique identifier
   * @param {object} data - The resource new data
   * @returns {number} The number of affected row(s)
   * @memberof BaseService
   */
  async update(id, values) {
    const row = await this.model.findByPk(id);

    ExceptionHandler.throwErrorIfNull(row);

    const result = await row.update(values);
    const plainData = result.get({ plain: true });

    delete plainData.deletedAt;
    return plainData;
  }

  /**
   * Delete a specific resource
   *
   * @param {number} id - The resource unique identifier
   * @returns {object} The updated resource
   * @memberof BaseService
   */
  async delete(id) {
    return this.model.destroy({ where: { id } });
  }
}
