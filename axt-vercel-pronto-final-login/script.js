// Configuração com as suas credenciais reais do Supabase
const SUPABASE_URL = 'https://ijfpnfxyvevjaecmnjyb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_4ziBSslP0oB-BBxuYv8uDw_6MS8Fki7';

// Inicializar cliente Supabase com tratamento de erro
let supabaseClient;
try {
    if (typeof supabase !== 'undefined') {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
} catch (e) {
    console.error('Erro ao inicializar Supabase:', e);
}

// Função para buscar clientes em tempo real no banco
async function carregarClientesSupabase() {
    if (!supabaseClient) return;

    const { data: clientes, error } = await supabaseClient
        .from('clientes')
        .select('*')
        .order('score_churn', { ascending: false });

    if (error) {
        console.error('Erro ao buscar clientes:', error);
        return;
    }

    console.log('Clientes carregados com sucesso:', clientes);
    renderizarTabelaClientes(clientes);
}

// Renderiza a lista de clientes na tabela HTML
function renderizarTabelaClientes(clientes) {
    const tabela = document.querySelector('tbody') || document.getElementById('tabela-clientes');
    if (!tabela) return;

    tabela.innerHTML = '';

    clientes.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${cliente.nome}</strong><br><small>${cliente.email}</small></td>
            <td>${cliente.segmento || '-'}</td>
            <td>${cliente.cidade || '-'}</td>
            <td>R$ ${Number(cliente.mensalidade || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            <td><span class="badge badge-${cliente.nivel_risco || 'baixo'}">${cliente.score_churn || 0}%</span></td>
        `;
        tabela.appendChild(tr);
    });
}

// Executa ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarClientesSupabase();
});
