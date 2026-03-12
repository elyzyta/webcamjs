import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as Webcam from 'webcamjs';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit, OnDestroy {
  @Output() stepNext = new EventEmitter<string>();
  @Output() stepBack = new EventEmitter<any>();
  @Input() data = {
    title: 'WebCam.js',
    subTitle: '',
    glosaCamera: 'Escanear documento',
    glosaDocuments: 'Documento escaneado',
    textBtn: 'Continuar',
    iconClass: 'far fa-file-image'
  };
  snapshot!: string | null;

  constructor () { }

  ngOnInit(): void {
    this.activateWebCam();
  }

  ngOnDestroy (): void {
    Webcam.reset();
  }

  activateWebCam(): void {
    const portrait = window.matchMedia('(orientation: portrait)');
    let configScanner = {
      // tamaño de vista previa en vivo
      width: portrait.matches ? 550 : 733,
      height: portrait.matches ? 733 : 450,
      // tamaño de captura del dispositivo
      dest_width: 1240, // 2592
      dest_height: 720, // 1944
      // format and quality
      image_format: 'jpeg',
      jpeg_quality: 90
    };

    Webcam.set(configScanner);
    Webcam.attach('#camara');
  }

  triggerSnapshot(): void {
    const canvas = document.getElementById('canvasPhoto') as HTMLCanvasElement;
    const video = Webcam.container?.childNodes[1];
    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
    this.setImages(canvas.toDataURL('image/jpeg'));
  }

  setImages(img: any): void {
    const snapshot = img.slice(23);
    this.snapshot = snapshot;
  }

  remove(e: any): void {
    e.preventDefault();
    this.snapshot = null;
  }
}
