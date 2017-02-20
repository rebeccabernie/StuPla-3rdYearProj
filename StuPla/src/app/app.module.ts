import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Timetable } from '../pages/timetable/timetable';
import { Subjects } from '../pages/subjects/subjects';

@NgModule({
  declarations: [
    MyApp,
    Timetable,
    Subjects
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Timetable,
    Subjects
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
