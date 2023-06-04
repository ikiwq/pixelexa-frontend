import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../../service/dark-mode/dark-mode.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit{
  constructor(private dmService : DarkModeService){}
  dark_mode : Boolean = false;

  ngOnInit(): void {
      this.dmService.getDarkMode().subscribe((bool)=>{this.dark_mode = bool})
  }
}
