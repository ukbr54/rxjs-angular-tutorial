import { IProduct } from './products';

export class ProductData {
    static products: IProduct[] = [
        {
            productId: 1,
            productName: "Leaf Rake",
            productCode: "GDN-0011",
            releaseDate: "March 19, 2019",
            description: "Leaf rake with 48-inch wooden handle.",
            price: 19.95,
            starRating: 3.2,
            imageUrl: "assets/images/leaf_rake.png",
            categoryId: 1,
            supplierIds: [1, 2]
          },
          {
            productId: 2,
            productName: "Garden Cart",
            productCode: "GDN-0023",
            releaseDate: "March 18, 2019",
            description: "15 gallon capacity rolling garden cart",
            price: 32.99,
            starRating: 4.2,
            imageUrl: "assets/images/garden_cart.png",
            categoryId: 1,
            supplierIds: [3, 4]
          },
          {
            productId: 5,
            productName: "Hammer",
            productCode: "TBX-0048",
            releaseDate: "May 21, 2019",
            description: "Curved claw steel hammer",
            price: 8.9,
            starRating: 4.8,
            imageUrl: "assets/images/hammer.png",
            categoryId: 3,
            supplierIds: [5, 6]
          },
          {
            productId: 8,
            productName: "Saw",
            productCode: "TBX-0022",
            releaseDate: "May 15, 2019",
            description: "15-inch steel blade hand saw",
            price: 11.55,
            starRating: 3.7,
            imageUrl: "assets/images/saw.png",
            categoryId: 3,
            supplierIds: [7, 8]
          },
          {
            productId: 10,
            productName: "Video Game Controller",
            productCode: "GMG-0042",
            releaseDate: "October 15, 2018",
            description: "Standard two-button video game controller",
            price: 35.95,
            starRating: 4.6,
            imageUrl: "assets/images/xbox-controller.png",
            categoryId: 5,
            supplierIds: [9, 10]
          }
    ];    
}