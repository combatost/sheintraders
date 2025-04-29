import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300)  // Adjust the duration (in milliseconds)
      ]),
      transition('out => void', [
        animate(300, style({ opacity: 1 }))  // Adjust the duration (in milliseconds)
      ])
    ])
  ]
})
export class AboutmeComponent {
  hideContent = false;
  constructor(private router: Router) {} // Inject Router

  toggleVisibility() {
    this.hideContent = !this.hideContent;
  }

  navigateToAbout(): void {
    this.router.navigate(['aboutme']);  // Navigate to AboutMe component
  }
}
