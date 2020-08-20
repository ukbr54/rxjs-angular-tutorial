import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Subscription, EMPTY } from 'rxjs';

import { ProductService } from '../product.service';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListAltComponent implements OnInit, OnDestroy {

    pageTitle = 'Products';
    errorMessage = '';

    products$ = this.productService.productWithCategory$
      .pipe(
          tap(data => "Reading data for Alternate product List: " + JSON.stringify(data)),
          catchError(err =>{
              this.errorMessage = err;
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