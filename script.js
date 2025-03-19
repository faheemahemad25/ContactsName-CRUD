const addUserBtn = document.getElementById('addUser');
const addBtnTxt = addUserBtn.innerText; // so that if on front end any one change button name then same when js involved. btn ka text nikal lo
const usernameTxtField = document.getElementById('username');
const rowsDisplayContainer = document.getElementById('rows-display-container');


let userArray = JSON.parse(localStorage.getItem('users')) || []; //📗🔖Problem: when refrence then again new start. saved data push bcz push dont care what had or have just put in last.
// userArray = JSON.parse(localStorage.getItem('users')); // empty array set if write here 
let edit_id=null; // jb tk iski vakue null tb tk to add krva te raho but jb isko koi id mil jae tb


// user data get
addUserBtn.addEventListener('click',(e)=>{ // is button pr click tb edit hoga ya delete hoga vo yha decide ho jaega
    e.preventDefault();
    const name = usernameTxtField.value;
    
    
    if (edit_id != null) {
        // edit               or at edit time if block runs or true
        userArray.splice(edit_id, 1, { 'name': name, });
        edit_id = null;
       
    } else {
        // insert add                or at edit time else block runs or true
        // const name = usernameTxtField.value;
        userArray.push({
            'name': name,
        })
    }
    // in both case save and edit these things happens. this common
     // addUserBtn.innerText="Add User";
     addUserBtn.innerText = addBtnTxt; //btn ka text nikal kr 
    
    
     console.log(userArray);
     SaveInfo();
     usernameTxtField.value="";
     DisplayInfo();   // after adding again runs so that can show added data
   
})

// user data store 
function SaveInfo(){
  localStorage.setItem("users", JSON.stringify(userArray))
};

