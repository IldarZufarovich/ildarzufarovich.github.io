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

  function card(title, body, href, stack, type = 'github') {
    const icon = type === 'scholar'
      ? '<span class="scholar-icon" aria-hidden="true"><svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="#4285f4"/><path fill="#fff" d="M4.5 12.2 16 6l11.5 6.2L16 18.4 4.5 12.2Zm4 4.1 3 1.6v5.4c2.8 2.1 6.2 2.8 9 0v-5.4l3-1.6v8.4c-4.2 3.3-10.8 3.3-15 0v-8.4Z"/></svg></span>'
      : '<span class="github-mark" aria-hidden="true">#</span>';
    return `<div class="card-small-bg latest-card" data-link-type="${type}"><div class="card-small-stack"><p class="paragraph-text card-small-stack-text">${stack}</p></div><div class="card-small-description"><h3 class="subtitle-text card-small-header-text">${title}</h3><p class="paragraph-text card-small-description-text">${body}</p></div><div class="card-small-footer"><a class="main-link" href="${href}" target="_blank" rel="noopener">${icon}<span class="latest-open"></span></a></div></div>`;
  }

  function updateLatest() {
    const t = text[language()];
    const heading = document.querySelector('.latest-work-heading');
    if (heading) heading.textContent = t.heading;
    const cards = document.querySelectorAll('.latest-card');
    if (cards[0]) { cards[0].querySelector('.card-small-header-text').textContent = t.aiTitle; cards[0].querySelector('.card-small-description-text').textContent = t.aiBody; }
    if (cards[1]) { cards[1].querySelector('.card-small-header-text').textContent = t.researchTitle; cards[1].querySelector('.card-small-description-text').textContent = t.researchBody; }
    document.querySelectorAll('.latest-card').forEach(card => {
      const label = card.querySelector('.latest-open');
      if (label) label.textContent = card.dataset.linkType === 'scholar' ? t.scholarOpen : t.open;
    });
    const visitorLabel = document.querySelector('.visitor-label');
    if (visitorLabel) visitorLabel.textContent = t.visitors + ': ';
  }

  function mount() {
    const host = document.querySelector('.project-pet-itproject');
    if (!host || document.querySelector('.latest-work')) return false;
    const block = document.createElement('div');
    block.className = 'latest-work';
    block.innerHTML = `<div class="latest-work-title"><h2 class="latest-work-heading"></h2></div><div class="project-pet-itproject-grid latest-work-grid">${card('', '', 'https://github.com/ildarzufarovich/ai_academy', 'AI · ML · EDUCATION')}${card('', '', 'https://scholar.google.com/citations?user=s3M3qVAAAAAJ&hl=en', 'AUTOENCODER · SURROGATE · BO', 'scholar')}</div>`;
    host.prepend(block);
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
