import { useEffect, useState } from "react";
import SortableTable from "../../components/SortedTable";
import { Conference } from "../../types/Conference";
import api from "../../services/useApi";


const Principal = () => {
    const [conferences, setConferences] = useState<Conference[]>([]);
    
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/conferences');
            setConferences(res.data);
        } catch (error) {
            console.error(error);
        }
    }
    
    const columnsDisplayNames = {
        'id': 'ID',
        'loja': 'Loja',
        'id_checagem': 'ID Checagem',
        'setor': 'Setor',
        'data_ocorrencia_erro': 'Data Ocorrência',
        'data_correcao_erro': 'Data Correção',
        'data_cadastro_erro': 'Data Cadastro',
        'codigo_do_item': 'Código',
        'codigo_de_barras': 'EAN',
        'id_motivo': 'ID Motivo',
        'quantidade': 'Quantidade',
        'valor': 'Valor',
        'obs': 'Observação',
        'responsavel_pelo_erro': 'Responsável pelo Erro',
        'usuario_lancamento_error': 'Usuário'
    };

    const columns = [
        'id', 'loja', 'id_checagem', 'setor', 'data_ocorrencia_erro', 'data_correcao_erro', 'data_cadastro_erro', 'codigo_do_item',
        'codigo_de_barras', 'id_motivo', 'quantidade', 'valor', 'obs', 'responsavel_pelo_erro', 'usuario_lancamento_error'
    ]

    return (
        <div>
            <h1>Principal</h1>
            <SortableTable data={conferences} columns={columns} columnDisplayNames={columnsDisplayNames} />
        </div>
    );
}

export default Principal;