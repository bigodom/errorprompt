import { Conference } from "../../types/Conference";
import api from "../../services/useApi";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
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
        <Container className="d-flex flex-column align-items-center mt-5">
          <h1 className="mb-4">Cadastro</h1>
          <Form onSubmit={handleCreateConference} style={{ width: '100%', maxWidth: '600px' }}>
            <Form.Group controlId="formLoja" className="mb-3">
              <Form.Control type="text" name="loja" placeholder="Loja" />
            </Form.Group>
            <Form.Group controlId="formIdChecagem" className="mb-3">
              <Form.Control type="text" name="id_checagem" placeholder="ID Checagem" />
            </Form.Group>
            <Form.Group controlId="formSetor" className="mb-3">
              <Form.Control type="text" name="setor" placeholder="Setor" />
            </Form.Group>
            <Form.Group controlId="formDataOcorrenciaErro" className="mb-3">
              <Form.Control type="text" name="data_ocorrencia_erro" placeholder="Data Ocorrência" />
            </Form.Group>
            <Form.Group controlId="formCodigoDoItem" className="mb-3">
              <Form.Control type="text" name="codigo_do_item" placeholder="Código do Item" />
            </Form.Group>
            <Form.Group controlId="formIdMotivo" className="mb-3">
              <Form.Control type="text" name="id_motivo" placeholder="ID Motivo" />
            </Form.Group>
            <Form.Group controlId="formQuantidade" className="mb-3">
              <Form.Control type="text" name="quantidade" placeholder="Quantidade" />
            </Form.Group>
            <Form.Group controlId="formValor" className="mb-3">
              <Form.Control type="text" name="valor" placeholder="Valor" />
            </Form.Group>
            <Form.Group controlId="formResponsavelPeloErro" className="mb-3">
              <Form.Control type="text" name="responsavel_pelo_erro" placeholder="Responsável pelo Erro" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Cadastrar
            </Button>
          </Form>
        </Container>
      );
}

export default Cadastro;