const DisplayInfo=()=>{
    // let statements = "";
    rowsDisplayContainer.innerHTML=""; //it is so when add then previous list empty bcz at start we disply so DOUBLE_DOUBLE show.
    
    userArray.forEach((user,i)=>{
        console.log(user);
        console.log(i);
        // console.log(user.name);
        // statements = statements + `
        rowsDisplayContainer.innerHTML = rowsDisplayContainer.innerHTML + `
            <tr class="userRow">
                <td class="border border-gray-300 p-2">${i+1}.</td>
                <td class="border border-gray-300 p-2 ">${user.name}</td>
                <td class="border border-gray-300 p-2">
                    <button onclick='EditInfo(${i})' class="  p-2 bg-[#2294ed] text-white rounded btn active:scale-90 m-1">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button onclick='DeleteInfo(${i})' class="  p-2 bg-[#C32148] text-white rounded btn active:scale-90 m-1">
                        <i class="deleteBtn fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
   });
//    console.log(statements);
//    rowsDisplayContainer.innerHTML = statements;
};
DisplayInfo(); // at the time of page load so it runs firstly

const EditInfo=(id)=>{  //id means index why index it reprent which index(id) edit krna h uska index no means uski id 
    console.log(id);
    edit_id=id; // when click then clicked ele id meand index to be stored in edit_id mei kr do

    // usernameTxtField.value = "jj"; // what ever we write disply there
    usernameTxtField.value = userArray[edit_id].name;
    
    addUserBtn.innerText="Update";
    
    
};

console.log(userArray);
const DeleteInfo = function(id){ //id means index why index it reprent which index(id) delete krna h uska index no means uski id
    console.log(id);
    
    
    userArray.splice(id,1); // delete like push() add
    SaveInfo(); // bcz now deleted so update the user array measn again save so deleted array.
    DisplayInfo(); // bcz display bhi to krnva h
    console.log(userArray);

};

// ==========================================   
//               Search 
// ===========================================   

const allTr = document.querySelectorAll("#rows-display-container tr");
console.log(allTr);

const searchInputFiled = document.querySelector("#search");

searchInputFiled.addEventListener('input', (e)=>{
   
    // console.log("e",e);
    // console.log("e.data",e.data);
    // console.log("e.target",e.target);
    // console.log(e.target.value);
    
//    console.log(e.target.value);
   const searchedStr = e.target.value.toLowerCase();
   console.log(searchedStr);
   
   rowsDisplayContainer.innerHTML="";   

   allTr.forEach(tr=>{
    // console.log("eachTr",tr);
       const allTd = tr.querySelectorAll("td");
    //    console.log("allTd",allTd);
       console.log(allTd[1].innerText.toLowerCase());

       if(allTd[1].innerText.toLowerCase().indexOf(searchedStr) > -1){
            rowsDisplayContainer.append(tr);
       };
   });
   
   if(rowsDisplayContainer.innerHTML===""){
       rowsDisplayContainer.innerHTML="No Records Found.";
   }
   
   
});


// ==========================================   
//               Pagination 
// ===========================================

const total_tr = document.querySelectorAll("#rows-display-container tr");
const total_records = total_tr.length;
let records_per_page = 7;
let total_page = Math.ceil(total_records / records_per_page);
let page_number = 1;
 

const paginationContainer = document.querySelector('#paginationNumbers')
const generatePage=()=>{
    let prevBtn =  `<li class=" p-2 border-2 border-gray-300 " >
                        <a class="page-link" onclick="prevBtn()" href="javascript:void(0)" id="prevBtn">Previous</a>
                     </li>`  ;
    let nextBtn =  `<li class=" p-2 border-2 border-gray-300" >
                        <a class="page-link" onclick="nextBtn()" href="javascript:void(0)" id="nextBtn">Next</a>
                    </li>`  ;  
             
    let buttons = '';
    for(let i=1; i<=total_page; i++){
           buttons = buttons + `<li class=" activeloop p-2 border-2 border-gray-300" id="page${i}">
                                    <a class="page-link" href="javascript:void(0)" onclick="visitPage(${i})" ">${i}</a>
                                </li>`
    };
    paginationContainer.innerHTML=`${prevBtn} ${buttons} ${nextBtn}`;


    //🔖📗PROBLEM: without =+ only last element show in ui that why we used👆
    // for(let i=1; i<=total_page; i++){
           
    //     paginationContainer.innerHTML =  `<p class="bg-blue-200 p-1">
    //                                          <a>${i}<a/>
    //                                       </p>`;
    // }


    // let pages = '';
    // for(let i=1; i<=total_page; i++){
           
    //     pages = pages + `<p>${i}</p>`; // WHY WE NEED of it.
    // }
    // paginationContainer.innerHTML = pages;

}
generatePage();

const nextBtn=()=>{
    page_number++;
    DisplayRecords();

}

const prevBtn=()=>{
    page_number--;
    DisplayRecords();

}

const visitPage=(clickedPage)=>{
    page_number = clickedPage;
    DisplayRecords();
}



const DisplayRecords=()=>{
    let start_index = (page_number - 1) * records_per_page;                      console.log(start_index);//0 10 20
    let end_index = start_index + (records_per_page - 1);                      console.log(end_index);//9 19 29
    
    if(end_index >= total_records){
        end_index = total_records - 1;
    }
    
    
    
    let statement = '';
    for(let i=start_index; i<=end_index; i++){
        console.log(i);
        console.log(total_tr[i]);
        // console.log(total_tr[i].innerHTML);
        // console.log(`<tr>${total_tr[i].innerHTML}</tr>`) ;
        // statement = statement + `${total_tr[i]}`;  //📗🔖 direct total_tr[i] not working ?🤔
        statement = statement + `<tr>${total_tr[i].innerHTML}</tr>`;  //📗🔖indirect loop on total_tr  OR 2nd Way of loop.
        // console.log(total_tr);
        // console.log(total_tr[i]);  
    };
    rowsDisplayContainer.innerHTML = statement;

    
    const allBtns = document.querySelectorAll('.activeloop');// step1, querySelectorAll array.
    allBtns.forEach(btn=>{
        // before step2, put each btn click EventListner.
        btn.classList.remove('active');
    })
    document.getElementById(`page${page_number}`).classList.add('active');


    // or 

    // my version via click 
    // const allBtns = document.querySelectorAll('.activeloop');// step1, queryAll
    // allBtns.forEach(btn=>{
    //     btn.addEventListener("click",()=>{
    //         allBtns.forEach(bt=>{
    //             bt.classList.remove('active');
    //         })

    //         document.getElementById(`page${page_number}`).classList.add('active');
    //     })
    //     // step2, put each btn click EventListner.
    //     btn.classList.remove('active');
    // })
    // document.getElementById(`page${page_number}`).classList.add('active');

 

   // ✅ Disable Prev Button on First Page
   const prevBtn = document.getElementById("prevBtn");
   if (page_number === 1) {
       prevBtn.removeAttribute("onclick"); // Remove event listener
       prevBtn.style.color="gray"  // it is just to give feel disabled.
    //    prevBtn.classList.add("disabled");
   } else {
       prevBtn.setAttribute("onclick", "prevBtn()");
       prevBtn.removeAttribute('style')
    //    prevBtn.classList.remove("disabled");
   }

   // ✅ Disable Next Button on Last Page
   const nextBtn = document.getElementById("nextBtn");
   if (page_number === total_page) {
       nextBtn.removeAttribute("onclick");
       nextBtn.style.color="gray" // it is just to give feel disabled.
    //  nextBtn.classList.add("disabled");
   } else {
       nextBtn.setAttribute("onclick", "nextBtn()");
       nextBtn.removeAttribute('style')
    //  nextBtn.classList.remove("disabled");
   }

//    document.getElementById('page-details').innerHTML = `Showing ${start_index + 1} to ${end_index + 1} of ${total_records}`

}
DisplayRecords();

 


const SelectOpt = document.querySelector('#selopt');
SelectOpt.addEventListener("change",(e)=>{
    let Selectedinp =  parseInt(e.target.value) 
    records_per_page = Selectedinp;
    total_page = Math.ceil(total_records / records_per_page);
    page_number = 1;
    generatePage();
    DisplayRecords();
     

})



