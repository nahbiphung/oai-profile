import { NgClass, NgStyle, UpperCasePipe } from '@angular/common';
import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    effect,
    signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
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
        MatTooltipModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
    tl = gsap.timeline({ defaults: { ease: 'power1.out' } });

    constructor() {}

    ngOnInit() {
        gsap.registerPlugin(ScrollTrigger);

        setTimeout(() => {
            this.scrollToTop();
        }, 1500);
    }

    ngAfterViewInit() {
        this.introAnimation();

        this.moreAboutMeAnimation();

        this.galleryAnimation();
    }

    private introAnimation() {
        this.tl.to('.text', { y: '0%', duration: 1, stagger: 0.25 });
        this.tl.to('.slider', { y: '-100%', duration: 1.5, delay: 0.5 });
        this.tl.to('.intro', { y: '-100%', duration: 1 }, '-=1');
    }

    private moreAboutMeAnimation() {
        gsap.to('#more-about-me-text', {
            scrollTrigger: {
                trigger: '#more-about-me-text',
                start: '-200px center',
                end: 'bottom bottom',
                // markers: true,
                scrub: 2,
            },
            opacity: 1,
            scale: 3.5,
        });
    }

    private galleryAnimation() {
        gsap.to('#gallery-image-text-top', {
            scrollTrigger: {
                trigger: '#gallery-image-text-top',
                // markers: true,
                scrub: 2,
            },
            x: '150%',
        });

        gsap.to('#gallery-image-1-line', {
            scrollTrigger: {
                trigger: '#gallery-image-text-top',
                start: 'bottom bottom',
                // end: 'bottom bottom',
                // markers: true,
                scrub: 2,
            },
            x: '-80%',
        });

        gsap.to('#gallery-image-2-line', {
            scrollTrigger: {
                trigger: '#gallery-image-1-line',
                start: 'bottom bottom',
                // end: 'bottom bottom',
                // markers: true,
                scrub: 2,
            },
            x: '5%',
        });

        gsap.to('#gallery-image-3-line', {
            scrollTrigger: {
                trigger: '#gallery-image-2-line',
                start: 'bottom bottom',
                // end: 'bottom bottom',
                // markers: true,
                scrub: 2,
            },
            x: '-80%',
        });

        gsap.to('#gallery-image-4-line', {
            scrollTrigger: {
                trigger: '#gallery-image-3-line',
                start: 'bottom bottom',
                // end: 'bottom bottom',
                // markers: true,
                scrub: 2,
            },
            x: '5%',
        });

        gsap.to('#gallery-image-text-bottom', {
            scrollTrigger: {
                trigger: '#gallery-image-4-line',
                // markers: true,
                scrub: 2,
            },
            x: '5%',
        });
    }

    private scrollToTop() {
        window.scrollTo(0, 0);
    }
}
