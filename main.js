
let filterRegion=document.querySelector('.filter-by-region');
filterRegion.onclick=function () {
    this.classList.toggle('filter-height')
}
//let countries=document.querySelector('.countries')
let mainPageC=document.querySelector('.main-page .content')
let countriesC=document.querySelector('.countries .container');
let details=document.querySelector('.main-page .details')
let search=document.querySelector('.search')
let vData;
//api
const url = "https://restcountries.com/v3.1/all";
async function get() {
    let response= await fetch(url);
    let data=await response.json();
    addCountries(data)
}
get()

function addCountries(data) {
    
    for (let i = 0; i < data.length; i++) {
 
        let box=document.createElement('div')
        box.className='box'
        box.innerHTML=`
            <img src="${data[i].flags.png}" >
            <h2 class="countryN">${data[i].name.common}</h2>
            <h4>Population: <span>${data[i].population}</span></h4>
            <h4>Region: <span>${data[i].region}</span></h4>
            <h4>Capital: <span>${data[i].capital}</span></h4>
            `       
        box.addEventListener('click',function () {
            boxContent(data,i)
        })
        countriesC.appendChild(box)  
    }
}
function boxContent(data,i) {
    mainPageC.style.display='none';
    details.style.display='block';
    details.innerHTML=`
    <div>
        <div class="container">
            <div><img src="${data[i].flags.png}"></div>
            <div>
            <h2>${data[i].name.common}</h2>
            <h4>Population: <span>${data[i].population}</span></h4>
            <h4>Sub Region: <span>${data[i].subregion}</span></h4>
            <h4>Top Level Domain: <span>${data[i].region}</span></h4>
            <h4>Languages: <span>${data[i].languages}</span></h4>
            <h4>Border Countries: <span>${data[i].borders}</span></h4>
            </div>
            <div>
            <h4>native Name: <span></span></h4>
            <h4>Region: <span>${data[i].region}</span></h4>
            <h4>Capital: <span>${data[i].capital}</span></h4>
            <h4>Currencies: <span>${data[i].currencies}</span></h4>
            </div>
        </div>
        <button type="submit" class="back" onclick=backToCountries()>Back</button>
    </div>
    `
}
function backToCountries(){
    mainPageC.style.display='block';
    details.style.display='none';
}
// input value search


    // function searchValue(v){
    //     countriesC.innerHTML=''
    //     for (let i = 0; i < data.length; i++) {
    //         if (v!=''&&(data[i].name.common).includes(v)) {
    //             console.log('alllll')
    //         }
            
    //     }
    //  }
 




        // if (search.value=='') {
        //     let box=document.createElement('div')
        //     box.className='box'
        //     box.innerHTML=`
        //         <img src="${data[i].flags.png}" >
        //         <h2 class="countryN">${data[i].name.common}</h2>
        //         <h4>Population: <span>${data[i].population}</span></h4>
        //         <h4>Region: <span>${data[i].region}</span></h4>
        //         <h4>Capital: <span>${data[i].capital}</span></h4>
        //         `       
        //     box.addEventListener('click',function () {
        //         boxContent(data,i)
        //         })
        //     countriesC.appendChild(box)  
        // }else if(search.value!=''){
        //     console.log('aaaaaa')
        // }