const modules = [
  {title:'SSH',icon:'🔐',category:'foundations',description:'Connect to remote Linux servers securely and confidently.',topics:['SSH keys and key-based authentication','Remote terminal sessions and SSH config','Secure file transfer with SCP and SFTP']},
  {title:'Virtualization & VirtualBox',icon:'🖥️',category:'foundations',description:'Build isolated labs and run multiple operating systems.',topics:['Virtual machines vs physical hosts','Create and configure VMs in VirtualBox','NAT, bridged networking, and snapshots']},
  {title:'Ansible',icon:'⚙️',category:'automation',description:'Automate configuration and repeatable server tasks.',topics:['Inventory files and SSH connections','Playbooks, tasks, modules, and roles','Idempotency and configuration management']},
  {title:'Installing Docker',icon:'🐳',category:'cloud',description:'Package applications into portable, reproducible containers.',topics:['Install Docker Engine and verify setup','Images, containers, and Dockerfiles','Volumes, networks, and Docker Compose']},
  {title:'CI/CD',icon:'🔁',category:'automation',description:'Automate testing, building, and application delivery.',topics:['Continuous Integration vs Continuous Delivery','Pipeline stages and automated tests','Build and deploy using GitHub Actions']},
  {title:'AWS',icon:'☁️',category:'cloud',description:'Explore cloud infrastructure and essential AWS services.',topics:['IAM and shared responsibility','EC2, VPC, and S3 basics','Cloud security and cost awareness']},
  {title:'Kubernetes',icon:'☸️',category:'cloud',description:'Orchestrate, scale, and maintain containerized applications.',topics:['Pods, Deployments, and Services','kubectl and declarative YAML','Scaling, health checks, and rollouts']},
  {title:'Terraform',icon:'🏗️',category:'automation',description:'Define and provision infrastructure using versioned code.',topics:['Providers, resources, and variables','terraform init, plan, and apply','State management and reusable modules']},
  {title:'Prometheus & Grafana',icon:'📊',category:'observability',description:'Collect metrics, create dashboards, and understand system health.',topics:['Metrics and Prometheus scraping','PromQL fundamentals','Grafana dashboards and alerting']},
  {title:'Loki & Alloy',icon:'🔎',category:'observability',description:'Collect, ship, and query logs across your infrastructure.',topics:['Log aggregation with Grafana Loki','Grafana Alloy telemetry collection','Explore logs in Grafana with LogQL']}
];
const categoryNames={foundations:'Foundations',automation:'Automation',cloud:'Cloud & Containers',observability:'Observability'};
const grid=document.getElementById('courseGrid');
const dialog=document.getElementById('moduleDialog');
let completed;
try{completed=JSON.parse(localStorage.getItem('cf-completed')||'[]');if(!Array.isArray(completed))completed=[];}catch{completed=[];}
let currentModule=0;
function render(filter='all'){
 grid.innerHTML='';
 modules.forEach((m,i)=>{
  if(filter!=='all'&&m.category!==filter)return;
  const card=document.createElement('article');card.className='course-card';
  card.innerHTML=`<div class="card-top"><span class="card-icon" aria-hidden="true">${m.icon}</span><span class="card-num">MODULE ${String(i+1).padStart(2,'0')}</span></div><h3>${m.title}</h3><p>${m.description}</p><div class="card-bottom"><span class="tag">${categoryNames[m.category]}</span><button class="card-open" data-module="${i}" aria-label="Explore ${m.title}">Explore →</button></div>`;
  if(completed.includes(i)){const badge=document.createElement('span');badge.className='done-pill';badge.textContent='✓ Completed';card.querySelector('.card-top').appendChild(badge);}
  grid.appendChild(card);
 });
 grid.querySelectorAll('.card-open').forEach(b=>b.addEventListener('click',()=>openModule(Number(b.dataset.module))));
 updateProgress();
}
function updateProgress(){document.getElementById('progressText').textContent=`${completed.length} / ${modules.length} completed`;document.getElementById('progressFill').style.width=`${completed.length/modules.length*100}%`;}
function openModule(i){currentModule=i;const m=modules[i];document.getElementById('dialogIcon').textContent=m.icon;document.getElementById('dialogCategory').textContent=categoryNames[m.category];document.getElementById('dialogTitle').textContent=m.title;document.getElementById('dialogDescription').textContent=m.description;document.getElementById('dialogTopics').innerHTML=m.topics.map(t=>`<li>${t}</li>`).join('');document.getElementById('completeButton').textContent=completed.includes(i)?'Mark as incomplete ↩':'Mark as completed ✓';dialog.showModal();}
document.getElementById('completeButton').addEventListener('click',()=>{if(completed.includes(currentModule)){completed=completed.filter(i=>i!==currentModule);}else{completed.push(currentModule);}try{localStorage.setItem('cf-completed',JSON.stringify(completed));}catch{}render(document.querySelector('.filter.active').dataset.filter);dialog.close();});
document.getElementById('closeDialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelector('.filter.active').classList.remove('active');b.classList.add('active');render(b.dataset.filter);}));
const themeToggle=document.getElementById('themeToggle');
let theme='dark';try{theme=localStorage.getItem('cf-theme')||'dark';}catch{}
function applyTheme(){document.body.classList.toggle('light',theme==='light');themeToggle.textContent=theme==='light'?'☾ Dark mode':'☀ Light mode';}
themeToggle.addEventListener('click',()=>{theme=theme==='light'?'dark':'light';try{localStorage.setItem('cf-theme',theme);}catch{}applyTheme();});
document.getElementById('year').textContent=new Date().getFullYear();applyTheme();render();


// Continuous visual terminal simulation; commands are not executed on the visitor's computer.
(function animateTerminal(){
 const screen=document.getElementById('liveTerminal');
 if(!screen)return;
 const sequences=[
  {cmd:'git pull origin main',out:[['info','From github.com:cloudforge/devops-course'],['ok','Already up to date.']]},
  {cmd:'docker build -t cloudforge/api:latest .',out:[['info','[+] Building image with Dockerfile'],['ok','✓ Image built: cloudforge/api:latest']]},
  {cmd:'docker ps --format "table {{.Names}}\\t{{.Status}}"',out:[['info','NAMES                 STATUS'],['ok','cloudforge-api        Up 2 hours'],['ok','grafana               Up 2 hours']]},
  {cmd:'terraform plan',out:[['info','Refreshing infrastructure state...'],['ok','Plan: 0 to add, 0 to change, 0 to destroy.']]},
  {cmd:'ansible-playbook deploy.yml',out:[['info','PLAY [Configure web servers]'],['ok','ok: [web-01]'],['ok','PLAY RECAP: web-01 ok=8 changed=0 failed=0']]},
  {cmd:'kubectl get pods -n production',out:[['info','NAME                      READY   STATUS'],['ok','api-7d5b8d-9x2fa         1/1     Running'],['ok','worker-64b99d-5a2kb      1/1     Running']]},
  {cmd:'kubectl rollout status deployment/api',out:[['info','Waiting for deployment rollout...'],['ok','deployment "api" successfully rolled out']]},
  {cmd:'curl -s http://localhost:9090/-/healthy',out:[['ok','Prometheus Server is Healthy.']]},
  {cmd:'echo "Pipeline completed successfully"',out:[['ok','Pipeline completed successfully']]},
  {cmd:'aws sts get-caller-identity',out:[['info','{ "Account": "123456789012", "Arn": "arn:aws:iam::123456789012:user/demo" }']]}
 ];
 let sequenceIndex=0;let stopped=false;
 const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 function line(kind,text){const el=document.createElement('div');el.className='term-line term-'+kind;el.textContent=text;screen.appendChild(el);screen.scrollTop=screen.scrollHeight;return el;}
 async function run(){
  while(!stopped){
   const seq=sequences[sequenceIndex++%sequences.length];
   const commandLine=document.createElement('div');commandLine.className='term-line';
   const prompt=document.createElement('span');prompt.className='term-prompt';prompt.textContent='➜ ';
   const path=document.createElement('span');path.className='term-path';path.textContent='~/devops ';
   const command=document.createElement('span');command.className='term-command';
   const caret=document.createElement('span');caret.className='term-caret';
   commandLine.append(prompt,path,command,caret);screen.appendChild(commandLine);
   for(const char of seq.cmd){if(stopped)return;command.textContent+=char;screen.scrollTop=screen.scrollHeight;await wait(25+Math.random()*45);}
   caret.remove();await wait(420);
   for(const [kind,message] of seq.out){if(stopped)return;line(kind,message);await wait(340+Math.random()*300);}
   await wait(950);line('info','');
   while(screen.children.length>24)screen.firstElementChild.remove();
  }
 }
 run();
 window.addEventListener('pagehide',()=>{stopped=true;},{once:true});
})();
