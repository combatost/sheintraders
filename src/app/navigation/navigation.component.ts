import { Component, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  @Output() isLogout = new EventEmitter<void>();

  currentSection: string = '';
  isNavbarOpen = false;

  constructor(private renderer: Renderer2, private el: ElementRef, public firebaseServices: FirebaseService,private router: Router) {}

  logout(): void {
    this.firebaseServices.logout();
    this.isLogout.emit(); // Emit the event when logged out
  }
  navigateToAbout() {
    this.router.navigate(['aboutme']);
  }
  navigateToHome() {
    this.router.navigate(['sheintable']);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    // Sticky Header
    const header = this.el.nativeElement.querySelector('.header');
    if (window.pageYOffset > 100) {
      this.renderer.addClass(header, 'sticky');
    } else {
      this.renderer.removeClass(header, 'sticky');
    }

    // Active section
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionId = section.getAttribute('id');

      if (sectionTop <= 150 && sectionTop >= -150) {
        this.currentSection = sectionId || '';
      }
    });
  }


  ngAfterViewInit(): void {
    // Get menu icon and navbar elements
    const menuIcon = this.el.nativeElement.querySelector('#menu-icon');
    const navbar = this.el.nativeElement.querySelector('.navbar');

    // Add click event listener to menu icon
    menuIcon.addEventListener('click', () => {
      this.isNavbarOpen = !this.isNavbarOpen;
      this.toggleMenuIcon(menuIcon, this.isNavbarOpen, navbar);
    });
  }

  toggleMenuIcon(menuIcon: HTMLElement, isOpen: boolean, navbar: HTMLElement): void {
    // Define your SVG close icon markup
    const closeIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: white ; transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>`;

    // Define your menu icon SVG markup
    const menuIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill:  white ;transform: msFilter"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>`;

    // Replace the innerHTML of menuIcon with closeIconSVG if isOpen is true, else replace it with your menu icon SVG
    menuIcon.innerHTML = isOpen ? closeIconSVG : menuIconSVG; // Use the menu icon SVG markup when closing the navbar

    if (isOpen) {
      navbar.classList.add('active');

      // Add event listener to each link in the navbar
      const links = navbar.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', () => {
          navbar.classList.remove('active'); // Close the navbar when a link is clicked
          menuIcon.innerHTML = menuIconSVG; // Change back to the menu icon when the navbar is closed
        });
      });
    } else {
      navbar.classList.remove('active');
    }
  }
}
