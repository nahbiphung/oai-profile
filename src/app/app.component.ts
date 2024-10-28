import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NgClass],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    currentSection: 'introduction' | 'about-me' | 'skill-set' = 'introduction';

    scroll(el: HTMLElement): void {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}
