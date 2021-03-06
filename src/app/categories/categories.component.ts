import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

import { CloseCatalogService } from '../services/close-catalog.service';
import { LoadJSONService } from '../services/load-json.service';

export interface SubcatN {
  id?: number;
  list?: [];
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  cat = [];
  subcat = [];
  subcatN: SubcatN = {};
  x1 = 0;
  x2 = 0;
  catIdx;
  constructor(
    public closeCatalogService: CloseCatalogService,
    public loadjsonService: LoadJSONService,
    private titleService: Title
    ) {}

  ngOnInit(): void {
    this.loadjsonService.loadJson().subscribe( response => {
      this.cat = response.cat;
      this.subcat = response.subcat;
    });
  }
  showSubCat(event): void {
    this.catIdx = event.target.className.slice(1);
    this.subcatN = this.subcat[this.catIdx];
    $('.subCatalog h3').html(this.cat[this.subcatN.id.toString().slice(1)]);
    if (window.innerWidth > 600) { $('.subCatalog').css('left', '25em'); }
    else { $('.subCatalog').css({left: '0', 'z-index': '90'}); }
  }
  closeSubCat(): void {
    $('.subCatalog').css('left', '-100%');
  }
  tchStart(event): void {
    this.x1 = event.touches[0].clientX;
  }
  tchEnd(event): void {
    this.x2 = event.changedTouches[0].clientX;
    if ((this.x1 - this.x2) >= 80) {
      $('.catalog').css('left', '-150%');
      $('.subCatalog').css({left: '-150%', 'z-index': '70'});
      $('.overlay').css('display', 'none');
      $('body').css('overflow', 'auto');
     }
  }
  subTchEnd(event): void {
    this.x2 = event.changedTouches[0].clientX;
    if ((this.x1 - this.x2) >= 80) { this.closeSubCat(); }
  }
  goToProducts(): void {
    this.closeCatalogService.closeCatalog();
    this.titleService.setTitle('Products');
  }
}
