import React, { useState } from 'react';
import { Conference } from "../../types/Conference";
import api from "../../services/useApi";
import { Form, Button, Container, Modal, Table } from 'react-bootstrap';

const Cadastro: React.FC = () => {
  const [showChecagemModal, setShowChecagemModal] = useState(false);
  const [showMotivoModal, setShowMotivoModal] = useState(false);
  const [showSetorModal, setShowSetorModal] = useState(false);
  const [setores] = useState<string[]>([
    "ACOUGUE", "ACOUGUE DESOSSA", "ALMOXARIFADO", "APONTAMENTO", "APRENDIZ", "CADASTRO", "COMPRAS", "CONTABILIDADE", "CREDIARIO", "DEPARTAMENTO FISCAL", "DEPARTAMENTO PESSOAL",
    "DEPOSITO", "FATURAMENTO", "FINANCEIRO", "FRENTE DE CAIXA", "FRIGORIFICO", "FRIOS", "GALPÃO", "GERENCIA", "GUARDA VOLUMES", "HORTIFRUTI", "INFORMATICA", "INFORMACAO", "LOTE", "LIMPEZA",
    "LIMPEZA EXTERNA", "MANUTENCAO", "MARKETING", "PADARIA", "PRÉ LOTE", "PREVENÇÃO", "PROCESSADOS", "QUALIDADE", "RECEBIMENTO", "RECICLAGEM", "REFEITORIO", "REPOSICAO", "RH", "SEGURANCA", "SUSHI", "TESOURARIA",
    "TRANSFERÊNCIA", "TRANSPORTE", "VENDAS", "NÃO IDENTIFICADO"
  ]);
  const [selectedSetor, setSelectedSetor] = useState<string>("");
  const [checagem, setChecagem] = useState<string | null>(null);
  const [motivo, setMotivo] = useState<string | null>(null);

  const checagemData = [
    { nome: "Lista de negativos" },
    { nome: "Lista de produtos sem giro" },
    { nome: "Lista de validade" },
    { nome: "Lista de transferência" },
    { nome: "Informação do Compras" },
    { nome: "Informação do Vendas" },
    { nome: "Fechamento de mês" },
    { nome: "Conferência do sistema" }
  ];
  const motivoData = [
    { nome: "Recebimento incorreto de Mercadoria" },
    { nome: "Recebimento invertido" },
    { nome: "Entrada de nota errada quantidade" },
    { nome: "Entrada de nota errada valor" },
    { nome: "Entrada de nota errada CFOP" },
    { nome: "Falta de baixa por troca" },
    { nome: "Falta de baixa por consumo" },
    { nome: "Falta de baixa por quebra" },
    { nome: "Falta de registro no caixa" },
    { nome: "Erro no ultimo inventario" },
    { nome: "Erro de transferência" },
    { nome: "Falta de receituário adequado" },
    { nome: "Transformação do produto" },
    { nome: "Mercadoria invertida" },
    { nome: "Coleta errada troca" },
    { nome: "Lançamento errado consumo" },
    { nome: "Lançamento errado quebra" },
    { nome: "Erro Faturamento" },
    { nome: "Produto vencido área de venda" },
    { nome: "Produto vencido estoque" },
    { nome: "Não Identificado" },
    { nome: "Mercadoria sem giro" },
    { nome: "Erro de Cadastro" }
  ];                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      

  const handleCreateConference = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const parseInputValue = (value: string) => {
      return parseFloat(value.replace(',', '.'));
    }

    const data: Conference = {
      loja: parseInt(formData.get('loja') as string),
      checagem: formData.get('checagem') as string,
      setor: selectedSetor.toUpperCase(),
      data_ocorrencia_erro: formData.get('data_ocorrencia_erro') as string,
      codigo_do_item: parseInt(formData.get('codigo_do_item') as string),
      motivo: formData.get('motivo') as string,
      quantidade: parseInputValue(formData.get('quantidade') as string),
      valor: parseInputValue(formData.get('valor') as string),
      responsavel_pelo_erro: (formData.get('responsavel_pelo_erro') as string).toUpperCase(),
    }

    try {
      console.log(data);
      await api.post('/conferences', data);
      window.alert('Conferência cadastrada com sucesso!');
    } catch (error) {
      console.error(error);
    }
  }

  const handleShowChecagemModal = () => setShowChecagemModal(true);
  const handleCloseChecagemModal = () => setShowChecagemModal(false);

  const handleShowMotivoModal = () => setShowMotivoModal(true);
  const handleCloseMotivoModal = () => setShowMotivoModal(false);

  const handleShowSetorModal = () => setShowSetorModal(true);
  const handleCloseSetorModal = () => setShowSetorModal(false);

  const handleSelectSetor = (setor: string) => {
    setSelectedSetor(setor);
    handleCloseSetorModal();
  };

  const handleSelectChecagem = (nome: string) => {
    setChecagem(nome);
    handleCloseChecagemModal();
  };

  const handleSelectMotivo = (nome: string) => {
    setMotivo(nome);
    handleCloseMotivoModal();
  };


  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <h1 className="mb-4">Cadastro</h1>
      <Form onSubmit={handleCreateConference} style={{ width: '100%', maxWidth: '600px' }}>
        <Form.Group controlId="formLoja" className="mb-3 form-floating">
          <Form.Control type="text" name="loja" placeholder="Loja" />
          <Form.Label>Loja</Form.Label>
        </Form.Group>
        <Form.Group controlId="formResponsavelPeloErro" className="mb-3 form-floating">
          <Form.Control type="text" name="responsavel_pelo_erro" placeholder="Responsável pelo Erro" />
          <Form.Label>Responsável pelo Erro</Form.Label>
        </Form.Group>
        <Form.Group controlId="formSetor" className="mb-3 form-floating">
          <Form.Control type="text" name="setor" placeholder="Setor" value={selectedSetor} readOnly />
          <Form.Label>Setor</Form.Label>
          <Button variant="secondary" onClick={handleShowSetorModal} style={{ position: 'absolute', right: '15px', top: '10px' }}>
            Buscar
          </Button>
        </Form.Group>
        <Form.Group controlId="formChecagem" className="mb-3 form-floating">
          <Form.Control type="text" name="checagem" placeholder="Checagem" value={checagem ?? ''} readOnly />
          <Form.Label>Checagem</Form.Label>
          <Button variant="secondary" onClick={handleShowChecagemModal} style={{ position: 'absolute', right: '15px', top: '10px' }}>
            Buscar
          </Button>
        </Form.Group>
        <Form.Group controlId="formMotivo" className="mb-3 form-floating">
          <Form.Control type="text" name="motivo" placeholder="Motivo" value={motivo ?? ''} readOnly />
          <Form.Label>Motivo</Form.Label>
          <Button variant="secondary" onClick={handleShowMotivoModal} style={{ position: 'absolute', right: '15px', top: '10px' }}>
            Buscar
          </Button>
        </Form.Group>
        <Form.Group controlId="formDataOcorrenciaErro" className="mb-3 form-floating">
          <Form.Control type="date" name="data_ocorrencia_erro" />
          <Form.Label>Data da Ocorrência</Form.Label>
        </Form.Group>
        <Form.Group controlId="formCodigoDoItem" className="mb-3 form-floating">
          <Form.Control type="text" name="codigo_do_item" placeholder="Código do Item" />
          <Form.Label>Código do Item</Form.Label>
        </Form.Group>
        <Form.Group controlId="formQuantidade" className="mb-3 form-floating">
          <Form.Control type="text" name="quantidade" placeholder="Quantidade" />
          <Form.Label>Quantidade</Form.Label>
        </Form.Group>
        <Form.Group controlId="formValor" className="mb-3 form-floating">
          <Form.Control type="text" name="valor" placeholder="Valor" />
          <Form.Label>Valor</Form.Label>
        </Form.Group>
        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
      </Form>

      {/* Modal for Checagem */}
      <Modal show={showChecagemModal} onHide={handleCloseChecagemModal}>
        <Modal.Header closeButton>
          <Modal.Title>Selecione uma Checagem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Checagem</th>
              </tr>
            </thead>
            <tbody>
              {checagemData.map((item) => (
                <tr key={item.nome} onClick={() => handleSelectChecagem(item.nome)} style={{ cursor: 'pointer' }}>
                  <td>{item.nome}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseChecagemModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Motivo */}
      <Modal show={showMotivoModal} onHide={handleCloseMotivoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Selecione um Motivo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Motivo</th>
              </tr>
            </thead>
            <tbody>
              {motivoData.map((item) => (
                <tr key={item.nome} onClick={() => handleSelectMotivo(item.nome)} style={{ cursor: 'pointer' }}>
                  <td>{item.nome}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMotivoModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal for Setor */}
      <Modal size='lg' show={showSetorModal} onHide={handleCloseSetorModal} >
        <Modal.Header closeButton>
          <Modal.Title>Selecione um Setor</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ cursor: "pointer" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Setor</th>
                <th>Setor</th>
                <th>Setor</th>
                <th>Setor</th>
              </tr>
            </thead>
            <tbody>
              {setores.reduce((rows: string[][], setor, index) => {
                if (index % 4 === 0) {
                  rows.push([setor]);
                } else {
                  rows[rows.length - 1].push(setor);
                }
                return rows;
              }, []).map((row, index) => (
                <tr key={index}>
                  {row.map((setor, cellIndex) => (
                    <td key={cellIndex} onClick={() => handleSelectSetor(setor)}>{setor}</td>
                  ))}
                  {/* Fill empty cells if necessary */}
                  {row.length < 4 && Array(4 - row.length).fill("").map((_, cellIndex) => (
                    <td key={cellIndex + row.length}></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSetorModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
}

export default Cadastro;
