import { Component, HostListener, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScreenshotService } from '../services/ScreenshotService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  applicationResponsible: string = "";

  constructor(private screenshotService: ScreenshotService) {
    //
  }
  
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    
    console.log(event.key);
    // Check if the pressed key is the screenshot key (e.g., PrtScn key)
    if (event.key === 'PrintScreen' || event.key === 'PrtScn' || event.key === 'Snapshot') {
      event.preventDefault();
  
      // Call your custom logic before taking the screenshot
      this.customLogicBeforeScreenshot();
  
  
      // Call a function to capture the screenshot
      setTimeout(() => {
        // Call a function to capture the screenshot
        this.captureAndDownload()
      }, 100); // Adjust the delay as needed
    }
  }

  customLogicBeforeScreenshot() {
    this.applicationResponsible = "Area X is the responsible for this";
  }

  captureAndDownload() {
    this.screenshotService.captureScreen().then(canvas => {
      this.downloadScreenshot(canvas);
    });
  }
  
  downloadScreenshot(canvas: HTMLCanvasElement) {
    // Convert canvas to image data URL
    const imageDataUrl = canvas.toDataURL('image/png');

    // Create a link element
    const link = document.createElement('a');
    link.href = imageDataUrl;
    link.download = 'screenshot.png'; // Set the file name

    // Trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
  }

  title = 'printscreen-hotkey';
}

  

