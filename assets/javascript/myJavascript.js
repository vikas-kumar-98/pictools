
// Start of main javascript for header and footer

// ---------- Desktop mega-menu (hover + keyboard/click) ----------
  const navItems = document.querySelectorAll('.nav-item[data-menu]');

  function closeAllMenus(except){
    navItems.forEach(item=>{
      if(item !== except){
        item.dataset.open = "false";
        item.querySelector('.nav-link').setAttribute('aria-expanded','false');
      }
    });
  }

  navItems.forEach(item=>{
    const trigger = item.querySelector('.nav-link');
    let closeTimer;

    function open(){
      clearTimeout(closeTimer);
      closeAllMenus(item);
      item.dataset.open = "true";
      trigger.setAttribute('aria-expanded','true');
    }
    function scheduleClose(){
      closeTimer = setTimeout(()=>{
        item.dataset.open = "false";
        trigger.setAttribute('aria-expanded','false');
      }, 140);
    }

    item.addEventListener('mouseenter', open);
    item.addEventListener('mouseleave', scheduleClose);

    trigger.addEventListener('click', (e)=>{
      e.preventDefault();
      const isOpen = item.dataset.open === "true";
      if(isOpen){
        item.dataset.open = "false";
        trigger.setAttribute('aria-expanded','false');
      } else {
        open();
      }
    });
  });

  document.addEventListener('click', (e)=>{
    if(!e.target.closest('.nav-item[data-menu]')) closeAllMenus(null);
  });
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') closeAllMenus(null);
  });

  // ---------- Mobile drawer ----------
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const openBtn = document.getElementById('drawerOpen');
  const closeBtn = document.getElementById('drawerClose');

  function openDrawer(){
    drawer.classList.add('active');
    overlay.classList.add('active');
    drawer.setAttribute('aria-hidden','false');
    openBtn.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer(){
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    drawer.setAttribute('aria-hidden','true');
    openBtn.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }
  openBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeDrawer(); });

  // ---------- Mobile accordion (Tools / PDF Tools / Convert) ----------
  document.querySelectorAll('[data-acc]').forEach(acc=>{
    const trigger = acc.querySelector('.acc-trigger');
    const panel = acc.querySelector('.acc-panel');
    trigger.addEventListener('click', ()=>{
      const isOpen = acc.dataset.open === "true";
      // close siblings for a clean single-open accordion
      acc.parentElement.querySelectorAll('[data-acc]').forEach(other=>{
        if(other !== acc){
          other.dataset.open = "false";
          other.querySelector('.acc-panel').style.maxHeight = null;
        }
      });
      if(isOpen){
        acc.dataset.open = "false";
        panel.style.maxHeight = null;
      } else {
        acc.dataset.open = "true";
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  // End of main javascript for header and footer