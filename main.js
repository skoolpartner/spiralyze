const mainArray = [];
let currentAddId;
let multiChoideCurrentevent;





document.addEventListener('DOMContentLoaded', function() {
    var data = localStorage.getItem('htmlSave');
    if(data)
    document.getElementById('rightNav').innerHTML += data;
  });




function elementFunction(event){
    let ele = document.getElementById("element").value;
    

    if(ele == 'input'){
        let _id = Math.random() * 2;

        let genComponent = `<div class="element-wid" id="${_id}">
        <span class="cross-btn" onclick="deleteRow(${_id})"></span>
        <input type="text" id="inputKey_${_id}" class="custom-label" onchange="inputLabelData(event, ${_id}, 'key')" >
        <input type="text" id="inputVal_${_id}"  onchange="inputValueData(event, ${_id}, 'value')">
        </div>`;

        document.getElementById("rightNav").innerHTML += genComponent;
    }

    else if(ele == 'multichoice'){
        let _id = Math.random() * 1.2;

        let genComponent = `<div class="element-wid" id="${_id}">
        <span class="cross-btn" onclick="deleteRow(${_id})"></span>

        <span class="add-btn" onclick="addRow(${_id})"></span>
        <input type="text" id="inputKey_${_id}" class="custom-label"  onchange="inputLabelData(event, ${_id}, 'key')" >
       
       
        <div class="multi-radio" >
       
        <input id="inputRadio_${_id}" type="radio" onchange="inputValueData(event, ${_id}, 'radio')">
        <span  onclick="editChoice(this, ${_id})">sample</span>
         <span class="cross-btn-radio" onclick="deleteRadioRow(this)"></span>
        </div>
        </div>`
        document.getElementById("rightNav").innerHTML += genComponent;
    }
}   



function deleteRow(id){
    document.getElementById(id).remove();
}

function inputLabelData(event, id, origin){
    addVal(mainArray, event, origin, id);
}

function inputValueData(event, id, origin){
    addVal(mainArray, event, origin, id);
}



function addVal(mainArray, event, origin, id){

    let obj;

    if(origin == 'key'){
        debugger
       let getId = document.getElementById('inputKey_'+id);     
       getId.setAttribute('value', event.target.value);
      obj  = {id:id, key:event.target.value, value: ''};
    }
    else if(origin == 'radio'){
        debugger
       let getId = document.getElementById('inputRadio_'+id);     
       getId.setAttribute('checked', true);
      obj  = {id:id, key:'', value: 'checked'};
    }
    else{
        debugger
        let getId = document.getElementById('inputVal_'+id);     
        getId.setAttribute('value', event.target.value);
        obj  = {id:id, key:'', value: event.target.value};
    }

    if(mainArray.length == 0){
      mainArray.push(obj);
    }
    else{
        let index = mainArray.findIndex(x => x.id == id); 
        if(index >= 0){
           if(origin == 'key')
           mainArray[index].key = event.target.value;
           else
           mainArray[index].value = event.target.value;
        }
        else{
            mainArray.push(obj);
        }
    }

    return mainArray
}


function deleteRadioRow(event){
    event.parentNode.remove();
}

function addRow(_id){
    debugger
    document.getElementById('saveMulti').style.display = "block";
    document.getElementById('updateMulti').style.display = "none";
    
    currentAddId = _id;
    document.getElementById('main-popup').style.display = "block";
}


function saveMultiChoice(){
    let _id = Math.random() * 1.2;

    let key = document.getElementById('multichoiceKey').value;
    let value = document.getElementById('multichoiceValue').value;

    let content  = `<div class="multi-radio" >
       
    <input type="radio" id="inputRadio_${_id}"  onchange="inputValueData(event, ${_id}, 'radio')">
    <span id="${_id}"  onclick="editChoice(this, ${_id})">${key}</span>
     <span class="cross-btn-radio" onclick="deleteRadioRow(this)"></span>
    </div>
    </div>`
    document.getElementById(currentAddId).innerHTML += content;
    document.getElementById('main-popup').style.display = "none";
}

function editMultiChoiceSave(){
    let key = document.getElementById('multichoiceKey').value;
    let value = document.getElementById('multichoiceValue').value;
    multiChoideCurrentevent.innerHTML = key;
    multiChoideCurrentevent.previousElementSibling.value = value;
    document.getElementById('main-popup').style.display = "none";
    

}


function editChoice(event, id){
    document.getElementById('saveMulti').style.display = "none";
    document.getElementById('updateMulti').style.display = "block";
    currentAddId = id;
    multiChoideCurrentevent = event;
    document.getElementById('main-popup').style.display = "block";
    document.getElementById('multichoiceKey').value = event.innerHTML;
    document.getElementById('multichoiceValue').value = event.previousElementSibling.value;
}

function cancelPopup(){
    document.getElementById('main-popup').style.display = "none";
}


function saveMainForm(){
    let _data = document.getElementById('rightNav').innerHTML;
    localStorage.setItem('htmlSave', _data);
    alert('Data Saved');
}





