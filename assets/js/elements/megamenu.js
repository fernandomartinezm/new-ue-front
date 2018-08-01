document.addEventListener("mouseover", event => {
  if(!event.target.classList || !event.target.classList.contains('megamenu-trigger')) {
    return false;
  }
  removeActiveClass();
  closeMenu();
  let menuid = null;
  if(!event.target.dataset || !event.target.dataset.menuid) {
    return false;
  } else {
    menuid = event.target.dataset.menuid;
  }
  const menu = document.getElementById(menuid);

  if(!menu.classList.contains('open')) {
    menu.classList.add('open');
    event.target.classList.add('active');
  } else{
    menu.classList.remove('open');
  }
});

//using closure to cache all child elements
const menulayer = document.getElementById("megamenu-layer");
menulayer.addEventListener('mouseout',makeMouseOutFn(menulayer),true);

function makeMouseOutFn(elem){
  const list = traverseChildren(elem);
  return function onMouseOut(event) {
    let e = event.toElement || event.relatedTarget;
    if (!!~list.indexOf(e)) {
      return;
    }
    // handle mouse event here!
    closeMenu();
    removeActiveClass();
  };
}

//quick and dirty BFS children traversal
function traverseChildren(elem){
  const children = [];
  const q = [];
  q.push(elem);
  while (q.length>0)
  {
    let elem = q.pop();
    children.push(elem);
    pushAll(elem.children);
  }
  function pushAll(elemArray){
    for(let i=0;i<elemArray.length;i++)
    {
      q.push(elemArray[i]);
    }
  }
  return children;
}

function closeMenu(){
  const menu = document.getElementsByClassName('megamenu-content open');
  for(let i = 0; i < menu.length; i++) {
    menu[i].classList.remove('open');
  }
}

function removeActiveClass(){
  const menu = document.getElementsByClassName('megamenu-trigger active');
  for(let i = 0; i < menu.length; i++) {
    menu[i].classList.remove('active');
  }
}