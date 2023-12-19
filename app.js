
// Created the document fragement in order to avoid alot of reflow and repaint
const NavUl = document.querySelector('#NavbarList');
const NavIcon = document.querySelector('.MenuIcon');
const Fragement = document.createDocumentFragment();
const Sections = [...document.querySelectorAll('Section')];

/*
 * End Global Variables
 * Begin Main Functions
*/
//highlighting the nav links and removing highlights from all other nav links
function NavItemsHighlight (NavElement, aLink){
    NavElement.classList.add('Active');
    aLink.classList.add('Active');
    const ItemsList = [...NavUl.querySelectorAll('li')];
    ItemsList.map(function(item){
      // Checking that these are the siblings not the navItm itself
        if (item !== NavElement){
            if(item.classList.contains('Active')){
                item.classList.remove('Active');
                item.querySelector('a').classList.remove('Active');
            }
        }
    });
}

// Building the navigation bar
function AddNavElements(){
    Sections.map(function (Section){
        // Get the name to refer to the section
        const SectionName = Section.getAttribute('DataNav');
        // Get the section id to link to it
        const IdOfSection = Section.getAttribute('id');
        // Create the list item to hold all these information inside the navbar
        const li = document.createElement('li');
        li.classList.add('NavElement');
        li.innerHTML = `<a class = 'Menu_Go' href = '#${IdOfSection}'> ${SectionName} </a>`;
        // Append method doesn't cause document reflow or repaint
        Fragement.appendChild(li);
    });
    // this will reflow and repaint one time
    NavUl.appendChild(Fragement);
}

// this section will scroll to anchor with smooth scrolling behaviour
function smoothScrolling (){
    const ItemsList = [...NavUl.querySelectorAll('li')];
    ItemsList.map(function(ItemsList){
        // Get the <a> element
        const link = ItemsList.querySelector('a');
        // retrive the id of the clicked link
        const linkId = link.getAttribute('href');
        // Storing the section
        const clickedSection = document.querySelector(linkId);
        link.addEventListener('click', function (event){
            event.preventDefault();
            // smooth scrolling
            clickedSection.scrollIntoView({behavior: 'smooth'});
            NavItemsHighlight(ItemsList, link);
        });
    });

}
//Adding Active Class to Section when it is near the top of viewport
function ActiveSection() {

    const ItemsList = [...NavUl.querySelectorAll('li')];
    window.addEventListener('scroll', function (){
        Sections.map(function (Section, index){
            // Get the distance between the top of the window and the top of the section
            const TopSection = Section.getBoundingClientRect().top;
            // Get the bottom of the section
            const BottomSection = Section.getBoundingClientRect().bottom;
            // Get the section height
            const HeightOfSection = Section.getBoundingClientRect().height;
            // Check that the amount of section's content that appears is at least 60% of its height
            // In the first operand, the 'smaller than' sign here denotes the inverse relationship between sectionTop and the amount of section's content that appears
            
            if (TopSection <= 0.60*HeightOfSection && BottomSection > 0.60*HeightOfSection){
                if (!Section.classList.contains('ActiveClass')){
                    Section.classList.add('ActiveClass');
                    // Highlight the Nav Item responding to the active section
                    NavItemsHighlight(ItemsList[index], ItemsList[index].querySelector('a'));
                }
                if (index > 0){
                    Sections[index-1].classList.remove('ActiveClass');
                }
            } else{
                // Checking that only one section is set to active and other's not while they are not in view
                Section.classList.remove('ActiveClass');
            }
        });
    });
}




document.addEventListener('DOMContentLoaded', function callAllFuncs(){
    // Build menu
    AddNavElements();
    // Scroll to section on link click
    smoothScrolling();
    // Set sections as active
    ActiveSection();
    
});

// Making the navigation bar responsive
NavIcon.addEventListener('click', function() {
    NavIcon.classList.toggle('clicked');
    NavUl.classList.toggle('clicked');

});
