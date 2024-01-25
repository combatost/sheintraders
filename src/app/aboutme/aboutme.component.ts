import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrl: './aboutme.component.css',
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300) // Adjust the duration (in milliseconds)
      ]),
      transition('out => void', [
        animate(300, style({ opacity: 1 })) // Adjust the duration (in milliseconds)
      ])
    ])
  ]
})

export class AboutmeComponent {

  hideContent = false;


  toggleVisibility() {
    this.hideContent = !this.hideContent;
  }
}