import { useEffect, useState } from "react";
import { Conference } from "../../types/Conference";
import api from "../../services/useApi";
import { useParams } from "react-router-dom";
import { Button, Container, FormControl, FormGroup, InputGroup } from "react-bootstrap";
import { useAuth } from "../../Auth/AuthContext";

const VisualizaCadastro = () => {
  const { id } = useParams<{ id: string }>();

  const [conference, setConference] = useState<Conference>({
    loja: 0,
    checagem: "",
    setor: "",
    data_ocorrencia_erro: "",
    data_correcao_erro: "",
    data_cadastro_erro: "",
    codigo_do_item: 0,
    motivo: "",
    quantidade: 0,
    valor: 0,
    obs1: "",
    obs2: "",
    obs_correcao: "",
    responsavel_pelo_erro: "",
    usuario_lancamento_erro: "",
  });

  const formatDate = (dateString: string) => {
    if (dateString === '1999-01-01') {
      return '';
    }
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  async function getConference() {
    try {
      const res = await api.get(`/conferences/${id}`);
      const data = res.data;
      setConference({
        ...data,
        data_correcao_erro: formatDate(data.data_correcao_erro),
        data_cadastro_erro: formatDate(data.data_cadastro_erro),
        data_ocorrencia_erro: formatDate(data.data_ocorrencia_erro),
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getConference();
  }, [id]);

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <h1 className="mb-4">Relatório Erro</h1>
      <InputGroup className="mb-3">
        <InputGroup.Text>Loja</InputGroup.Text>
        <FormControl type="text" name="loja" value={conference.loja} disabled />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Checagem</InputGroup.Text>
        <FormControl type="text" name="id_checagem" value={conference.checagem} disabled />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Setor</InputGroup.Text>
        <FormControl type="text" name="setor" value={conference.setor} disabled />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Data da Ocorrência</InputGroup.Text>
        <FormControl type="text" name="data_ocorrencia_erro" value={conference.data_ocorrencia_erro} disabled />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Data de Correção</InputGroup.Text>
        <FormControl type="text" name="data_correcao_erro" value={conference.data_correcao_erro} disabled />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Código do Item</InputGroup.Text>
        <FormControl type="text" name="codigo_do_item" value={conference.codigo_do_item} disabled />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Motivo</InputGroup.Text>
        <FormControl type="text" name="id_motivo" value={conference.motivo} disabled />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Quantidade</InputGroup.Text>
        <FormControl type="text" name="quantidade" value={conference.quantidade} disabled />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Valor</InputGroup.Text>
        <FormControl type="text" name="valor" value={conference.valor} disabled />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Observação 1</InputGroup.Text>
        <FormControl type="text" name="obs1" value={conference.obs1} disabled />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Observação 2</InputGroup.Text>
        <FormControl type="text" name="obs2" value={conference.obs2} disabled />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Observação da Correção</InputGroup.Text>
        <FormControl type="text" name="obs_correcao" value={conference.obs_correcao} disabled />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Responsável Pelo Erro</InputGroup.Text>
        <FormControl type="text" name="responsavel_pelo_erro" value={conference.responsavel_pelo_erro} disabled />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Usuário de Lançamento</InputGroup.Text>
        <FormControl type="text" name="responsavel_pelo_erro" value={conference.usuario_lancamento_erro} disabled />
      </InputGroup>
    </Container>
  );
}

export default VisualizaCadastro;
