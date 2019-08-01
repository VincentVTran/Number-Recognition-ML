import { Component, OnInit, ViewChild,} from '@angular/core';
import { Router } from '@angular/router';
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
  private alert:String = "";

  private correctHidden:boolean = true;
  private buttonHidden:boolean = false;

  constructor(private dataService:DataService, private router:Router){ }

  ngOnInit(){

  }

  onSubmit(){
    this.canvasWhiteboard.downloadCanvasImage("image/png","","result");
    this.buttonHidden = true;
    this.dataService.retrievePrediction().subscribe(data => {this.predictedNumber = data; this.correctHidden = false});
  }

  pretrain(){
    this.alert = "Currently training (View terminal for training specs)";
    this.buttonHidden = true;
    this.dataService.trainingSet().subscribe((data)=>{this.buttonHidden = false; this.alert = ""},(error)=>{console.log(error)});
  }

  onSave(){
    this.dataService.saveModel().subscribe();
    this.buttonHidden = true;
    this.alert = "Saved model in folder (labeled as saved-model)"
    setTimeout(() => {this.buttonHidden = false; this.alert = ""}, 1000);
  }

  restartNetwork(){
    this.dataService.restart().subscribe();
    this.buttonHidden = true;
    this.alert = "Deleted model in folder, please restart the application"
    setTimeout(() => {this.buttonHidden = false; this.alert = ""}, 1000);
    //this.router.navigate(['/canvas']);
  }
  
  correctPrediction() {
    let requestBody = {
      expectedValue : this.correctNumber
    }

    this.dataService.sendCorrections(requestBody).subscribe(
      (data:any) => console.log(data),
    );
    
    this.canvasWhiteboard.clearCanvas();
    console.log("Inside");
    this.buttonHidden = false;
    this.correctHidden = true;
    //console.log(this.canvasWhiteboard.context);
  }
}
