

function coursecounter(){

let counters=document.querySelectorAll('.count');
console.log(counters);
let speed=500;

counters.forEach((counter) => {
    let updatecount= () =>{
        let target=parseInt(counter.getAttribute('data-target'));
        let count=parseInt(counter.innerText);
        console.log(count);
        let increment=Math.trunc(target/speed);
        console.log(count);


if(count<target){
    counter.innerText=count+increment;
    setTimeout(updatecount,1);
}
else{

count.innerText=target;




}
};

updatecount();
});
}
let i=1;
while(i<3){
coursecounter();
i++;
}

// setInterval(coursecounter(),1500);