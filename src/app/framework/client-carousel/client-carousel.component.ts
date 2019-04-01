import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { BlogsService } from '../shared/blogs.service';

@Component({
  selector: 'blog-client-carousel',
  templateUrl: './client-carousel.component.html',
  styleUrls: ['./client-carousel.component.scss']
})
export class ClientCarouselComponent implements OnInit, OnDestroy {
  clients: string[];
  // sub: Subscription;
  // Tick$ = interval(2500);
  constructor(private service: BlogsService) {}
  ngOnInit() {
    this.service.getClients().subscribe(c => {
      this.clients = c;
      // this.sub = this.Tick$.subscribe(() => {
      //   const shift = this.clients.shift();
      //   this.clients.push(shift);
      // });
    });
  }
  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }
}
