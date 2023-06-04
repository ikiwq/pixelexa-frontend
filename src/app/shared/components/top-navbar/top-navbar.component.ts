import { Component, OnInit } from '@angular/core';
import { faList, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {
  search = faSearch;
  plus = faPlus;
  list = faList;
  constructor() { }

  ngOnInit(): void {
  }

}
