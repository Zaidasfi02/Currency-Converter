const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@1/latest/currencies";

// https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{date}/v1/{endpoint}

const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCur=document.querySelector(".from select");
const toCur=document.querySelector(".to select");
const msg=document.querySelector(".msg");


for(let select of dropdown)
{
          for(curCode in countryList)
          {
                    let newOption=document.createElement("option");
                    newOption.innerText=curCode;
                    newOption.value=curCode;
                    if(select.name==="from" && curCode==="USD")
                    {
                              newOption.selected="selected";
                    }else if(select.name==="to" && curCode==="INR")
                    {
                              newOption.selected="selected";
                    }
                    select.append(newOption);
          }
          select.addEventListener("change",(eve)=>{
                 updateFlag(eve.target);
          })
}

const updateExchange=async()=>{
          let amount=document.querySelector(".amount input");
 let amtVal=amount.value;
 if(amtVal==="" || amtVal<1)
 {
     amtVal=1;
     amount.value="1";
 }
 const url=`${base_url}/${fromCur.value.toLowerCase()}/${toCur.value.toLowerCase()}.json`;
 let response=await fetch(url);
 let data= await response.json();
 let rate=data[toCur.value.toLOwerCase()];

 let finalAmount=amtVal*rate;
 msg.innerText=`${amtVal} ${fromCur.value} =${finalAmount} ${toCur.value}`

};

const updateFlag=(element)=>
{
          let curCode=element.value;
   let countryCode=countryList[curCode];
   let nerSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
  let img= element.parentElement.querySelector("img");
   img.src=nerSrc;
};

btn.addEventListener("click",async (eve)=>{
 eve.preventDefault();
 updateExchange();
 
});

window.addEventListener("load", () => {
          updateExchange();
        });