import { Injectable } from '@angular/core';

function saveAs(uri, filename) {
  const link = document.createElement('a');

  if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;

      // Firefox requires the link to be in the body
      document.body.appendChild(link);

      // simulate click
      link.click();

      // remove the link when done
      document.body.removeChild(link);
  } else {
      window.open(uri);
  }
}

declare const html2canvas: any;

@Injectable({
  providedIn: 'root'
})
export class ScreenshotService {

  constructor() { }

  /**
   * Download HTML as PNG screenshot
   * @param selector is CSS selector
   * @param filename is filename, it shpuld ends with .png
   */
  public download(selector: string, filename: string) {

    // Element from which screenshot will be created
    const element = document.querySelector(selector);
    element.classList.add('rendering');

    // Element which will be visible during rendering
    const renderingPlaceholderElement = document.querySelector(selector + '-rendering');
    renderingPlaceholderElement?.classList.add('visible');

    // Generate screenshot as PNG image
    html2canvas(element, {
      // scale: 4 // USE DEFAULT IS BEST
    }).then((canvas) => {
      element.classList.remove('rendering');
      renderingPlaceholderElement?.classList.remove('visible');

      // Store to file
      saveAs(canvas.toDataURL(), filename);
  });
  }
}
