import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'main';

  elementControl:string = '';
  selectGrid:string = '';
  elementList:Array<string> = [
    'Select', 'Input', 'Dropdown', 'MultiSelect', 'Radio Button', 'Checkboxes', "Upload"
  ];
  gridLineList:Array<string> = [
   'Select', '3', '4', '6',
  ];

  contentGeneratedList:Array<object> = [];



  handleGrid(event){
    this.contentGeneratedList.push(
      {name:this.elementControl, size:this.selectGrid, value:'', label:'', array:[]}
    );

    this.selectGrid = 'Select';

  }


}
