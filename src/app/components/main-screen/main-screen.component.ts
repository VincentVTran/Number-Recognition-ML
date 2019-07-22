import { Component, OnInit, ViewChild} from '@angular/core';
import {CanvasWhiteboardComponent} from 'ng2-canvas-whiteboard';
import { DataService } from '../../core/data.service';
@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})

export class MainScreenComponent implements OnInit {
  @ViewChild('canvasWhiteboard',{static: false}) canvasWhiteboard: CanvasWhiteboardComponent;
 
  private predictedNumber:number = 0;
  private correctNumber:number = 0;

  private correctHidden:boolean = true;
  private buttonHidden:boolean = false;

  constructor(private dataService:DataService){ }

  ngOnInit(){

  }

  onSubmit(){
    this.canvasWhiteboard.downloadCanvasImage("image/png","","result")
    this.buttonHidden = true;
    this.correctHidden = false;
    //console.log(this.canvasWhiteboard.context);
  }

  pretrain(){
    this.dataService.trainingSet().subscribe();
    this.buttonHidden = true;
    setTimeout(() => this.buttonHidden = false, 20000);
  }

  onSave(){
    this.dataService.saveModel().subscribe();
    this.buttonHidden = true;
    setTimeout(() => this.buttonHidden = false, 5000);
  }
  train(){
    let requestBody = {
      expectedValue : this.correctNumber
    }

    this.dataService.retrievePrediction(requestBody).subscribe(
      (data:any) => console.log(data),
    );
    
    this.canvasWhiteboard.clearCanvas();
    console.log("Inside");
    this.buttonHidden = false;
    this.correctHidden = true;
    //console.log(this.canvasWhiteboard.context);
  }
}
