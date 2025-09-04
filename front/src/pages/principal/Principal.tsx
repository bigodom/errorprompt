import { useEffect, useState } from "react";
import SortableTable from "../../components/SortedTable";
import { Conference } from "../../types/Conference";
import api from "../../services/useApi";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";
import Papa from 'papaparse';


const Principal: React.FC = () => {
    const { tipo } = useParams<{ tipo: string }>();
    const [conferences, setConferences] = useState<Conference[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        fetchProducts();
    }, [tipo]);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/conferences');
            let filteredData = res.data;

            console.log(tipo)

            if (user?.role === "DADOS") {
                filteredData = filteredData.filter((conference: Conference) => conference.setor === "DADOS");
            } else if (user?.role === "QUALIDADE") {
                filteredData = filteredData.filter((conference: Conference) => conference.setor === "QUALIDADE");
            }
            if (tipo == "corrigidos") {
                filteredData = filteredData.filter((conference: Conference) => conference.data_correcao_erro !== "1999-01-01");
            } else if (tipo == "erros") {
                filteredData = filteredData.filter((conference: Conference) => conference.data_correcao_erro === "1999-01-01");
            } else {
                window.alert('Tipo de erro inválido');
            }

            const formattedData = filteredData.map((conference: Conference) => ({
                ...conference,
                data_ocorrencia_erro: formatDate(conference.data_ocorrencia_erro),
                quantidade: (conference.quantidade.toFixed(2) as string).replace('.', ','),
                valor: 'R$' + (conference.valor.toFixed(2) as string).replace('.', ',')
            }));
                                                                                                                                                                                                                                       
            setConferences(formattedData);
        } catch (error) {
            console.error(error);
        }
    }

    const formatDate = (dateString: string) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    const columnsDisplayNames = {
        'id': 'ID',
        'loja': 'Loja',
        'checagem': 'Checagem',
        'setor': 'Setor',
        'data_ocorrencia_erro': 'Data Ocorrência',
        'data_correcao_erro': 'Data Correção',
        'data_cadastro_erro': 'Data Cadastro',
        'codigo_do_item': 'Código',
        'codigo_de_barras': 'EAN',
        'motivo': 'Motivo',
        'quantidade': 'Quantidade',
        'valor': 'Valor',
        'obs': 'Observação',
        'responsavel_pelo_erro': 'Responsável pelo Erro',
        'usuario_lancamento_erro': 'Usuário',
    };

    const columns = [
        'loja', 'checagem', 'motivo', 'data_ocorrencia_erro', 'setor', 'codigo_do_item', 'quantidade', 'valor', 'responsavel_pelo_erro'
    ]

    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/conferences/${id}`);
            fetchProducts();
        } catch (error) {
            console.error(error);
        }
    }

    const navigate = useNavigate();

    const handleUpdate = (id: number) => {
        navigate(`/atualizar/${id}`);
    }

    const handleVisualize = (id: number) => {
        navigate(`/visualiza/${id}`);
    }

    const handleExportErros = async () => {
        const csvdata = conferences.map((conference: Conference) => ({
            Loja: conference.loja,
            Checagem: conference.checagem,
            Setor: conference.setor,
            Data_de_Ocorrencia: conference.data_ocorrencia_erro,
            Data_de_Correcao: conference.data_correcao_erro === "1999-01-01" ? "NÃO CORRIGIDO" : conference.data_correcao_erro,
            codigo_do_item: conference.codigo_do_item,
            Motivo: conference.motivo,
            Quantidade: conference.quantidade,
            Valor: conference.valor,
            Obs1: conference.obs1,
            Obs2: conference.obs2,
            Obs_correcao: conference.obs_correcao,
            Responsavel_Pelo_Erro: conference.responsavel_pelo_erro,
            Usuário_Cadastro: conference.usuario_lancamento_erro
        }));

        const csv = Papa.unparse(csvdata, { delimiter: ";" });

        const csvBlob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });

        const csvURL = window.URL.createObjectURL(csvBlob);
        const tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'relatorio.csv');
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
    }

    return (
        <div>
            {tipo === "erros" ? (
                <h1 className="text-center">Erros</h1>
            ) :
                <h1 className="text-center">Erros Corrigidos</h1>
            }
            <SortableTable data={conferences} columns={columns} columnDisplayNames={columnsDisplayNames} onDelete={handleDelete} onUpdate={handleUpdate} onVisualize={handleVisualize} />
            <div className="mt-3 gap-3 d-flex justify-content-center">
                {tipo === "erros" ? (
                    <button className="btn btn-primary" onClick={handleExportErros}>Exportar Erros</button>
                ) :
                    <button className="btn btn-success" onClick={handleExportErros}>Exportar Correções</button>
                }
            </div>
        </div>
    );
}

export default Principal;