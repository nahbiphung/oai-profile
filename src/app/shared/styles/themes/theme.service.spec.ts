import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { DOCUMENT } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';

const documentMock = {
    createElement: jest.fn().mockReturnValue({
        id: '',
        rel: '',
        href: ''
    }),
    getElementsByTagName: jest.fn().mockReturnValue([
        {
            appendChild: jest.fn()
        }
    ]),
    querySelectorAll: jest.fn().mockReturnValue([]),
    head: {
        querySelector: jest.fn(),
        removeChild: jest.fn()
    }
} as unknown as Document;

const overlayContainerMock = {
    getContainerElement: jest.fn().mockReturnValue({
        classList: {
            add: jest.fn(),
            remove: jest.fn(),
            [1]: 'light-theme'
        }
    })
} as unknown as OverlayContainer;

describe('Theme Service', () => {
    let themeService: ThemeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ThemeService,
                { provide: DOCUMENT, useValue: documentMock },
                { provide: OverlayContainer, useValue: overlayContainerMock }
            ]
        });

        themeService = TestBed.inject(ThemeService);
    });

    it('should set the theme correctly', () => {
        themeService.setTheme('light-theme');

        // expect(documentMock.createElement).toHaveBeenCalledWith('link');
        expect(documentMock.getElementsByTagName).toHaveBeenCalledWith('head');
        expect(documentMock.head.querySelector).toHaveBeenCalledWith('#themeId');
        expect(overlayContainerMock.getContainerElement().classList.remove).toHaveBeenCalledWith('light-theme');
        expect(overlayContainerMock.getContainerElement().classList.add).toHaveBeenCalledWith('light-theme');
    });

    it('should remove existing theme style before setting new theme', () => {
        themeService.setTheme('light-theme');

        // expect(documentMock.createElement).toHaveBeenCalledWith('link');
        expect(documentMock.getElementsByTagName).toHaveBeenCalledWith('head');
        expect(documentMock.head.querySelector).toHaveBeenCalledWith('#themeId');
        expect(overlayContainerMock.getContainerElement().classList.remove).toHaveBeenCalledWith('light-theme');
        expect(overlayContainerMock.getContainerElement().classList.add).toHaveBeenCalledWith('light-theme');

        themeService.setTheme('dark-theme');

        expect(overlayContainerMock.getContainerElement().classList.remove).toHaveBeenCalledWith('light-theme');
        expect(overlayContainerMock.getContainerElement().classList.add).toHaveBeenCalledWith('dark-theme');
    });
});
