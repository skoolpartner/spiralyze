import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'main';
  parentIndx:number = null;
  childIndx:number = null;
  addKey:string='';
  addVal:string='';
  displayStyle:string = "none"; 
  elementControl:string = '';
  selectGrid:string = '';
  elementList:Array<string> = [
    'Select', 'Input',  'MultiChoice', 'Checkboxes'
  ];
  gridLineList:Array<string> = [
   'Select', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ];

  contentGeneratedList:Array<any> = [
    {
      row:1,
      elementRecord:[]
    }
  ];


  ngOnInit(){
    const lStorage = localStorage.getItem('saveData');
    if(lStorage != null){
      this.contentGeneratedList = JSON.parse(lStorage);
    }
  }

  // Assiging new element under individual row after 12Grid

  handleGrid(event){   
   
    for(var i=0; i<this.contentGeneratedList.length; i++){

      var count:any = 0;
      if(this.contentGeneratedList[i].elementRecord.length == 0){
        this.contentGeneratedList[i].elementRecord.push({name:this.elementControl, size:this.selectGrid, value:'', label:'', array:[]})
      }

      else{
        for(var x = 0; x<this.contentGeneratedList[i].elementRecord.length; x++){
          count = count + Number(this.contentGeneratedList[i].elementRecord[x].size);
        }
        if(count < 12){
          this.contentGeneratedList[i].elementRecord.push({name:this.elementControl, size:this.selectGrid, value:'', label:'', array:[]})
        }
        else{
          debugger
          if(count >= 12 && i == this.contentGeneratedList.length-1){
            
            this.contentGeneratedList.push(
              {
                row:i+2,
                elementRecord:[{name:this.elementControl, size:this.selectGrid, value:'', label:'', array:[]}]
              }
            )
            break
          }

          if(count + Number(this.selectGrid) > 12 && i == this.contentGeneratedList.length-1){
            
            this.contentGeneratedList.push(
              {
                row:i+2,
                elementRecord:[{name:this.elementControl, size:this.selectGrid, value:'', label:'', array:[]}]
              }
            )
            break
          }
         
        }
        
      }
      
    }


  }


  removeElement(index:number, childIndex:number){
    this.contentGeneratedList[index].elementRecord.splice(childIndex, 1);
  }

  openElement(index:number, childIndex:number){
    debugger
    this.parentIndx = index;
    this.childIndx = childIndex;
    this.displayStyle = 'block';
  }

  savePopup(){
    debugger
    this.contentGeneratedList[this.parentIndx].elementRecord[this.childIndx].array.push({key:this.addKey, value:this.addVal});
    this.displayStyle = 'none';
  }

  submit(){
    console.log( this.contentGeneratedList);

    localStorage.setItem('saveData', JSON.stringify( this.contentGeneratedList));
  }

}
