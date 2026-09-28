(function () {
  const text = {
    EN: {
      heading: 'Latest work',
      aiTitle: 'AI Academy',
      aiBody: 'Five corporate AI/ML programs delivered to 200+ participants through oil and gas cases, hands-on assignments and team projects.',
      researchTitle: 'Closed-loop field management with AI',
      researchBody: 'PhD research on AI-driven field-development optimization, including latent-space, surrogate and Bayesian optimization under limited simulation budgets.',
      open: 'Open GitHub', scholarOpen: 'Open Google Scholar', visitors: 'Visitors'
    },
    RU: {
      heading: 'Новые проекты',
      aiTitle: 'Академия ИИ',
      aiBody: 'Пять корпоративных программ по ИИ и машинному обучению для 200+ участников: нефтегазовые кейсы, практические задания и командные проекты.',
      researchTitle: 'Управление разработкой в замкнутом цикле с ИИ',
      researchBody: 'Исследование PhD по оптимизации разработки с применением ИИ, включая оптимизацию в латентном пространстве, суррогатные модели и байесовскую оптимизацию при ограниченном числе расчётов.',
      open: 'Открыть GitHub', scholarOpen: 'Открыть Google Scholar', visitors: 'Посетители'
    }
  };

  function language() {
    const label = document.querySelector('.change-lng__p');
    return label && label.textContent.trim() === 'RU' ? 'RU' : 'EN';
  }

  function updateLatest() {
    const t = text[language()];
    const visitorLabel = document.querySelector('.visitor-label');
    if (visitorLabel) visitorLabel.textContent = t.visitors + ': ';
  }

  function scholarIcon() {
    return '<svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="25" fill="#9b9b9b"/><path fill="#242424" d="M13 26.5 32 16l19 10.5L32 37 13 26.5Zm7 7.2 5 2.7v8.2c4.6 3.4 9.4 4.5 14 0v-8.2l5-2.7v13.5c-6.8 5.3-17.2 5.3-24 0V33.7Z"/></svg>';
  }

  function mountScholarLinks() {
    const href = 'https://scholar.google.com/citations?user=s3M3qVAAAAAJ&hl=en';
    document.querySelectorAll('.footer-contact-logo, .contact-content').forEach(host => {
      if (host.querySelector('.scholar-social-link')) return;
      const link = document.createElement('a');
      link.className = host.classList.contains('contact-content') ? 'contact-link scholar-social-link' : 'scholar-social-link';
      link.href = href;
      link.target = '_blank';
      link.rel = 'noopener';
      link.setAttribute('aria-label', 'Google Scholar');
      link.innerHTML = scholarIcon();
      host.prepend(link);
    });
  }

  function mount() {
    const host = document.querySelector('.footer-content');
    if (!host || document.querySelector('.visitor-counter')) return false;
    mountScholarLinks();
    const footer = document.querySelector('.footer-content');
    if (footer) {
      const counter = document.createElement('div');
      counter.className = 'visitor-counter';
      counter.innerHTML = '<span class="visitor-label"></span><strong id="visitCount">…</strong>';
      footer.append(counter);
    }
    updateLatest();
    const label = document.querySelector('.change-lng__p');
    if (label) new MutationObserver(updateLatest).observe(label, { childList: true, characterData: true, subtree: true });
    return true;
  }

  let tries = 0;
  const timer = setInterval(() => { if (mount() || ++tries > 50) clearInterval(timer); }, 100);
  window.portfolioCounter = function (result) {
    const el = document.getElementById('visitCount');
    if (el) el.textContent = result && result.value !== undefined ? Number(result.value).toLocaleString() : '—';
  };
})();
