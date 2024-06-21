import { useEffect, useState } from "react";
import { Conference } from "../../types/Conference";
import api from "../../services/useApi";
import { useParams } from "react-router-dom";
import { Button, Container, FormControl, FormGroup } from "react-bootstrap";
import { useAuth } from "../../Auth/AuthContext";

const AtualizaCadastro = () => {
    const { id } = useParams<{ id: string }>();

    const [conference, setConference] = useState<Conference>({
        loja: 0,
        id_checagem: 0,
        setor: "",
        data_ocorrencia_erro: "",
        data_correcao_erro: "",
        data_cadastro_erro: "",
        codigo_do_item: 0,
        codigo_de_barras: "",
        id_motivo: 0,
        quantidade: 0,
        valor: 0,
        obs: "",
        responsavel_pelo_erro: "",
        usuario_lancamento_error: "",
    });

    async function getConference() {
        try {
            const response = await api.get(`/conferences/${id}`);
            setConference(response.data);
            //set usuario_lancamento_error as localsotrage.getItem('login')
            const user = localStorage.getItem('login');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getConference();
        console.log(conference)
    }, [id]);

    const handleUpdateConference = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setConference({ ...conference, usuario_lancamento_error: localStorage.getItem('login') || ''});
        console.log(conference);
        try {
            await api.put(`/conferences/${id}`, conference);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setConference({ ...conference, [name]: value });
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setConference({ ...conference, [name]: new Date(value) });
    }

    return (
        <Container className="d-flex flex-column align-items-center mt-5">
      <h1 className="mb-4">Atualizar Conferência</h1>
      <form onSubmit={handleUpdateConference} style={{ width: '100%', maxWidth: '600px' }}>
        <FormGroup controlId="formLoja" className="mb-3">
          <FormControl type="text" name="loja" placeholder="Loja" value={conference.loja} onChange={handleChange} />
        </FormGroup>
        <FormGroup controlId="formIdChecagem" className="mb-3">
          <FormControl type="text" name="id_checagem" placeholder="ID Checagem" value={conference.id_checagem} onChange={handleChange} />
        </FormGroup>
        <FormGroup controlId="formSetor" className="mb-3">
          <FormControl type="text" name="setor" placeholder="Setor" value={conference.setor} onChange={handleChange} />
        </FormGroup>
        <FormGroup controlId="formDataOcorrenciaErro" className="mb-3">
          <FormControl type="text" name="data_ocorrencia_erro" placeholder="Data Ocorrência" value={conference.data_ocorrencia_erro} onChange={handleChange} />
        </FormGroup>
        <FormGroup controlId="formDataCorrecaoErro" className="mb-3">
          <FormControl type="text" name="data_correcao_erro" placeholder="Data Correção" value={conference.data_correcao_erro} onChange={handleChange} />
        </FormGroup>
        <FormGroup controlId="formCodigoDoItem" className="mb-3">
          <FormControl type="text" name="codigo_do_item" placeholder="Código do Item" value={conference.codigo_do_item} onChange={handleChange} />
        </FormGroup>
        <FormGroup controlId="formCodigoDoItem" className="mb-3">
          <FormControl type="text" name="codigo_de_barras" placeholder="Código de Barras" value={conference.codigo_de_barras} onChange={handleChange} />
        </FormGroup>
        <FormGroup controlId="formIdMotivo" className="mb-3">
          <FormControl type="text" name="id_motivo" placeholder="ID Motivo" value={conference.id_motivo} onChange={handleChange} />
        </FormGroup>
        <FormGroup controlId="formQuantidade" className="mb-3">
          <FormControl type="text" name="quantidade" placeholder="Quantidade" value={conference.quantidade} onChange={handleChange} />
        </FormGroup>
        <FormGroup controlId="formValor" className="mb-3">
          <FormControl type="text" name="valor" placeholder="Valor" value={conference.valor} onChange={handleChange} />
        </FormGroup>
        <FormGroup controlId="formObs" className="mb-3">
          <FormControl type="text" name="obs" placeholder="Observação" value={conference.obs} onChange={handleChange} />
        </FormGroup>
        <FormGroup controlId="formResponsavelPeloErro" className="mb-3">
          <FormControl type="text" name="responsavel_pelo_erro" placeholder="Responsável pelo Erro" value={conference.responsavel_pelo_erro} onChange={handleChange} />
        </FormGroup>
        <Button variant="primary" type="submit">
          Atualizar
        </Button>
      </form>
    </Container>
    );
}

export default AtualizaCadastro;