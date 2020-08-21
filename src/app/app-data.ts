import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ProductData } from './products/product-data';
import { ProductCategoryData } from './product-categories/product-category-data';
import { SupplierData } from './supplier/supplier-data';
import { IProduct } from './products/products';
import { ProductCategory } from './product-categories/product-category';
import { Supplier } from './supplier/supplier';

export class AppData implements InMemoryDbService {

  createDb(): {products: IProduct[], productCategories: ProductCategory[], suppliers: Supplier[]} {
    const products = ProductData.products;  
    const productCategories = ProductCategoryData.categories;
    const suppliers = SupplierData.suppliers;
    return { products, productCategories, suppliers };
  }
}