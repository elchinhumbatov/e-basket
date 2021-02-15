import { Component, OnInit } from '@angular/core';
import { AddToCartService } from '../services/add-to-cart.service';
import { AddToFavService } from '../services/add-to-fav.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  // tslint:disable: typedef
  elems = [];
  prices = [];
  constructor(
    private addToFavService: AddToFavService,
    private addToCartService: AddToCartService
  ) { }

  ngOnInit(): void {
    this.elems = this.addToFavService.getProducts();
  }
  addToCart(product, count) {
    this.addToCartService.add(product, count);
  }
  removeFromFav(product) {
    const idx = this.elems.findIndex(item => item.key === product.key);
    this.elems.splice(idx, 1);
  }
}