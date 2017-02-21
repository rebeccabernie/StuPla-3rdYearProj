import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Assignments } from '../pages/assignments/assignments';
import { Timetable } from '../pages/timetable/timetable';
import { Subjects } from '../pages/subjects/subjects';

@NgModule({
  declarations: [   // What's part of the module / what defines it
    MyApp,
    Assignments,
    Timetable,
    Subjects
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [    // entryComponents tells the offline template compiler to compile the components and create factories for them
    MyApp,
    Assignments,
    Timetable,
    Subjects
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
