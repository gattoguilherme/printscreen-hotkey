import { Component, HostListener, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxCaptureModule } from "ngx-capture";
import { NgxCaptureService } from "ngx-capture";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  @ViewChild('screen', { static: true }) screen: any;
  
  constructor(private captureService:NgxCaptureService) {
    //
  }
  
  applicationResponsible: string = "";
  applicationResponsible2: string = "";
  
  
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
        this.captureScreenshot();
      }, 100); // Adjust the delay as needed
    }
  }
  customLogicBeforeScreenshot() {
    this.applicationResponsible = "Area X is the responsible for this";
  }

  ngOnInit(){
    this.applicationResponsible2 = "testeeee";
  }
  
  captureScreenshot() {
    // Implement your logic to capture the screenshot here
    console.log('Screenshot captured!');
    this.captureService.getImage(this.screen.nativeElement, true).subscribe((img) => {
      console.log(img);
      this.saveAsImage(img);
    });
    // You can use libraries like html2canvas or other methods to capture the screenshot
  }

  saveAsImage(img: string) {
    const blob = this.base64ToBlob(img);
    const url = window.URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.download = 'image.png'; // Set the file name

    // Trigger the download
    link.click();

    // Clean up
    window.URL.revokeObjectURL(url);
  }

  base64ToBlob(base64: string): Blob {
    // const byteCharacters = atob(base64);
    const byteNumbers = new Array(base64.length);
    for (let i = 0; i < base64.length; i++) {
      byteNumbers[i] = base64.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/png' }); // Adjust type if needed
  }

  // ngOnInit() {
  //   // Add a global event listener to capture PrintScreen key press
  //   document.addEventListener('keyup', (event) => {
  //     console.log(event.key);
  //     if (event.key === 'PrintScreen' || event.key === 'PrtScn' || event.key === 'Snapshot') {
  //       event.preventDefault(); // Prevent default behavior
  //       this.handlePrintScreenKeyPress(); // Handle PrintScreen key press
  //       return false; // Return false to prevent further propagation
  //     }
  //     return true;
  //   });
  // }

  // handlePrintScreenKeyPress() {
  //   // Implement your custom logic here
  //   console.log('PrintScreen key pressed');
  //   // You can call your screenshot logic or any other action you need
  // }

  

  title = 'printscreen-hotkey';
}
