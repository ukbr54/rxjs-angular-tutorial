import { Component, OnInit } from '@angular/core';
import { IProduct } from './products';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string = "Product Detail";
  product: IProduct;
  errorMessage = '';
  
  constructor(private route: ActivatedRoute,private router: Router,private productService: ProductService) { }

  ngOnInit(): void {
    const param = +this.route.snapshot.paramMap.get('id');
    if(param){
      const id = +param;
      this.getProduct(id);
    }
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: data => this.product = data,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
