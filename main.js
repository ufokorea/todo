// 유저는 할일을 추가할 수 있다.
// 각 할일에 삭제와 체크버튼이 있다.
// 삭제버튼을 클릭하면 할일이 리스트에서 삭제된다.
// 체크버튼을 누르면 할일이 끝난것으로 간주하고 밑줄이간다.
// 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
// 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다

let taskclick = document.getElementById("task-click");
let taskitem = document.getElementById("task-item");
let clicknav = document.querySelectorAll(".task-nav div");
let mode = "all";
let itemlist=[];
let chklist=[];
let list = [];


taskclick.addEventListener("click",puttask);



for(i=0; i < clicknav.length; i++) {
    clicknav[i].addEventListener("click",function (event) {
        filter(event);
    })
}

function puttask() {

    let item = taskitem.value;
    let tasklist = {
        id : Math.random().toString(36).substring(2, 18),
        item : item,
        isComplete: false
    }

    itemlist.push(tasklist)

    document.getElementById("task-item").value = null;
    
    render();
}

function render() {
console.log(mode)
    if (mode === "all") {
        list = itemlist;

    } else if (mode === "ongoing" ) {
        chklist.length=0;
        
        for(let i=0;i < itemlist.length;i++){
            if(itemlist[i].isComplete === false) {
                chklist.push(itemlist[i]); 
            }
        }
        list = chklist;

    } else if (mode === "done" ) {

        chklist.length=0;        
        for(let i=0;i < itemlist.length;i++){
            if(itemlist[i].isComplete === true) {
                chklist.push(itemlist[i]); 
            }
        }
        list = chklist;
    } 

    let putHtml='';
    for(let i=0; i < list.length; i++){

        putHtml += `<div class="task-item${list[i].isComplete}"><div>${list[i].item}</div><div>
        <button onclick="checkitem('${list[i].id}')">완료여부</button>
        <button onclick="deleitem('${list[i].id}')">삭제</button></div></div>`;
    }

    document.getElementById("putitem").innerHTML=putHtml;    
}

function checkitem(chkid) {
 
    for(let i=0; i < itemlist.length; i++){
        if(itemlist[i].id === chkid) {
            itemlist[i].isComplete = !itemlist[i].isComplete;
            break;
        }
    }
 
    render();
}

function deleitem(chkid) {

    for(let i=0; i < itemlist.length; i++){
        if(itemlist[i].id === chkid) {
            list.push(itemlist[i]); 
            itemlist.splice(i,1);
            break;
        }
    }
    
    render();
}

function filter(event) {
  
    mode = event.target.id;

    render();

}

