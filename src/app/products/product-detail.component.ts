import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IProduct } from './products';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';
import { catchError, tap } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  changeDetection:  ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent {

  pageTitle: string = "Product Detail";
  //product: IProduct;
  errorMessage = '';
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  
  constructor(private route: ActivatedRoute,private router: Router,private productService: ProductService) { }

  // ngOnInit(): void {
  //   const param = +this.route.snapshot.paramMap.get('id');
  //   if(param){
  //     const id = +param;
  //     this.getProduct(id);
  //   }
  // }

  product$ = this.productService.selectedProduct$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );
   
  productSuppliers$ = this.productService.selectedProductSupplier$
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );  

  // getProduct(id: number): void {
  //   this.productService.getProduct(id).subscribe({
  //     next: data => this.product = data,
  //     error: err => this.errorMessage = err
  //   });
  // }

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
