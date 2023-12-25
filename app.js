const tabsContainer = document.querySelector('.tabs-container');
const tabsList = tabsContainer.querySelector("ul");
const tabButtons = tabsList.querySelectorAll('a');
const tabPanels = tabsContainer.querySelectorAll('.tabs__panels > div');

tabsList.setAttribute('role', 'tablist');

tabsList.querySelectorAll('li').forEach((listItem)=>{
    // console.log(listItem);
    listItem.setAttribute('role', 'presentation');
    // listItem.setAttribute('role', 'tab');
})

tabButtons.forEach((tab, index) => {
    tab.setAttribute("role", "tab");
    if(index === 0){
        console.log(tab);
        tab.setAttribute("aria-selected", "true");

        //do something in the future
    }else {
        tab.setAttribute("tabindex", '-1');
      tabPanels[index].setAttribute('hidden', "");  
    }
});

tabPanels.forEach(panel=>{
    panel.setAttribute("tabindex", "0");
})

tabsContainer.addEventListener("click", (event)=>{
    const clickedTab = event.target.closest("a");

    if(!clickedTab) return;

    // console.log(clickedTab);
    event.preventDefault();

    switchTab(clickedTab);

});

tabsContainer.addEventListener("keydown", (event)=>{
//  console.log(event);
switch (event.key) {
    case 'ArrowLeft':
        moveLeft();
        break;

    case "ArrowRight":
        moveRight();
        break;
    
    case "Home":
        event.preventDefault();
        switchTab(tabButtons[0]);
        break;

    case "End":
        event.preventDefault();
        switchTab(tabButtons[tabButtons.length - 1]);
        break;
}
})

function moveLeft(){
    const currentTab = document.activeElement;
     
    if(!currentTab.parentElement.previousElementSibling){
        switchTab(tabButtons[tabButtons.length - 1]);
    }

    switchTab(currentTab.parentElement.previousElementSibling.querySelector("a"));
}
function moveRight(){

    const currentTab = document.activeElement;
     
    if(!currentTab.parentElement.nextElementSibling){
        switchTab(tabButtons[0]);
    }

    switchTab(currentTab.parentElement.nextElementSibling.querySelector("a"));
}

function switchTab(newTab){
    const activePanelId = newTab.getAttribute('href');

    const activePanel = tabsContainer.querySelector(activePanelId);

    tabPanels.forEach((panel)=>{
        panel.setAttribute("hidden", "");

        tabButtons.forEach(tab=>{
        tab.setAttribute("aria-selected", false);
        tab.setAttribute("tabindex", "-1");
        })
    });

    activePanel.removeAttribute("hidden");
    newTab.setAttribute("aria-selected", true);
    newTab.setAttribute("tabindex", '0');
    newTab.focus();
    moveIndicator(newTab);
}

function moveIndicator(newTab){
 const newTabWidth = newTab.offsetWidth / tabsContainer.offsetWidth;

  tabsContainer.style.setProperty('--_left', newTab.offsetLeft + 'px');
 tabsContainer.style.setProperty('--_width', newTabWidth);

}



