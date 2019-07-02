import { Component, OnInit, ViewChild} from '@angular/core';
import {CanvasWhiteboardComponent} from 'ng2-canvas-whiteboard';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  @ViewChild('canvasWhiteboard',{}) canvasWhiteboard: CanvasWhiteboardComponent;

  ngOnInit(){

  }

  onSubmit(){
    this.canvasWhiteboard.downloadCanvasImage("image/png", "customFileName");
  }
}
