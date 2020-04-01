const Controller = require( "./Controller");
const ProductService = require( "../../services/ProductService");
const Product = require( "../../database/models/Product");
const productService = new ProductService(new Product().getInstance());

class ProductController extends Controller {
  constructor(service) {
    super(service);
  }
}

module.exports = new ProductController(productService);
