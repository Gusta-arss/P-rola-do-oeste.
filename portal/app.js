const docs = {
  educard: {
    label: 'EDUCARD', title: 'Checklist do EduCard', description: 'Confira cada item antes de enviar seu processo.', fee: 'R$ 19,50',
    items: [
      ['Formulário 2026 assinado','Assinatura do aluno ou do responsável legal.'],
      ['Cartão EduCard atual','Quem já possui o cartão pode continuar usando o mesmo. Em caso de perda, confirme as regras da segunda via.'],
      ['RG ou certidão de nascimento','Se anexar RG, envie frente e verso.'],
      ['Comprovante de residência','Em nome dos pais ou do aluno; ou declaração reconhecida em cartório.'],
      ['Declaração de matrícula 2026','Emitida pela instituição de ensino para o ano letivo de 2026.'],
      ['Comprovante de pagamento','Taxa informada: R$ 19,50 (3 tarifas integrais). Confirme os dados oficiais antes de pagar.']
    ]
  },
  vem: {
    label: 'VEM ESCOLAR', title: 'Checklist do VEM Escolar', description: 'Confira cada item antes de enviar seu processo.', fee: 'R$ 13,00',
    items: [
      ['Formulário 2026 assinado','Assinatura do aluno ou do responsável legal.'],
      ['Cartão VEM Escolar atual','Quem já possui o cartão pode continuar usando o mesmo. Em caso de perda, confirme as regras da segunda via.'],
      ['RG ou certidão de nascimento','Se anexar RG, envie frente e verso.'],
      ['Comprovante de residência','Em nome dos pais ou do aluno; ou declaração reconhecida em cartório.'],
      ['Declaração de matrícula 2026','Emitida pela instituição de ensino para o ano letivo de 2026.'],
      ['Comprovante de pagamento','Taxa informada: R$ 13,00 (2 tarifas integrais). Confirme os dados oficiais antes de pagar.']
    ]
  }
};
let currentDoc = 'educard';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
function renderChecklist(type) {
  currentDoc = type;
  const d = docs[type];
  $('#docPill').textContent = d.label;
  $('#docTitle').textContent = d.title;
  $('#docDescription').textContent = d.description;
  $('#checklist').innerHTML = d.items.map((item, i) => `<label class="check-item"><input type="checkbox" data-check="${i}"><span><strong>${item[0]}</strong><small>${item[1]}</small></span></label>`).join('');
  $$('.doc-tab').forEach(tab => {
    const active = tab.dataset.docTab === type;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });
  $$('#checklist input').forEach(input => input.addEventListener('change', updateProgress));
  updateProgress();
}
function updateProgress() {
  const total = docs[currentDoc].items.length;
  const count = $$('#checklist input:checked').length;
  $('#checkedCount').textContent = `${count}/${total}`;
  $('#progressFill').style.width = `${count / total * 100}%`;
  $$('.check-item').forEach(item => item.classList.toggle('checked', item.querySelector('input').checked));
}
$$('.doc-tab').forEach(tab => tab.addEventListener('click', () => renderChecklist(tab.dataset.docTab)));
$$('[data-select]').forEach(link => link.addEventListener('click', () => renderChecklist(link.dataset.select)));
$('#resetChecklist').addEventListener('click', () => {
  $$('#checklist input').forEach(input => input.checked = false);
  updateProgress();
  showToast('Marcações do checklist limpas.');
});
$('#copyPix').addEventListener('click', async () => {
  const key = $('#pixKey').textContent.trim();
  try {
    await navigator.clipboard.writeText(key);
    showToast('Chave Pix copiada. Confirme os dados antes de pagar.');
  } catch {
    const field = document.createElement('textarea');
    field.value = key; field.setAttribute('readonly', ''); field.style.position = 'fixed'; field.style.opacity = '0';
    document.body.appendChild(field); field.select();
    const copied = document.execCommand('copy'); field.remove();
    showToast(copied ? 'Chave Pix copiada. Confirme os dados antes de pagar.' : `Chave Pix: ${key}`);
  }
});
let toastTimer;
function showToast(message) {
  const toast = $('#toast'); toast.textContent = message; toast.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}
$('#menuToggle').addEventListener('click', () => {
  const nav = $('#mainNav'); const open = nav.classList.toggle('open');
  $('#menuToggle').setAttribute('aria-expanded', String(open));
  $('#menuToggle').textContent = open ? '×' : '☰';
});
$$('#mainNav a').forEach(link => link.addEventListener('click', () => {
  $('#mainNav').classList.remove('open'); $('#menuToggle').setAttribute('aria-expanded', 'false'); $('#menuToggle').textContent = '☰';
}));
const sections = $$('main section[id]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) $$('.nav-link').forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  }), {rootMargin: '-25% 0px -65% 0px'});
  sections.forEach(section => observer.observe(section));
}
renderChecklist('educard');
