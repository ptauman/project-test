let MyTymer;


const form = document.getElementById("form");
const submitButton = document.getElementById("submitButton");
const table = document.getElementById("soldiersTable");

const deleteButtons = document.querySelectorAll(".deleteButton");
const editButtons = document.querySelectorAll(".editButton");
const changeStatusButtons = document.querySelectorAll(".changeStatusButton");
const editform = document.getElementById("form2");
//האזנה לטופס 

form.addEventListener("submit", function(event){
    event.preventDefault();
   const newSoldier = {
    fullName : form.elements["fullNameInput"].value,
    rank : form.elements["rankInput"].value,
    position : form.elements["positionInput"].value,
    platton : form.elements["plattonInput"].value,
    time : form.elements["timeInput"].value,
    status : form.elements["statusSelector"].value,
    id : createRandomNumber(),
    mission : false
   }
    addToList(newSoldier)+9489;
}) 
editform.addEventListener("submit", function(event){
    event.preventDefault();
   let newSoldier = {
    fullName : editform.elements["fullNameInputPpopup"].value,
    rank : editform.elements["rankInputPpopup"].value,
    position : editform.elements["positionInputPpopup"].value,
    platton : editform.elements["plattonInputPpopup"].value,
    time : editform.elements["timeInputPpopup"].value,
    status : editform.elements["statusSelectorPpopup"].value,
    id :editform.elements["idSOlider"].value
   }
    changeInList(newSoldier);
}) 
function changeInList(newSoldier){
    let listLocal = JSON.parse(localStorage.getItem('soldiersList')) || [];
    let currsol = listLocal.find(item => item.id === Number(newSoldier.id));
    console.log(newSoldier.fullName)

    currsol.fullName = newSoldier.fullName
    currsol.rank = newSoldier.rank
    currsol.position = newSoldier.position
    currsol.platton = newSoldier.platton
    currsol.time = newSoldier.time
    currsol.status = newSoldier.status
    
    saveToLocal(listLocal)
    const popup = document.querySelector(".popup");
    popup.style.display ="none"; 
    normalList(listLocal)
}

function addToList (newSoldier){
    const soldiersList = JSON.parse(localStorage.getItem('soldiersList'))||[];

    soldiersList.push(newSoldier)
saveToLocal(soldiersList)
normalList(soldiersList)

}

function normalList()
{
    table.textContent ="";
    let soldiersList = JSON.parse(localStorage.getItem('soldiersList')) || [];
    soldiersList.forEach((object) => {
        const row = document.createElement("tr");        

        const fullNameCell = document.createElement("td");
        fullNameCell.textContent = object.fullName;
        row.appendChild(fullNameCell);

        const rankCell = document.createElement("td");
        rankCell.textContent = object.rank;
        row.appendChild(rankCell);

        const positionCell = document.createElement("td");
        positionCell.textContent = object.position;
        row.appendChild(positionCell);

        const plattonCell = document.createElement("td");
        plattonCell.textContent = object.platton;
        row.appendChild(plattonCell);

        const statusCell = document.createElement("td");
        statusCell.textContent = object.status;
        row.appendChild(statusCell);

        const optionscell = document.createElement("td");
        
            const optionDiv = document.createElement("div");
            optionDiv.classList.add("optionsDiv");
            
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "delete";
            deleteButton.classList.add("deleteButton");   
            deleteButton.addEventListener("click", function(){
                deleteB(object.id)
            })            
            optionDiv.appendChild(deleteButton);

            const editButton = document.createElement("button");
            editButton.textContent = "edit";
            editButton.classList.add("editButton");
            editButton.addEventListener("click", function(){
                editB(object.id)
            })
            optionDiv.appendChild(editButton);

            const missionButton = document.createElement("button");
            if(!object.mission)
                { missionButton.textContent = "mission";}
            else
                { missionButton.textContent = String(object.time);}
           
            missionButton.classList.add("missionButton");
            missionButton.addEventListener("click", function(){
                missionButtonB(object.id)
            })
            optionDiv.appendChild(missionButton);

            optionscell.appendChild(optionDiv);
            row.appendChild(optionscell);

        table.appendChild(row);
    })
    

}
function saveToLocal(soldiersList)
{
    localStorage.setItem('soldiersList', JSON.stringify(soldiersList));
    console.log(soldiersList);
}

normalList()
function deleteB(objectid)
{
    let listLocal = JSON.parse(localStorage.getItem('soldiersList')) || [];
    listLocal = listLocal.filter(item => item.id !== objectid);
    saveToLocal(listLocal)
    normalList(listLocal)
}

function missionButtonB(objectid){
    //מציאת החייל המתאים
    let listLocal = JSON.parse(localStorage.getItem('soldiersList')) || [];
    let object = listLocal.find(item => item.id === objectid);
//בדיקה שהחייל פעיל
    if(object.status !== "Retired"){
        //קביעת המשימה לאמת,
        object.mission = true;
        saveToLocal(listLocal)

        MyTymer = setInterval(updateTyme(object.id), 1000);   
    }
}

function updateTyme(objectid){
    let listLocal = JSON.parse(localStorage.getItem('soldiersList')) || [];
    let object = listLocal.find(item => item.id === objectid);
    object.time--;
    console.log("OBJECT TIME: " + object.time + " work");
    saveToLocal(listLocal)
    normalList(listLocal);

    //כיבוי הטיימר כשהוא מגיע לאפס
    if(object.time===0)
        {   
            clearInterval(MyTymer);
            object.mission = false;
            saveToLocal(listLocal)
        }
}
function editB(objectid){
    const popup = document.querySelector(".popup");
    popup.style.display = "flex"; 
    const idSOlider = document.getElementById("idSOlider");
    idSOlider.value = objectid;
    

}
const cencelButtoPpopup = document.getElementById("cencelButtoPpopup");
cencelButtoPpopup.addEventListener("click", function(){
    const popup = document.querySelector(".popup");
    popup.style.display = "none";
})
function createRandomNumber(){
    return Math.floor(Math.random()*100000000)
}




    

