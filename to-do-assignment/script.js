document.querySelector('#add-button').onclick = function(){
    if(document.querySelector('#input-para').value.length == 0){
        alert("Kindly Enter Task Name!!!!")
    }

    else{
        document.querySelector('#task-add').innerHTML += `
        <div class="to-do-list" >
        <ul class="task-list">
            <li> ${document.querySelector('#input-para').value} </li>
        </ul>
      
            <button id="delete-button">Delete</button>
        
        </div>
        `;

        var current_tasks = document.querySelectorAll("#delete-button");
        for(var i=0; i<current_tasks.length; i++){
            current_tasks[i].onclick = function(){
                this.parentNode.remove();
            }
        }
    }
}