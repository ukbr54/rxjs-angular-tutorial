import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Subscription, EMPTY, Subject } from 'rxjs';

import { ProductService } from '../product.service';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListAltComponent implements OnInit, OnDestroy {

    pageTitle = 'Products';
    private errorMessageSubject = new Subject<string>();
    errorMessage$ = this.errorMessageSubject.asObservable();

    products$ = this.productService.productWithCategory$
      .pipe(
          tap(data => "Reading data for Alternate product List: " + JSON.stringify(data)),
          catchError(err =>{
              this.errorMessageSubject.next(err)
              return EMPTY;
          })
      );

    selectedProduct$ = this.productService.selectedProduct$;

    constructor(private productService: ProductService){}

    ngOnDestroy(): void {
        console.log("Not yet implemented");
    }
    ngOnInit(): void {
        console.log("Not yet implemented");
    }

    onSelected(productId: number): void {
        this.productService.selectedProductChanged(productId);
    }

}