import { Component, OnInit } from '@angular/core';
import data from './dataProvider';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  datas = data;
  constructor() { }

  ngOnInit() {
  }

}
