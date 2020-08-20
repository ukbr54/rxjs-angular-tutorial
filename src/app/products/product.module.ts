import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { ProductShellComponent } from './product-list-alt/product-shell.component';
import { ProductListAltComponent } from './product-list-alt/product-list-alt.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe,
    ProductListAltComponent,
    ProductShellComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      { path: 'products/alternate', component: ProductShellComponent },
      { path: 'products/:id', canActivate: [ProductDetailGuard], component: ProductDetailComponent }
    ]),
    SharedModule
  ]
})
export class ProductModule { }
