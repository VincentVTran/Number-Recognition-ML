import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';

import { MatMenuModule, MatButtonModule, MatIconModule } from '@angular/material';
import { MainScreenComponent } from './main-screen/main-screen.component';

import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
@NgModule({
  declarations: [MainMenuComponent, MainScreenComponent],
  imports: [
    CommonModule,

    MatButtonModule,
    MatMenuModule,
    MatIconModule,

    CanvasWhiteboardModule
  ],
  exports: [MainScreenComponent]
})
export class ComponentsModule { }
