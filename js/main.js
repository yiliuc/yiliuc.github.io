document.addEventListener("DOMContentLoaded", function() {
  // Handle collapsible functionality
  const menuIcon = document.querySelector(".nav__toggler");
  const collapsibleNav = document.querySelector(".nav");

  menuIcon.addEventListener("click", function() {
    collapsibleNav.classList.toggle("collapsible--expanded");
  });

  // Handle active nav item functionality
  const navItems = document.querySelectorAll('.nav__item a');

  // Check local storage for active nav item
  const activeNavItem = localStorage.getItem('activeNavItem');
  if (activeNavItem) {
    document.querySelector(`.nav__item a[href="${activeNavItem}"]`).parentElement.classList.add('active');
  }

  navItems.forEach(item => {
    item.addEventListener('click', function() {
      // Remove 'active' class from all nav items
      navItems.forEach(nav => nav.parentElement.classList.remove('active'));
      
      // Add 'active' class to the clicked nav item
      this.parentElement.classList.add('active');

      // Store the active nav item in local storage
      localStorage.setItem('activeNavItem', this.getAttribute('href'));
    });
  });
});
