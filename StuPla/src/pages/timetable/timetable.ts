import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Mon } from './mon-page';
import { Tues } from './tues-page';
import { Wed } from './wed-page';
import { Thur } from './thur-page';
import { Fri } from './fri-page';

@Component({
  selector: 'page-timetable',
  templateUrl: 'timetable.html',
  
   template: `
    <ion-tabs class="tabs-basic">
      <ion-tab tabTitle="M" [root]="mon-page"></ion-tab>
      <ion-tab tabTitle="Tu" [root]="tues-page"></ion-tab>
      <ion-tab tabTitle="W" [root]="wed-page"></ion-tab>
      <ion-tab tabTitle="Th" [root]="thurs-page"></ion-tab>
      <ion-tab tabTitle="F" [root]="fri-page"></ion-tab>
    </ion-tabs>
`})
export class Timetable {

  constructor(public navCtrl: NavController) {
    
  }

}
