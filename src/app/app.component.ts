import { NgClass, NgStyle, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        NgClass,
        NgStyle,
        UpperCasePipe,
        MatProgressBarModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    currentSection: 'introduction' | 'about-me' | 'skills' = 'introduction';
    isFlippedCard = false;
    tl = gsap.timeline({ defaults: { ease: 'power1.out' } });

    ngOnInit() {
        gsap.registerPlugin(ScrollTrigger);
    }

    ngAfterViewInit() {
        this.tl.to('.text', { y: '0%', duration: 1, stagger: 0.25 });
        this.tl.to('.slider', { y: '-100%', duration: 1.5, delay: 0.5 });
        this.tl.to('.intro', { y: '-100%', duration: 1 }, '-=1');
    }

    scroll(el: HTMLElement): void {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}
