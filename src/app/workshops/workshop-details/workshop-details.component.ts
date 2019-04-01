import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IWorkshop } from '../../framework/shared/blogs.service';

@Component({
  selector: 'blog-workshop-details',
  templateUrl: './workshop-details.component.html',
  styleUrls: ['./workshop-details.component.scss']
})
export class WorkshopDetailsComponent implements OnInit {
  @Input() workshop: IWorkshop;
  @Input() expanded: boolean;
  @Input() index: number;
  @Input() last: boolean;
  @Output() opened = new EventEmitter<number>();
  @Output() navigate = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}
  reportOpened() {
    this.opened.emit(this.index);
  }
  doNavigate(s: string) {
    this.navigate.emit(s);
  }
}
