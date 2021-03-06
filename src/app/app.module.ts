import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { MatMenuModule, MatButtonModule, MatIconModule,MatCardModule,MatFormFieldModule,MatSelectModule} from '@angular/material';

import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
import { AboutComponent } from './components/about/about.component';
import { CustomDetailComponent } from './components/custom-detail/custom-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    MainScreenComponent,
    AboutComponent,
    CustomDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    //Angular Materials
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,

    //3rd-Party
    CanvasWhiteboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
