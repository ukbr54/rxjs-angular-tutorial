import { Injectable } from "@angular/core";
import { IProduct } from "./products";
import { Observable, throwError, combineLatest, BehaviorSubject, Subject, merge, from } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap, map, scan, shareReplay, mergeMap, toArray, filter, switchMap } from 'rxjs/operators';
import { ProductCategoryService } from '../product-categories/product-category.service';
import { SupplierService } from '../supplier/supplier.service';
import { Supplier } from '../supplier/supplier';

@Injectable({
    providedIn: 'root'
})
export class ProductService{

    private productUrl = 'api/products';
    private supplierUrl = this.supplierService.supplierUrl;

    constructor(private http: HttpClient, 
               private productCategoryService: ProductCategoryService,
               private supplierService: SupplierService){}

    products$ = this.http.get<IProduct[]>(this.productUrl)
       .pipe(
            //tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError) 
       );

    productWithCategory$ = combineLatest([
        this.products$,
        this.productCategoryService.productCategories$
    ]).pipe(
        map(([products,categories]) =>
           products.map(product =>({
               ...product,
               price: product.price * 1.5,
               category: categories.find(c => product.categoryId === c.id).name,
               searchKey: [product.productName]
           }) as IProduct)
        ),
        shareReplay(1)
    );
    
    private productSelectedSubject = new BehaviorSubject<number>(0);
    productSelectedAction$ = this.productSelectedSubject.asObservable();

    selectedProduct$ = combineLatest([
        this.productWithCategory$,
        this.productSelectedAction$
    ])    
      .pipe(
          map(([products,selectedProductId]) =>
            products.find(product => product.productId === selectedProductId)
          )
      );
 
    selectedProductChanged(selectedProductId: number){
        this.productSelectedSubject.next(selectedProductId);
    }  


    private productInsertedSubject = new Subject<IProduct>();
    productInsertedAction$ = this.productInsertedSubject.asObservable();

    productWithAdd$ = merge(
        this.productWithCategory$,
        this.productInsertedAction$
    ).pipe(
        scan((acc: IProduct[], value: IProduct) => [...acc,value])
    );

    addProduct(newProduct?: IProduct){
        newProduct = newProduct || this.fakeProduct();
        this.productInsertedSubject.next(newProduct);
    }

    /**selectedProductSupplier$ = combineLatest([
        this.selectedProduct$,
        this.supplierService.supplier$
    ]).pipe(
        map(([selectedProduct,suppliers]) =>
           suppliers.filter(supplier => selectedProduct.supplierIds.includes(supplier.id)) 
        )
    );**/

    selectedProductSupplier$ = this.selectedProduct$
      .pipe(
          filter(selectedProduct => Boolean(selectedProduct)),
          switchMap(selectedProduct => 
            from(selectedProduct.supplierIds)
              .pipe(
                  mergeMap(supplierId => this.http.get<Supplier>(`${this.supplierUrl}/${supplierId}`)),
                  toArray(),
                  tap(suppliers => console.log('product suppliers', JSON.stringify(suppliers)))
              )
          )
      );


    private fakeProduct(){
        return{
            productId: 42,
            productName: "Another one",
            productCode: "TBX-0042",
            releaseDate: "June 23, 2019",
            description: "Our new Product",
            price: 1.95,
            starRating: 3.2,
            imageUrl: "assets/images/leaf_rake.png",
            categoryId: 1
        }
    }
      

    getProduct(id: number): Observable<IProduct | undefined> {
        return this.products$.pipe(
            map((products: IProduct[]) => products.find(p => p.productId === id))
        );
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err.error.message}`;
        } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        return throwError(errorMessage);
    }
}