import { Conference } from "../../types/Conference";
import api from "../../services/useApi";
import { useFormAction } from "react-router-dom";

const Cadastro: React.FC = () => {

    const handleCreateConference = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data: Conference = { 
            loja: parseInt(formData.get('loja') as string),
            id_checagem: parseInt(formData.get('id_checagem') as string),
            setor: formData.get('setor') as string,
            data_ocorrencia_erro: formData.get('data_ocorrencia_erro') as string,
            codigo_do_item: parseInt(formData.get('codigo_do_item') as string),
            id_motivo: parseInt(formData.get('id_motivo') as string),
            quantidade: parseInt(formData.get('quantidade') as string),
            valor: parseInt(formData.get('valor') as string),
            responsavel_pelo_erro: formData.get('responsavel_pelo_erro') as string,
        }
        try {
            console.log(data)
            await api.post('/conferences', data);
            window.alert('Conferência cadastrada com sucesso!');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>Cadastro</h1>
            <form onSubmit={handleCreateConference}>
                <input type="text" name="loja" placeholder="Loja" />
                <input type="text" name="id_checagem" placeholder="ID Checagem" />
                <input type="text" name="setor" placeholder="Setor" />
                <input type="text" name="data_ocorrencia_erro" placeholder="Data Ocorrência" />
                <input type="text" name="codigo_do_item" placeholder="Código do Item" />
                <input type="text" name="id_motivo" placeholder="ID Motivo" />
                <input type="text" name="quantidade" placeholder="Quantidade" />
                <input type="text" name="valor" placeholder="Valor" />
                <input type="text" name="responsavel_pelo_erro" placeholder="Responsável pelo Erro" />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default Cadastro;
