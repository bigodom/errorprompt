import { useEffect, useState } from "react";
import { Conference } from "../../types/Conference";
import api from "../../services/useApi";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, FormControl, FormGroup, InputGroup } from "react-bootstrap";
import { useAuth } from "../../Auth/AuthContext";

const AtualizaCadastro = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

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

  async function getConference() {
    try {
      const res = await api.get(`/conferences/${id}`);
      const data = res.data;
      setConference({
        ...data,
        data_correcao_erro: formatDate(data.data_correcao_erro),
      });
    } catch (error) {
      console.log(error);
    }
  }

  const formatDate = (dateString: string) => {
    if (dateString === '1999-01-01') {
      //retorna a data atual
      return ;
    }
    const [year, month, day] = dateString.split('-');
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    getConference();
    console.log(conference)
  }, [id]);

  const handleUpdateConference = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = localStorage.getItem('name');

    const parseInputValue = (value: string) => {
      return parseFloat(value.replace(',', '.'));
    }

    const updatedConference = {
      ...conference,
      data_correcao_erro: conference.data_correcao_erro || '1999-01-01',
      usuario_lancamento_erro: user,
      quantidade: parseInputValue(conference.quantidade.toString()),
      valor: parseInputValue(conference.valor.toString()),
      obs1: conference.obs1?.toUpperCase(),
      obs2: conference.obs2?.toUpperCase(),
      obs_correcao: conference.obs_correcao?.toUpperCase()
    };

    console.log(updatedConference)
    try {
      await api.put(`/conferences/${id}`, updatedConference);
      window.alert('Conferência atualizada com sucesso!');
      navigate('/erros');
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setConference({ ...conference, [name]: value });
  }

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <h1 className="mb-4">Atualizar Conferência</h1>
      <form onSubmit={handleUpdateConference} style={{ width: '100%', maxWidth: '600px' }}>
        <InputGroup className="mb-3">
          <InputGroup.Text>Loja</InputGroup.Text>
          <FormControl type="text" name="loja" placeholder="Loja" value={conference.loja} onChange={handleChange} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Checagem</InputGroup.Text>
          <FormControl type="text" name="id_checagem" placeholder="ID Checagem" value={conference.checagem} onChange={handleChange} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Setor</InputGroup.Text>
          <FormControl type="text" name="setor" placeholder="Setor" value={conference.setor} onChange={handleChange} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Data da Ocorrência</InputGroup.Text>
          <FormControl type="date" name="data_ocorrencia_erro" placeholder="Data Ocorrência" value={conference.data_ocorrencia_erro} onChange={handleChange} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Data de Correção</InputGroup.Text>
          <FormControl type="date" name="data_correcao_erro" placeholder="Data Correção" value={conference.data_correcao_erro} onChange={handleChange} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Código do Item</InputGroup.Text>
          <FormControl type="text" name="codigo_do_item" placeholder="Código do Item" value={conference.codigo_do_item} onChange={handleChange} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Motivo</InputGroup.Text>
          <FormControl type="text" name="id_motivo" placeholder="ID Motivo" value={conference.motivo} onChange={handleChange} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Quantidade</InputGroup.Text>
          <FormControl type="text" name="quantidade" placeholder="Quantidade" value={conference.quantidade} onChange={handleChange} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Valor</InputGroup.Text>
          <FormControl type="text" name="valor" placeholder="Valor" value={conference.valor} onChange={handleChange} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Observação</InputGroup.Text>
          <FormControl type="text" name="obs1" placeholder="Observação 1" value={conference.obs1} onChange={handleChange} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Observação</InputGroup.Text>
          <FormControl type="text" name="obs2" placeholder="Observação 2" value={conference.obs2} onChange={handleChange} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Observação</InputGroup.Text>
          <FormControl type="text" name="obs_correcao" placeholder="Observação Correção" value={conference.obs_correcao} onChange={handleChange} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Responsável Pelo Erro</InputGroup.Text>
          <FormControl type="text" name="responsavel_pelo_erro" placeholder="Responsável pelo Erro" value={conference.responsavel_pelo_erro} onChange={handleChange} />
        </InputGroup>
        <Button variant="primary" type="submit">
          Atualizar
        </Button>
      </form>
    </Container>
  );
}

export default AtualizaCadastro;