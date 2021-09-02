import { Component } from '@angular/core';
import * as Webcam from 'webcamjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  snapshots: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.activateWebCam();
  }

  ngOnDestroy(): void {
    Webcam.reset();
  }

  async activateWebCam(): Promise<void> {
    Webcam.set({
      // tamaño de vista previa en vivo
      width: 610,
      height: 350,
      // tamaño de captura del dispositivo
      dest_width: 1240,
      dest_height: 700,
      image_format: 'jpeg',
      jpeg_quality: 100
    });
    Webcam.attach('#camara');
  }

  triggerSnapshot(): void {
    const canvas = document.getElementById('canvasPhoto') as HTMLCanvasElement;
    const video = Webcam.container.childNodes[1];

    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
    this.setImages(canvas.toDataURL('image/jpeg'));
  }

  setImages(img: string): void  {
    const snapshot = img.slice(23);
    this.snapshots.push(snapshot);
  }

  remove(e: any, i: any): void {
    e.preventDefault();
    this.snapshots.splice(i, 1);
  }
}
