// Mobile navigation
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    function closeMenu() {
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
    }
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      document.body.classList.toggle('menu-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

    // Scroll progress effects, back-to-top and active navigation
    const backTop = document.getElementById('backTop');
    const sections = [...document.querySelectorAll('main section[id]')];
    const navAnchors = [...document.querySelectorAll('.nav-links a')];
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.scrollY > 500);
      let current = '';
      sections.forEach(section => { if (window.scrollY >= section.offsetTop - 150) current = section.id; });
      navAnchors.forEach(anchor => anchor.classList.toggle('active', anchor.getAttribute('href') === '#' + current));
    }, { passive: true });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Reveal elements as they enter the viewport
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

    // Testimonial carousel
    const testimonials = [
      { text: '“The atmosphere keeps me focused, and the coaching has helped me feel confident with my training. It feels like a place where progress matters.”', name: 'Aarav S.', role: 'Member · Performance' },
      { text: '“I finally found a routine I can stick to. The team makes training approachable, challenging, and genuinely enjoyable.”', name: 'Meera K.', role: 'Member · Essential' },
      { text: '“The equipment, space, and guidance make every visit feel worthwhile. I leave feeling more focused than when I arrived.”', name: 'Rohan M.', role: 'Member · Elite' }
    ];
    let quoteIndex = 0;
    function showQuote(index) {
      quoteIndex = (index + testimonials.length) % testimonials.length;
      const quote = testimonials[quoteIndex];
      document.getElementById('quoteText').textContent = quote.text;
      document.getElementById('quoteName').textContent = quote.name;
      document.getElementById('quoteRole').textContent = quote.role;
    }
    document.getElementById('prevQuote').addEventListener('click', () => showQuote(quoteIndex - 1));
    document.getElementById('nextQuote').addEventListener('click', () => showQuote(quoteIndex + 1));

    // Membership buttons preselect the relevant enquiry interest.
    document.querySelectorAll('[data-plan]').forEach(button => button.addEventListener('click', () => {
      const interest = document.getElementById('interest');
      interest.value = 'Gym Membership';
      document.getElementById('message').value = 'I am interested in the ' + button.dataset.plan + ' membership.';
    }));

    // Prevent past dates from being selected.
    const visitDate = document.getElementById('visitDate');
    const localToday = new Date();
    visitDate.min = [localToday.getFullYear(), String(localToday.getMonth() + 1).padStart(2, '0'), String(localToday.getDate()).padStart(2, '0')].join('-');

    // Front-end form validation and feedback. No server is connected.
    document.getElementById('contactForm').addEventListener('submit', event => {
      event.preventDefault();
      const form = event.currentTarget;
      if (!form.reportValidity()) return;
      const name = document.getElementById('fullName').value.trim();
      const status = document.getElementById('formStatus');
      status.textContent = 'Thanks, ' + name + '. Your enquiry has been prepared in this page. Connect this form to your email or backend to receive submissions.';
      status.classList.add('show');
      form.reset();
      visitDate.min = [localToday.getFullYear(), String(localToday.getMonth() + 1).padStart(2, '0'), String(localToday.getDate()).padStart(2, '0')].join('-');
    });

    document.getElementById('year').textContent = new Date().getFullYear();
