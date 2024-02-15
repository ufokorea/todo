// 유저는 할일을 추가할 수 있다.
// 각 할일에 삭제와 체크버튼이 있다.
// 삭제버튼을 클릭하면 할일이 리스트에서 삭제된다.
// 체크버튼을 누르면 할일이 끝난것으로 간주하고 밑줄이간다.
// 끝난 할일은 되돌리기 버튼을 클릭하면 다시 되돌릴 수 있다.
// 탭을 이용해 아이템들을 상태별로 나누어서 볼 수 있다.
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다

let taskclick = document.getElementById("task-click");
let underline = document.getElementById("underline");
let taskitem = document.getElementById("task-item");
let clicknav = document.querySelectorAll(".task-nav div");
let mode = "all";
let itemlist=[];
let chklist=[];
let list = [];

taskclick.addEventListener("click",puttask);

for(i=1; i < clicknav.length; i++) {
    clicknav[i].addEventListener("click",(event) => {

        underline.style.left=event.currentTarget.offsetLeft + "px";
        underline.style.width=event.currentTarget.offsetwidth + "px";
        underline.style.top=event.currentTarget.offsetTop + event.currentTarget.offsetHeight - 4 + "px";
        
        mode = event.target.id;
        render();
    })
}

function puttask() {

    let item = taskitem.value;

    if(item != "") {        
        const color = document.getElementById("task-color").value;        
        let tasklist = {
            id : Math.random().toString(36).substring(2, 18),
            item : item,
            isComplete: false,
            color: color 
        }

        itemlist.push(tasklist)

        document.getElementById("task-item").value = null;
        
        render();
    }
}

function render() {

    if (mode === "all") {
        list = itemlist;
    } else if (mode === "ongoing") {
        list = itemlist.filter((task) => task.isComplete === false);
    } else if (mode === "done") {
        list = itemlist.filter((task) => task.isComplete === true);
    }

    let putHtml='';
    for(let i=0; i < list.length; i++){
        let taskStyle = `style="background-color: ${list[i].color};"`;
        if(list[i].isComplete === false) {
            putHtml += `<div class="task-itemfalse" ${taskStyle}><div>${list[i].item}</div><div>
            <button onclick="checkitem('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
            <button onclick="deleitem('${list[i].id}')"><i class="fa-solid fa-trash"></i></button></div></div>`;
        } else if(list[i].isComplete === true) {
            putHtml += `<div class="task-itemtrue"><div>${list[i].item}</div><div>
            <button onclick="checkitem('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
            <button onclick="deleitem('${list[i].id}')"><i class="fa-solid fa-trash"></i></button></div></div>`;            
        }
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
            itemlist.splice(i,1);
            break;
        }
    }
    
    render();
}