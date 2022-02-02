


document.querySelector('nav .switch-theme').onclick=function () {
    this.classList.toggle('bColor')
    this.children[0].classList.toggle('hidden')
    this.children[1].classList.toggle('hidden')
    document.querySelector('body').classList.toggle('dark')
    document.querySelector('nav').classList.toggle('light-dark')
    document.querySelector('.search-by-name').classList.toggle('light-dark')
    document.querySelector('.filter-by-region ul').classList.toggle('light-dark')
    document.querySelector('.filter-head').classList.toggle('light-dark')
    document.querySelectorAll('.box ').forEach((b)=>{
        b.classList.toggle('box-dark')
    })
}
//let countries=document.querySelector('.countries')
let mainPageC=document.querySelector('.main-page .content')
let countriesC=document.querySelector('.countries .container');
let details=document.querySelector('.main-page .details')
let search=document.querySelector('.search')
let vData;
//api
const url = "https://restcountries.com/v2/all";
async function get() {
    let response= await fetch(url);
    let data=await response.json();
    vData=data
    addCountries(data)
}
get()

function addCountries(data) {
    
    for (let i = 0; i < data.length; i++) {
        let box=document.createElement('div')
        box.className='box'
        box.innerHTML=`
            <img src="${data[i].flags.png}" >
            <h2 class="countryN">${data[i].name}</h2>
            <h4>Population: <span>${data[i].population}</span></h4>
            <h4>Region: <span>${data[i].region}</span></h4>
            <h4>Capital: <span>${data[i].capital}</span></h4>
            `       
        box.addEventListener('click',function () {
            boxContent(i,data)
        })
        countriesC.appendChild(box)   
    }
}

function boxContent(i,data) {
    mainPageC.style.display='none';
    details.style.display='block';
    details.innerHTML=`
    <div>
        <div class="container">
            <div><img src="${data[i].flags.png}"></div>
            <div class="detail-content">
                <h2>${data[i].name}</h2>
                <div>
                    <div>
                        <p>Population: <span>${data[i].population}</span></p>
                        <p>Sub Region: <span>${data[i].subregion}</span></p>
                        <p>Top Level Domain: <span>${data[i].region}</span></p>
                        <p>Languages: <span>${data[i].languages[0].name}</span></p>
                    </div>
                    <div>
                        <p>native Name: <span>${data[i].nativeName}</span></p>
                        <p>Region: <span>${data[i].region}</span></p>
                        <p>Capital: <span>${data[i].capital}</span></p>
                        <p>Currencies: <span>${data[i].currencies[0].name}</span></p>
                    </div>
                </div> 
                <h4>Border Countries: <span>${data[i].borders}</span></h4>
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


function searchValue(v){
    // covert v to capital first letter
    let f=v.slice(0,1).toUpperCase()
    let cV=f+`${v.slice(1)}`
    if (v!='') {
        countriesC.innerHTML=''
        for (let j = 0; j < vData.length; j++) {
            if ((vData[j].name).includes(cV)) {
                let box=document.createElement('div')
                box.className='box'
                box.innerHTML=`
                    <img src="${vData[j].flags.png}" >
                    <h2 class="countryN">${vData[j].name}</h2>
                    <h4>Population: <span>${vData[j].population}</span></h4>
                    <h4>Region: <span>${vData[j].region}</span></h4>
                    <h4>Capital: <span>${vData[j].capital}</span></h4>
                    `       
                box.addEventListener('click',function () {
                    boxContent(j,vData)
                })
                countriesC.appendChild(box)  
    
             }  
        }
    }else if (v==''){
        countriesC.innerHTML=''
        addCountries(vData)
    }
    // add dark or night mood to box when search
    if (document.querySelector('nav').classList.contains("light-dark")) {
        document.querySelectorAll('.box ').forEach((b)=>{
            b.classList.toggle('box-dark')
        })
    }
}
// region filter
document.querySelector('.filter-by-region .filter-head').onclick=function () {
    document.querySelector('.filter-by-region ').classList.toggle('filter-height')
}
// filter
document.querySelectorAll('.filter-by-region .continent li').forEach((f)=>{
    f.addEventListener('click',()=>{
        countriesC.innerHTML="";
        if (f.textContent!="All") {
            for (let i = 0; i < vData.length; i++) {
                if ((vData[i].region)==f.textContent) {
                    let box=document.createElement('div')
                    box.className='box'
                    box.innerHTML=`
                        <img src="${vData[i].flags.png}" >
                        <h2 class="countryN">${vData[i].name.common}</h2>
                        <h4>Population: <span>${vData[i].population}</span></h4>
                        <h4>Region: <span>${vData[i].region}</span></h4>
                        <h4>Capital: <span>${vData[i].capital}</span></h4>
                        `       
                    box.addEventListener('click',function () {
                        boxContent(i,vData)
                    })
                    countriesC.appendChild(box)
                }
            }
        }else{
            addCountries(vData)
        }
        document.querySelector('.filter-by-region .filter-head span').textContent=f.textContent;
        // add dark or night mood to box when click on region
        if (document.querySelector('nav').classList.contains("light-dark")) {
            document.querySelectorAll('.box ').forEach((b)=>{
                b.classList.toggle('box-dark')
            })
        }
    })
})


