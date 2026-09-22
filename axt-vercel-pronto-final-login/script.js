const loginScreen = document.getElementById('loginScreen');
const enterApp = document.getElementById('enterApp');
const btnLogout = document.getElementById('btnLogout');

function openApp(){
  loginScreen?.classList.add('hide');
  document.body.classList.remove('login-active');
  showToast('✅ Bem-vindo ao protótipo AXT Intelligence.');
}

function logoutApp(){
  goToPage('dashboard');
  loginScreen?.classList.remove('hide');
  document.body.classList.add('login-active');
  showToast('✅ Sessão encerrada.');
}

enterApp?.addEventListener('click', openApp);
btnLogout?.addEventListener('click', logoutApp);

const pages = document.querySelectorAll('.page');
const buttons = document.querySelectorAll('[data-page]');
const menuItems = document.querySelectorAll('.menu-item[data-page]');

function goToPage(pageId){
  pages.forEach(page => page.classList.remove('active'));
  document.getElementById(pageId)?.classList.add('active');
  menuItems.forEach(btn => btn.classList.toggle('active', btn.dataset.page === pageId));
  window.scrollTo({top:0, behavior:'smooth'});
}

buttons.forEach(button => {
  button.addEventListener('click', () => goToPage(button.dataset.page));
});

const riskData = [
  ['AP','Ana Paula Silva','ana.silva@email.com','92%','↑ Crítico','23/04/2026<br><small>2 dias atrás</small>','R$ 2.400','R$ 480','☎ Contato imediato'],
  ['CE','Carlos Eduardo','carlos.edu@email.com','85%','↑ Alto','20/04/2026<br><small>5 dias atrás</small>','R$ 1.800','R$ 390','🎁 Oferta personalizada'],
  ['JM','Juliana Martins','juliana.martins@email.com','72%','→ Atenção','18/04/2026<br><small>7 dias atrás</small>','R$ 1.600','R$ 320','✉ Campanha automática'],
  ['RA','Rafael Almeida','rafael.almeida@email.com','65%','↓ Em queda','15/04/2026<br><small>10 dias atrás</small>','R$ 2.100','R$ 410','🏷 Benefício exclusivo'],
  ['BL','Beatriz Lima','beatriz.lima@email.com','61%','↓ Estável','10/04/2026<br><small>15 dias atrás</small>','R$ 1.300','R$ 250','🏷 Desconto especial'],
  ['FP','Fernando Pereira','fernando.pereira@email.com','45%','→ Estável','05/04/2026<br><small>20 dias atrás</small>','R$ 1.100','R$ 180','✉ Email de engajamento'],
  ['LS','Larissa Santos','larissa.santos@email.com','38%','↓ Melhorando','02/04/2026<br><small>23 dias atrás</small>','R$ 900','R$ 120','💬 Pesquisa de satisfação']
];

const actions = [
  ['Ana Paula Silva','Contato telefônico','Julia Carvalho','Em andamento','-','30/04/2026','R$ 480'],
  ['Carlos Eduardo','Oferta personalizada','Julia Carvalho','Em andamento','-','29/04/2026','R$ 390'],
  ['Juliana Martins','Campanha automática','Lucas Ferreira','Concluída','Recuperado','21/04/2026','R$ 320'],
  ['Rafael Almeida','Benefício exclusivo','Lucas Ferreira','Em andamento','-','24/04/2026','R$ 410'],
  ['Beatriz Lima','Desconto especial','Maria Oliveira','Concluída','Recuperado','21/04/2026','R$ 250'],
  ['Fernando Pereira','Email de engajamento','Maria Oliveira','Enviada','Aguardando','24/04/2026','R$ 180'],
  ['Larissa Santos','Pesquisa de satisfação','Lucas Ferreira','Concluída','Recuperado','23/04/2026','R$ 120']
];

function renderRiskTable(filter = ''){
  const tbody = document.getElementById('risk-table');
  if(!tbody) return;
  const q = filter.toLowerCase();
  const rows = riskData.filter(row => row.join(' ').toLowerCase().includes(q));
  tbody.innerHTML = rows.map(row => `
    <tr>
      <td><b>${row[1]}</b><br><small>${row[2]}</small></td>
      <td><mark class="red">${row[3]}</mark></td>
      <td>${row[4]}</td>
      <td>${row[5]}</td>
      <td><b>${row[6]}</b></td>
      <td style="color:#ef233c;font-weight:800">${row[7]}</td>
      <td><button class="outline row-action">${row[8]}</button></td>
    </tr>
  `).join('') || `<tr><td colspan="7">Nenhum cliente encontrado.</td></tr>`;
  bindDemoActions();
}

function renderActionsTable(filter = ''){
  const tbody = document.getElementById('actions-table');
  if(!tbody) return;
  const q = filter.toLowerCase();
  const rows = actions.filter(row => row.join(' ').toLowerCase().includes(q));
  tbody.innerHTML = rows.map(row => {
    const cls = row[3] === 'Concluída' ? 'green' : row[3] === 'Enviada' ? 'orange' : 'blue';
    const color = row[4] === 'Recuperado' ? '#16a34a' : row[4] === 'Aguardando' ? '#fb8500' : '#111';
    return `<tr><td><b>${row[0]}</b></td><td>${row[1]}</td><td>${row[2]}</td><td><span class="status ${cls}">${row[3]}</span></td><td style="font-weight:800;color:${color}">${row[4]}</td><td>${row[5]}</td><td><b>${row[6]}</b></td><td><button class="plain-btn row-action">⋮</button></td></tr>`;
  }).join('') || `<tr><td colspan="8">Nenhuma ação encontrada.</td></tr>`;
  bindDemoActions();
}

renderRiskTable();
renderActionsTable();

document.getElementById('riskSearch')?.addEventListener('input', e => renderRiskTable(e.target.value));
document.getElementById('actionSearch')?.addEventListener('input', e => renderActionsTable(e.target.value));

document.querySelectorAll('.clear-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    const inputs = btn.closest('.filters').querySelectorAll('input');
    inputs.forEach(input => input.value = '');
    renderRiskTable();
    renderActionsTable();
    showToast('↻ Filtros limpos.');
  });
});

const toast = document.getElementById('toast');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');

function showToast(message){
  if(!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

function openModal(title, text){
  if(!modal) return;
  modalTitle.textContent = title;
  modalText.textContent = text;
  modal.classList.add('show');
}

function closeModal(){
  modal?.classList.remove('show');
}

document.getElementById('modalClose')?.addEventListener('click', closeModal);
document.getElementById('modalOk')?.addEventListener('click', closeModal);
modal?.addEventListener('click', e => { if(e.target === modal) closeModal(); });

function bindDemoActions(){
  document.querySelectorAll('.row-action').forEach(btn => {
    btn.onclick = () => showToast('✅ Ação registrada no protótipo.');
  });
}

bindDemoActions();

document.querySelectorAll('.primary').forEach(btn => {
  if(btn.id === 'enterApp') return;
  btn.addEventListener('click', () => {
    openModal('Plano de retenção iniciado', '87 clientes foram enviados para acompanhamento. A IA priorizou os casos com maior receita em risco.');
  });
});

document.querySelectorAll('.action-demo').forEach(btn => {
  btn.addEventListener('click', () => {
    showToast('✅ Arquivo gerado com sucesso no protótipo.');
  });
});

document.querySelectorAll('.outline').forEach(btn => {
  if(!btn.classList.contains('action-demo') && !btn.classList.contains('row-action')){
    btn.addEventListener('click', () => showToast('✅ Contato registrado no protótipo.'));
  }
});
