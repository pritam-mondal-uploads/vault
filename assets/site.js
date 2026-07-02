
const availableThemes=['premium-wealth','emerald-ledger','obsidian-rose','carbon-azure','noir-copper'];
function currentTheme(){
  try{const saved=localStorage.getItem('vaultTheme');return availableThemes.includes(saved)?saved:'premium-wealth'}catch(e){return 'premium-wealth'}
}
function syncThemeMenu(theme){
  document.querySelectorAll('.theme-option').forEach(option=>{
    const active=option.dataset.themeValue===theme;
    option.classList.toggle('active',active);
    option.querySelector('.theme-check').textContent=active?'\u2713':'';
  });
}
function closeThemeMenu(){
  document.getElementById('themeMenu').hidden=true;
  document.getElementById('themeTrigger').setAttribute('aria-expanded','false');
}
function closeMobileMenu(){
  document.getElementById('staticNav').classList.remove('open');
  document.getElementById('mobileMenuTrigger').setAttribute('aria-expanded','false');
}
function setTheme(theme){
  if(!availableThemes.includes(theme))theme='premium-wealth';
  document.documentElement.setAttribute('data-theme',theme);
  document.getElementById('siteRoot').setAttribute('data-theme',theme);
  try{localStorage.setItem('vaultTheme',theme)}catch(e){}
  syncThemeMenu(theme);
  closeThemeMenu();
}
document.addEventListener('DOMContentLoaded',()=>{
  setTheme(currentTheme());
  document.getElementById('themeTrigger').addEventListener('click',()=>{
    const menu=document.getElementById('themeMenu'),opening=menu.hidden;
    menu.hidden=!opening;
    document.getElementById('themeTrigger').setAttribute('aria-expanded',String(opening));
    closeMobileMenu();
  });
  document.querySelectorAll('.theme-option').forEach(option=>option.addEventListener('click',()=>setTheme(option.dataset.themeValue)));
  document.getElementById('mobileMenuTrigger').addEventListener('click',()=>{
    const nav=document.getElementById('staticNav'),opening=!nav.classList.contains('open');
    nav.classList.toggle('open',opening);
    document.getElementById('mobileMenuTrigger').setAttribute('aria-expanded',String(opening));
    closeThemeMenu();
  });
  document.addEventListener('click',event=>{
    if(!event.target.closest('#themeControl'))closeThemeMenu();
    if(!event.target.closest('#staticNav')&&!event.target.closest('#mobileMenuTrigger'))closeMobileMenu();
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeThemeMenu();closeMobileMenu()}});
});
