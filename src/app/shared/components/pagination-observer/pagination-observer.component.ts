import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pagination-observer',
  templateUrl: './pagination-observer.component.html',
  styleUrls: ['./pagination-observer.component.scss']
})
export class PaginationObserverComponent implements OnInit, AfterViewInit {

  @Output() inView = new EventEmitter();
  @ViewChild('observer', {static: false}) private observer!: ElementRef<HTMLDivElement>;

  startPos = 0;
  currentPos = 0;

  @HostListener('window:wheel', [])
  onScrollEvent(){
    if (this.observer){
      const rect = this.observer.nativeElement.getBoundingClientRect();
      const topShown = rect.top >= 0;
      const bottomShown = rect.bottom <= window.innerHeight;

      if(topShown && bottomShown){
        this.inView.emit();
      }
    }   
  }

  constructor() {}

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
  }

}
