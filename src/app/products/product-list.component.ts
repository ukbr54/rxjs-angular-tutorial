import { Component, OnInit } from '@angular/core';
import { IProduct } from './products';
import { ProductService } from './product.service';


@Component({
   selector: 'pm-products',
   templateUrl: './product-list.component.html',
   styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit{ 
    
   pageTitle: string = 'Product List';
   imageWidth = 50;
   imageMargin = 2;
   showImage: boolean = false;
   errorMessage: string;

   _listFilter: string;
   get listFilter(): string {
       return this._listFilter;
   }
   set listFilter(value: string){
       this._listFilter = value;
       this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
   }

   filteredProducts: IProduct[];
   products: IProduct[] = [];

   constructor(private productService: ProductService){}

   ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
        this.products = data;
        this.filteredProducts = this.products;
    },err => {
        this.errorMessage = err
    });   
   }

   performFilter(filterBy: string): IProduct[] {
       filterBy = filterBy.toLocaleLowerCase();
       return this.products.filter((product: IProduct) => 
          product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
   }
    
   toggleImage(): void{
       this.showImage = !this.showImage;
   }

   onRatingClicked(message: string): void{
       this.pageTitle = 'Product List: ' + message;
   }
}