//defining needed variables
const btn = document.querySelector('.copy-button');
const search = document.getElementById("input-text");
const para = document.querySelector(".error");
const par = document.querySelector(".err");
const output =document.querySelector(".display");
const form = document.querySelector(".input-text");
let api = "https://api.shrtco.de/v2/";
let button = document.getElementById("copy-content");
let linkArray = localStorage.getItem("links") !== null ? JSON.parse(localStorage.getItem("links")) : [];


form.addEventListener("submit",
    (e) => {
        e.preventDefault();
        let searchValue = search.value.trim();
        
        if(!searchValue) {
            para.innerHTML = "Please add a link";
            par.innerHTML = "Please add a link";
            search.style.border = "2px solid red";
        } else {
            shortenLink(searchValue);
        }
    }
)

//Creating Shortening link function
async function shortenLink(searchValue) {
    const shortenText = await fetch (`${api}/shorten?url=${searchValue}/very/long/link.html`);
    const links= await shortenText.json();
    const link = {
      search: search.value,
      links:  links.result.full_short_link2
    };
    linkArray.push(link);
    localStorage.setItem('links',JSON.stringify(linkArray));
    console.log(linkArray);
    showLinks();
    displayLink(link);
}

function showLinks() {
  let ink = localStorage.getItem("links");
  if (ink == null) {
    linkArray = [];
  } else {
    linkArray = JSON.parse(ink);
  }

  let hang = "";
  linkArray.forEach(function displayLink(text) {
    hang += `
    <div class="display-link">
       <div class="initial-link">
         <span class="first-link">${text.search}</span>
       </div>
      <hr class="horizontal-line"/> 
      <div class="shorten-link">
        <span class="shortened-link" id="text">${text.links}</span>
        <button class="copy-button" onclick="change()" id="copy-content">copy</button>
      </div>
    </div>
  `;
  }
  
  );

  const output =document.querySelector(".display");
  if (linkArray.lenght != 0) {
    output.innerHTML = hang;
  } else {
    output.innerHTML = "NO links found!"
  }
  

  const copied = document.querySelector("#copy-content");
  
  copied.addEventListener("click",(e) => {
    e.preventDefault();
    // alert('hello link');
    copied.innerHTML = "copied";
    copied.classList.add("copied-button");

    const body = document.querySelector('body');
    const paragraph = document.querySelector('#text');
    const area = document.createElement('textarea');
    body.appendChild(area);

    area.value = paragraph.innerText;
    area.select();
    document.execCommand('copy');

    body.removeChild(area);
  })
}

showLinks();





