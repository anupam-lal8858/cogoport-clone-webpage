// document.querySelector('#add-button').onclick = function(){
//     if(document.querySelector('#input-para').value.length == 0){
//         alert("Kindly Enter Task Name!!!!")
//     }

//     else{
//         document.querySelector('#task-add').innerHTML += `
        // <div class="to-do-list" >
        // <ul class="task-list">
        //     <li> ${document.querySelector('#input-para').value} </li>
        // </ul>
      
        //     <button id="delete-button">Delete</button>
        
        // </div>
//         `;

//         var current_tasks = document.querySelectorAll("#delete-button");
//         for(var i=0; i<current_tasks.length; i++){
//             current_tasks[i].onclick = function(){
//                 this.parentNode.remove();
//             }
//         }
//     }
// }
let count=0;
let arr=[];
let input_list= document.getElementById("input-para");

function add(){
    if(input_list.value.length===0)
    alert('Kindly enter the value');
    else
    {
        arr.push({id:count, task:input_list.value});
        count++;
        show();
    }
}
function deleteId(del_id){
    let arr2=[];
    let j=0;
   for (let i=0;i<arr.length;i++)
   {
    if(arr[i].id!=del_id){
        arr2[j]=({id:arr[i].id,task:arr[i].task});
        j++;
    }
      
   }
    arr=arr2;
    show();
 

}
function show(){
    let task_add= document.getElementById("task-add");
    task_add.innerHTML=``;
    arr.forEach(ele=>{
        task_add.innerHTML+=`
        <div class="to-do-list" id=" ${ele.id}">
        <ul class="task-list">
            <li> ${ele.task} </li>
        </ul>
      
            <button id="delete-button" onclick="deleteId( ${ele.id})">Delete</button>
        
        </div>`
    });
   
}