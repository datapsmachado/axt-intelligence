// Configuration do Supabase
const SUPABASE_URL = 'https://ijfpnfxyvevjaecmnjyb.supabase.co';
const SUPABASE_KEY = 'SUA_CHAVE_PUBLISHABLE_AQUI'; // Substitua pela sua chave sb_publishable...

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Função para carregar os clientes direto do banco de dados Supabase
async function carregarClientesSupabase() {
    const { data: clientes, error } = await supabaseClient
        .from('clientes')
        .select('*')
        .order('score_churn', { ascending: false });

    if (error) {
        console.error('Erro ao buscar clientes no Supabase:', error);
        return;
    }

    console.log('Clientes carregados do Supabase:', clientes);
    renderizarTabelaClientes(clientes);
}

// Função para renderizar os dados na tabela do HTML
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
            <td><span class="badge badge-${cliente.nivel_risco}">${cliente.score_churn}%</span></td>
            <td>
                <button class="btn-sm" onclick="editarCliente('${cliente.id}', '${cliente.nome}')">✏️ Editar</button>
            </td>
        `;
        tabela.appendChild(tr);
    });
}

// Função para exportar os dados dos clientes em CSV (Relatório)
function baixarRelatorioCSV(clientes) {
    let csv = 'Nome,Email,Telefone,Cidade,Segmento,Mensalidade,LTV,Score Churn,Risco\n';
    clientes.forEach(c => {
        csv += `"${c.nome}","${c.email}","${c.telefone || ''}","${c.cidade || ''}","${c.segmento || ''}",${c.mensalidade || 0},${c.ltv || 0},${c.score_churn || 0},"${c.nivel_risco || ''}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_clientes_axt_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarClientesSupabase();
});
