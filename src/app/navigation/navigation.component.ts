import { Component, ElementRef, EventEmitter, HostListener, Output, Renderer2, AfterViewInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';  // Make sure FirebaseService is imported
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

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    public firebaseServices: FirebaseService,  // Inject FirebaseService here
    private router: Router
  ) {}

  logout(): void {
    // Use the logout method from FirebaseService
    this.firebaseServices.logout();
    this.isLogout.emit();
    this.router.navigate(['/login']); // Optionally, redirect to the login page after logout
  }

  navigateToHome(): void {
    this.currentSection = 'home'; // Mark it active if you want
    this.router.navigate(['sheintable']); // Navigate to 'sheintable' route
  }
  navigateToSettings() {
    this.router.navigate(['/settings']);
  }
  navigateToAnalytics() {
    this.router.navigate(['/analysic']);
  }
  navigateToAbout(): void {
    console.log('Navigating to About Me...');
    this.router.navigate(['aboutme']);
  }
  
  navigateToServices(): void {
    this.router.navigate(['services']);
  }

  navigateToContact(): void {
    this.router.navigate(['contact']);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const header = this.el.nativeElement.querySelector('.header');
    if (window.pageYOffset > 100) {
      this.renderer.addClass(header, 'sticky');
    } else {
      this.renderer.removeClass(header, 'sticky');
    }

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
    const menuIcon = this.el.nativeElement.querySelector('#menu-icon');
    const navbar = this.el.nativeElement.querySelector('.navbar');

    menuIcon.addEventListener('click', () => {
      this.isNavbarOpen = !this.isNavbarOpen;
      this.toggleMenuIcon(menuIcon, this.isNavbarOpen, navbar);
    });
  }

  toggleMenuIcon(menuIcon: HTMLElement, isOpen: boolean, navbar: HTMLElement): void {
    const closeIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: white;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>`; 
    const menuIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: white;"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>`;

    menuIcon.innerHTML = isOpen ? closeIconSVG : menuIconSVG;

    if (isOpen) {
      navbar.classList.add('active');
      const links = navbar.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', () => {
          navbar.classList.remove('active');
          menuIcon.innerHTML = menuIconSVG;
        });
      });
    } else {
      navbar.classList.remove('active');
    }
  }

  // Toggle theme (light/dark mode)
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }
}
