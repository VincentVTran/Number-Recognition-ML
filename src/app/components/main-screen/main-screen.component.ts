import { Component, OnInit, ViewChild} from '@angular/core';
import {CanvasWhiteboardComponent} from 'ng2-canvas-whiteboard';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  @ViewChild('canvasWhiteboard',{static: false}) canvasWhiteboard: CanvasWhiteboardComponent;
 
  private predictedNumber:number = 0;
  private correctHidden:boolean = true;
  private buttonHidden:boolean = false;

  ngOnInit(){
  }

  onSubmit(){
    this.canvasWhiteboard.downloadCanvasImage("image/png","","result")
    this.canvasWhiteboard.clearCanvas();
    this.buttonHidden = true;
    this.correctHidden = false;
    //console.log(this.canvasWhiteboard.context);
  }

  train(){
    this.buttonHidden = false;
    this.correctHidden = true;
    //console.log(this.canvasWhiteboard.context);
  }
}
