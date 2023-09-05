import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { timer, fromEvent } from 'rxjs';
import { content, text } from './app.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  tick$ = timer(1000, 80);
  body = document.querySelector('body') as HTMLBodyElement;
  e$ = fromEvent(this.body, 'keyUp');
  line = 0;
  optionsOffset = content.length;

  lines = text.map((_) => '');

  text = [...text.join('|').split('')];

  ngOnInit() {
    console.log(text);

    this.tick$.subscribe((data) => {
      const char = this.text[data];
      if (char) {
        if (char === '|') {
          this.line++;
        } else {
          this.lines[this.line] += char;
        }
      } else {
        this.line++;
      }
    });
  }
}
