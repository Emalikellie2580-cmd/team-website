/*
  Team Website script (CSC 216, Lab 2)
  Loaded on every page with 'defer', so the HTML is fully parsed before any of this code runs*/

  /* ---- 1. Shared runs on every page ----*/

  // Put the current year in the footer.
  const yearEl= document.querySelector('#year');
  if (yearEl) {
     yearEl.textContent = new Date().getFullYear();
  }

  // Open and close the navigation menu on small screens.
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('#site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Dark mode, remembered across pages and visits.
  const themeToggle = document.querySelector('.theme-toggle');
  const THEME_KEY = 'team-theme';

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark', isDark);
    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', String(isDark));
    }
  }

  applyTheme(localStorage.getItem(THEME_KEY));

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem(THEME_KEY, newTheme);
    });
  }

  /*----- 2. Projects page -----*/

  const projects = [
    { title: 'Personal landing page', category: 'html', description: 'A single sematic HTML page with headings, lists and links.' },
    { title: 'Responsive card grid', category: 'css', description: 'A layout that goes from one column on phones to three on laptops.' },
    { title: 'Tip calculator', category: 'js', description: 'Reads two inputs and updates the total as you type.' },
    { title: 'Accessible contact form', category: 'html', description: 'Labelled fields, helpful errors and keyboard-friendly controls.' },
    { title: 'Dark mode toggle', category: 'js', description: 'Switches the colour theme and remembers the choice.' },
    { title: 'Flexbox navigation bar', category: 'css', descripton: 'A header that collapses into a menu button on small screens.' },
    { title: 'Interactive quiz app', category: 'js', description: 'Dynamic multiple-choice questions'},
    { title: 'Team Git workflow', category: 'git', description: 'Collaborative version control respiratory with co-authored commits.'},
  ];

  const categoryNames ={ html: 'HTML', css: 'CSS', JS: 'JavaScript', git: 'Git' };

  const projectList = document.querySelector('#project-list');
  const projectCount = document.querySelector('#project-count');
  const filterButtons = document.querySelectorAll('.filter-btn');

  function renderProjects(filter) {
    const visible = filter === 'all'
    ? projects
    : projects.filter((project) => project.category === filter);

    projectList.replaceChildren();

    visible.forEach((project) => {
      const card = document.createElement('article');
      card.className = 'card';

      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = categoryNames[project.category];

      const heading = document.createElement('h3');
      heading.textContent = project.title;

      const text = document.createElement('p');
      text.textContent = project.description;

      card.append(tag, heading, text);
      projectList.append(card);
    });
    
    projectCount.textContent = `showing ${visible.length} of ${projects.length} projects`;
  }

  if (projectList) {
    renderProjects('all');

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
        button.setAttribute('aria-pressed', 'true');
        renderProjects(button.dataset.filter)
      });
    });
  }

   
  /* ----- 3. Contact page ----- */

  const form = document.querySelector('#contact-form');

  if (form) {
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');
    const charCount = document.querySelector('#char-count');
    const statusEl = document.querySelector('#form-status');

    // Load any saved draft when the user reloads the page.
    const savedMessage = localStorage.getItem('draftMessage');
    if (savedMessage && messageInput) {
      messageInput.value = savedMessage;
      charCount.textContent = messageInput.value.length; // Updates characters after a load.
    }

    // Live character Counter.
    messageInput.addEventListener('input', () => {
      charCount.textContent = messageInput.value.length;

    // Save the draftto localStorage on every key stroke
    localStorage.setItem('draftMessage', messageInput.value);
    });

    // Show (or clear) the error mesage under one field.
    function showError(input, message){
      const errorEl = document.querySelector('#${input.id}-error');
      errorEl.textContent = message;
      input.setAttribute('aria-invalid', message ? 'true' : 'false');
    }
    
    // Check every fail. Returns true only if all are valid.
    function validateForm() {
      let isValid = true;

      if (nameInput.value.trim() === '') {
        showError(nameInput, 'Please enter your name.');
        isValid = false;
      } else {
        showError(nameInput, '');
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        showError(emailInput, 'Enter an email address like name@example.com.');
        isValid = false;
      } else {
        showError(emailInput, '');
      }

      if (messageInput.value.trim ().length < 20) {
        showError(messageInput, 'Your message needs at least 20 characters.');
        isValid = false;
      } else {
        showError(messageInput, '')
      }
      
      return isValid;
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      statusEl.textContent = '';

      if (!validateForm()) {
        form.querySelector('[aria-invalid="true"]').focus();
        return;
      }

      const firstName = nameInput.value.trim().split(' ')[0];
      statusEl.textContent = 'Thanks, ${firstName}! Your message is ready. (We connect this form to a real server later.)';
      form.reset();
      charCount.textContent = '0';
    });
  }