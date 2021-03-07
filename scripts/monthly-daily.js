const tabNavs = document.querySelectorAll('.switch');
const tabPanes = document.querySelectorAll('.tab-content');

for (let i = 0; i < tabNavs.length; i++) {

  tabNavs[i].addEventListener("click", function(evt){
    evt.preventDefault();

    const activeDay = document.querySelector('.calendar__day_active')

    if (activeDay.classList.contains('calendar__day_tasked')) {
        
      document.querySelector('.daily-tasks__empty').classList.remove('daily-tasks__empty_active');
             
    } else {

      document.querySelector('.daily-tasks__empty').classList.add('daily-tasks__empty_active');
      
    }

    const activeTabAttr = evt.target.getAttribute("data-tab");

    for (let j = 0; j < tabNavs.length; j++) {
      const contentAttr = tabPanes[j].getAttribute("data-tab-content");

      if (activeTabAttr === contentAttr) {
        tabNavs[j].classList.add("switch_active");
        tabPanes[j].classList.add("tab-content_active"); 
      } else {
        tabNavs[j].classList.remove("switch_active");
        tabPanes[j].classList.remove("tab-content_active");
      }
    };
  });
}
