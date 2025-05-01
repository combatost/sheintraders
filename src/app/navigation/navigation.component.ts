import { Component, ElementRef, EventEmitter, HostListener, Output, Renderer2, AfterViewInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements AfterViewInit {
  @Output() isLogout = new EventEmitter<void>();

  currentSection = '';
  isNavbarOpen = false;
  isDarkMode: boolean = false;
  lastScrollTop = 0;  // Variable to track last scroll position

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    public firebaseServices: FirebaseService,
    private router: Router
  ) {}

  // Methods for navigation
  navigateToHome(): void {
    this.currentSection = 'home';
    this.router.navigate(['/sheintable']);
  }

  navigateToAbout(): void {
    this.router.navigate(['/aboutme']);
  }

  navigateToAnalytics(): void {
    this.router.navigate(['/analysic']);
  }

  navigateToSettings(): void {
    this.router.navigate(['/settings']);
  }

  // Logout method
  logout(): void {
    this.firebaseServices.logout();
    this.isLogout.emit();
    this.router.navigate(['/login']);
  }

  // Methods for menu and theme toggle
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }

  // Dark mode toggle - triggers toggleTheme()
  toggleDarkMode(): void {
    this.toggleTheme();
  }

  toggleMenu(): void {
    this.isNavbarOpen = !this.isNavbarOpen;

    // Get the header element
    const header = this.el.nativeElement.querySelector('.header');

    // Toggle the 'hidden' class on the header when the menu is toggled
    if (this.isNavbarOpen) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }

    // Toggle the menu icon as usual
    this.toggleMenuIcon(this.el.nativeElement.querySelector('#menu-icon'), this.isNavbarOpen, this.el.nativeElement.querySelector('.navbar'));
  }

  toggleMenuIcon(menuIcon: HTMLElement, isOpen: boolean, navbar: HTMLElement): void {
    const closeIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: white;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>`;
    const menuIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: white;"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>`;

    // Change the menu icon to the close icon when the menu is open
    menuIcon.innerHTML = isOpen ? closeIconSVG : menuIconSVG;

    // Toggle navbar active class based on the state of the menu
    if (isOpen) {
      navbar.classList.add('open');
    } else {
      navbar.classList.remove('open');
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const header = this.el.nativeElement.querySelector('.header');
    const currentScrollTop = window.pageYOffset;

    // Hide the header when scrolling down
    if (currentScrollTop > this.lastScrollTop) {
      this.renderer.addClass(header, 'hidden');
    } else {
      // Show the header when scrolling up
      this.renderer.removeClass(header, 'hidden');
    }

    // Update last scroll position
    this.lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;

    // Sticky effect when scrolling past 100px
    if (window.pageYOffset > 100) {
      this.renderer.addClass(header, 'sticky');
    } else {
      this.renderer.removeClass(header, 'sticky');
    }

    // Handle active link based on scroll position (existing functionality)
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
    // This method is no longer needed for side nav; use the button click event to toggle the menu
  }
}
