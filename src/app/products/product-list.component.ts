import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IProduct } from './products';
import { ProductService } from './product.service';
import { Observable, EMPTY, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { catchError, map, tap, startWith } from 'rxjs/operators';
import { ProductCategoryService } from '../product-categories/product-category.service';


@Component({
   selector: 'pm-products',
   templateUrl: './product-list.component.html',
   styleUrls: ['./product-list.component.css'],
   changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductListComponent { 
    
   pageTitle: string = 'Product List';
   imageWidth = 50;
   imageMargin = 2;
   showImage: boolean = false;
   errorMessage: string;

//    private categorySelectedSubject = new Subject<number>();
   private categorySelectedSubject = new BehaviorSubject<number>(0);
   categorySelectedAction$ = this.categorySelectedSubject.asObservable();

   products$: Observable<IProduct[]> = combineLatest([
       this.productService.productWithAdd$,
       this.categorySelectedAction$
        //  .pipe(
        //      startWith(0)
        //  )
   ])
   .pipe(
        map(([products,selectedCategoryId]) => 
            products.filter(product => 
                selectedCategoryId ? product.categoryId === selectedCategoryId : true
            )),
        catchError(err => {
              this.errorMessage = err;
              return EMPTY;
          })
    );
     
    categories$ = this.productCategoryService.productCategories$
       .pipe(
           catchError(err => {
               this.errorMessage = err;
               return EMPTY;
           })
       )       

   constructor(private productService: ProductService, private productCategoryService: ProductCategoryService){}

   //Every time an action occured. The onSelected method is called each time the user selects an item from the category drop-down 
   //In the onSelected methods we use subject next method to emit the selected categoryId to the stream
   onSelected(categoryId: string): void{
      this.categorySelectedSubject.next(+categoryId);
   }

   onAdd() : void{
       this.productService.addProduct();
   }

   toggleImage(): void{
       this.showImage = !this.showImage;
   }

   onRatingClicked(message: string): void{
       this.pageTitle = 'Product List: ' + message;
   }

   /**_listFilter: string;
   get listFilter(): string {
       return this._listFilter;
   }
   set listFilter(value: string){
       this._listFilter = value;
       this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
   }**/

   //filteredProducts: IProduct[];

   // ngOnInit(): void {
    // this.productService.getProduct().subscribe(data => {
    //     this.products = data;
    //     this.filteredProducts = this.products;
    // },err => {
    //     this.errorMessage = err
    // }); 
   //}

   /**performFilter(filterBy: string): IProduct[] {
       filterBy = filterBy.toLocaleLowerCase();
       return this.products.filter((product: IProduct) => 
          product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
   }**/

}