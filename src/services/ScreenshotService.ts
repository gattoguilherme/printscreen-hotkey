import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class ScreenshotService {

  constructor() { }

  captureScreen(): Promise<HTMLCanvasElement> {
    return html2canvas(document.body);
  }
}