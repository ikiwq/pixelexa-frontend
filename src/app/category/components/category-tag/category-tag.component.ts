import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-tag',
  templateUrl: './category-tag.component.html',
  styleUrls: ['./category-tag.component.scss']
})
export class CategoryTagComponent {
  @Input() category_name : string = "";
}
