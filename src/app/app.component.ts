import { Component } from '@angular/core';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import { ParentNgModelComponent } from './parent-ng-model/parent-ng-model.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [ParentNgModelComponent]
})
export class AppComponent {
  title = 'ref-client-input';
}
