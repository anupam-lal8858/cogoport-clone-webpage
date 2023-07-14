let count=0;
let arr=[];
let input_list= document.getElementById("input-para");

// fetching data

fetch('https://jsonplaceholder.typicode.com/todos')
.then((response)=>{
    if(!response.ok){
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then((data)=>{

    data.forEach((item)=>{
        // pushing title and tilte id into array
        arr.push({id:`${item.id}`,task: `${item.title}`});
    })
    show();
})
.catch(error=>{
    console.log('Error:',error.message);
});

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