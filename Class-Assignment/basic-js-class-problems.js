// var num1=1;
// var num2=1;
// var num3=0;
// console.log(num1);
// console.log(num2);
// for(let i=1;i<=98;i++)
//  {  num3=num1+num2;
//    console.log(num3);
//    num1=num2;
//    num2=num3;
// }

function fact(num){
    if(num==1)
    return 1;
    let res=1;
    for (let i=1;i<=num;i++)
    {
        res=res*i;

    }
    return res;
}

console.log(fact(4));



