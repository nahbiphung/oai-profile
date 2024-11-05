import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private cssFile!: string;
    private themeId = 'themeId';
    constructor(@Inject(DOCUMENT) private document: Document, private overlayContainer: OverlayContainer) {}

    setTheme(themeName: 'light-theme' | 'dark-theme') {
        this.cssFile = `${themeName}.css`;
        this.removeExistingThemeStyle();

        const themeStyle = this.document.createElement('link');
        themeStyle.id = this.themeId;
        themeStyle.rel = 'stylesheet';
        themeStyle.href = `${this.cssFile}`;

        const head = this.document.getElementsByTagName('head')[0];
        head.appendChild(themeStyle);

        this.overlayContainer.getContainerElement().classList.add(themeName);
    }

    removeExistingThemeStyle(): void {
        const importedFontSheet = this.document.head.querySelector(`#${this.themeId}`);
        if (importedFontSheet) {
            this.document.head.removeChild(importedFontSheet);
        }

        const currentThemeName = this.overlayContainer.getContainerElement().classList[1];
        this.overlayContainer.getContainerElement().classList.remove(currentThemeName);
    }
}
