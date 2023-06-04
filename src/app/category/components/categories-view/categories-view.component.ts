import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from 'src/models/category.model';

@Component({
  selector: 'app-categories-view',
  templateUrl: './categories-view.component.html',
  styleUrls: ['./categories-view.component.scss']
})
export class CategoriesViewComponent{
  @Input() categories : CategoryModel[] = [];

  constructor(){}
}
