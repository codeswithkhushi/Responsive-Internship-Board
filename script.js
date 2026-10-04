const internships = [
{
title:"Frontend Web Development Intern",
company:"TechNova",
domain:"Web Development",
location:"Remote",
skills:["HTML","CSS","JavaScript"],
icon:"💻",
badge:"Featured"
},
{
title:"Java Developer Intern",
company:"CodeLabs",
domain:"Java",
location:"Remote",
skills:["Java","OOP","SQL"],
icon:"☕",
badge:"New"
},
{
title:"Python Development Intern",
company:"DevWorks",
domain:"Python",
location:"Hybrid",
skills:["Python","Django","Data Analysis"],
icon:"🐍",
badge:"New"
},
{
title:"Data Science Intern",
company:"AnalyticsHub",
domain:"Data Science",
location:"Remote",
skills:["Python","Pandas","Machine Learning"],
icon:"📊",
badge:"New"
},
{
title:"UI/UX Design Intern",
company:"CreativeMind",
domain:"Design",
location:"Remote",
skills:["Figma","UI Design","UX Research"],
icon:"🎨",
badge:"New"
},
{
title:"Backend Development Intern",
company:"CloudTech",
domain:"Web Development",
location:"Hybrid",
skills:["Node.js","Express","MongoDB"],
icon:"☁️",
badge:"New"
},
{
title:"Marketing Intern",
company:"GrowthWorks",
domain:"Marketing",
location:"Remote",
skills:["SEO","Content","Social Media"],
icon:"📢",
badge:"New"
},
{
title:"Java Software Intern",
company:"ByteWorks",
domain:"Java",
location:"Hybrid",
skills:["Java","Spring","MySQL"],
icon:"⚙️",
badge:"New"
},
{
title:"Python AI Intern",
company:"FutureLabs",
domain:"Python",
location:"Remote",
skills:["Python","AI","Machine Learning"],
icon:"🤖",
badge:"Featured"
}
];

const grid=document.getElementById("internshipGrid");
const searchInput=document.getElementById("searchInput");
const searchForm=document.getElementById("searchForm");
const resultCount=document.getElementById("resultCount");
const emptyState=document.getElementById("emptyState");
const errorState=document.getElementById("errorState");
const clearBtn=document.getElementById("clearBtn");
const emptyClearBtn=document.getElementById("emptyClearBtn");
const retryBtn=document.getElementById("retryBtn");
const themeBtn=document.getElementById("themeBtn");
const filters=document.querySelectorAll(".filter");

let activeDomain="All";

function renderInternships(){
try{
const search=searchInput.value.toLowerCase().trim();

const filtered=internships.filter(item=>{
const matchesSearch=
item.title.toLowerCase().includes(search) ||
item.company.toLowerCase().includes(search) ||
item.domain.toLowerCase().includes(search) ||
item.skills.some(skill=>skill.toLowerCase().includes(search));

const matchesDomain=
activeDomain==="All" || item.domain===activeDomain;

return matchesSearch && matchesDomain;
});

grid.innerHTML="";

resultCount.textContent=
`Showing ${filtered.length} internship${filtered.length!==1?"s":""}`;

if(filtered.length===0){
emptyState.hidden=false;
grid.hidden=true;
}else{
emptyState.hidden=true;
grid.hidden=false;

filtered.forEach(item=>{
const card=document.createElement("article");
card.className="card";

card.innerHTML=`
<div class="card-top">
<div class="card-icon">${item.icon}</div>
<span class="badge ${item.badge==="Featured"?"featured":""}">
${item.badge}
</span>
</div>

<h3>${item.title}</h3>
<p class="company">${item.company}</p>
<p class="location">📍 ${item.location}</p>

<div class="skills">
${item.skills.map(skill=>`<span class="skill">${skill}</span>`).join("")}
</div>

<button class="details-btn" type="button">
View Details →
</button>
`;

grid.appendChild(card);
});
}
}catch(error){
grid.hidden=true;
emptyState.hidden=true;
errorState.hidden=false;
}
}

filters.forEach(filter=>{
filter.addEventListener("click",()=>{
filters.forEach(item=>item.classList.remove("active"));
filter.classList.add("active");

activeDomain=filter.dataset.domain;
renderInternships();
});
});

searchForm.addEventListener("submit",event=>{
event.preventDefault();
renderInternships();
});

searchInput.addEventListener("input",renderInternships);

function clearFilters(){
searchInput.value="";
activeDomain="All";

filters.forEach(filter=>{
filter.classList.toggle("active",filter.dataset.domain==="All");
});

errorState.hidden=true;
renderInternships();
}

clearBtn.addEventListener("click",clearFilters);
emptyClearBtn.addEventListener("click",clearFilters);
retryBtn.addEventListener("click",()=>{
errorState.hidden=true;
renderInternships();
});

themeBtn.addEventListener("click",()=>{
document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){
themeBtn.textContent="☀";
themeBtn.setAttribute("aria-label","Switch to light mode");
}else{
themeBtn.textContent="☼";
themeBtn.setAttribute("aria-label","Switch to dark mode");
}
});

renderInternships();