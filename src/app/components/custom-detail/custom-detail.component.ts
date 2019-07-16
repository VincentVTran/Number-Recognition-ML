import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-detail',
  templateUrl: './custom-detail.component.html',
  styleUrls: ['./custom-detail.component.css']
})
export class CustomDetailComponent implements OnInit {
  @Input() title:String;
  @Input() description:String;
  constructor() { }

  ngOnInit() {
  }

}
