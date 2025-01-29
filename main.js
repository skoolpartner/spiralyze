const mainArray = [];
let currentAddId;
let multiChoideCurrentevent;
let isPreview = false;




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
        <span class="cross-btn common-class" onclick="deleteRow(${_id})"></span>
        <input type="text" id="inputKey_${_id}" class="custom-label" onchange="inputLabelData(event, ${_id}, 'key')" >
        <input type="text" class="custom-value" id="inputVal_${_id}"  onchange="inputValueData(event, ${_id}, 'value')">
        </div>`;

        document.getElementById("rightNav").innerHTML += genComponent;
    }

    else if(ele == 'multichoice'){
        let _id = Math.random() * 1.2;

        let genComponent = `<div class="element-wid" id="${_id}">
        <span class="cross-btn common-class" onclick="deleteRow(${_id})"></span>

        <span class="add-btn common-class" onclick="addRow(${_id})"></span>
        <input type="text" id="inputKey_${_id}" class="custom-label"  onchange="inputLabelData(event, ${_id}, 'key')" >
       
       
        <div class="multi-radio" >
       
        <input id="inputRadio_${_id}" type="radio" onchange="inputValueData(event, ${_id}, 'radio')">
        <span class="custom-value" onclick="editChoice(this, ${_id})">sample</span>
         <span class="cross-btn-radio common-class" onclick="deleteRadioRow(this)"></span>
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
       let getId = document.getElementById('inputKey_'+id);     
       getId.setAttribute('value', event.target.value);
      obj  = {id:id, key:event.target.value, value: ''};
    }
    else if(origin == 'radio'){
       let getId = document.getElementById('inputRadio_'+id);     
       getId.setAttribute('checked', true);
      obj  = {id:id, key:'', value: 'checked'};
    }
    else{
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

    if(document.getElementById('multichoiceKey').value == '' && document.getElementById('multichoiceValue').value == ''){
        alert('Please add key and value to proceed further');
        return false
    }

    let _id = Math.random() * 1.2;

    let key = document.getElementById('multichoiceKey').value;
    let value = document.getElementById('multichoiceValue').value;

    let content  = `<div class="multi-radio" >
       
    <input type="radio" id="inputRadio_${_id}"  onchange="inputValueData(event, ${_id}, 'radio')">
    <span id="${_id}"  onclick="editChoice(this, ${_id})">${key}</span>
     <span class="cross-btn-radio common-class" onclick="deleteRadioRow(this)"></span>
    </div>
    </div>`
    document.getElementById(currentAddId).innerHTML += content;
    document.getElementById('main-popup').style.display = "none";
}

function editMultiChoiceSave(){
    debugger
    if((document.getElementById('multichoiceKey').value == '') && (document.getElementById('multichoiceValue').value == '')){
        alert('Please add key and value to proceed further');
        return false
    }
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
    document.getElementById("previewForm").style.display = "block";
    document.getElementById("saveMainForm").style.display = "none";
    document.getElementById("goBack").style.display = "none";
    alert('Data Saved');
}


function goback(){
    document.getElementById("goBack").style.display = "none";
    document.getElementById("saveMainForm").style.display = "block";
    document.getElementById('isPreview').style.display = 'block';
    document.querySelector(".righttNavigation").style.width = "75%";

    let cls2 = document.querySelectorAll(".common-class");
    cls2.forEach(item => {
     item.classList.remove('cross-btn-none');
    });

    let cls = document.querySelectorAll(".custom-label");
   cls.forEach(item => {
    item.classList.remove('labelTopup');
    item.removeAttribute("readonly")
   });

   let cls1 = document.querySelectorAll(".custom-value");
   cls1.forEach(item => {
    item.classList.remove('valueTopup');
    item.removeAttribute("readonly")
   });

}


function preview(){
    document.getElementById('previewForm').style.display = 'none';
    document.getElementById("goBack").style.display = "block";
    document.getElementById('isPreview').style.display = 'none';
    document.querySelector(".righttNavigation").style.width = "98%";
    document.querySelector(".righttNavigation").style.margin = "0px auto";

   
    let cls2 = document.querySelectorAll(".common-class");
    cls2.forEach(item => {
     item.classList.add('cross-btn-none');
    });

   let cls = document.querySelectorAll(".custom-label");
   cls.forEach(item => {
    item.classList.add('labelTopup');
    item.setAttribute("readonly", "readonly")
   });

   let cls1 = document.querySelectorAll(".custom-value");
   cls1.forEach(item => {
    debugger
    item.classList.add('valueTopup');
    item.setAttribute("readonly", "readonly")
   });

}