import { useState } from "react"
import api from "../../services/useApi"
import { Button, Form, Modal, Table } from "react-bootstrap";

const Register = () => {
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [showSetorModal, setShowSetorModal] = useState(false);
    const [setores] = useState<string[]>([
        "ADMIN", "ACOUGUE", "ACOUGUE DESOSSA", "ALMOXARIFADO", "APONTAMENTO", "APRENDIZ", "COMPRAS", "CONTABILIDADE", "CREDIARIO", "DEPARTAMENTO FISCAL", "DEPARTAMENTO PESSOAL",
        "DEPOSITO", "FATURAMENTO", "FINANCEIRO", "FRENTE DE CAIXA", "FRIGORIFICO", "FRIOS", "GERENCIA", "GUARDA VOLUMES", "HORTIFRUTI", "INFORMATICA", "INFORMACAO", "LIMPEZA",
        "LIMPEZA EXTERNA", "MANUTENCAO", "MARKETING", "PADARIA", "PROCESSADOS", "QUALIDADE", "RECICLAGEM", "REFEITORIO", "REPOSICAO", "RH", "SEGURANCA", "SUSHI", "TESOURARIA",
        "TRANSPORTE", "VENDAS"
    ]);

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await api.post('/users', { email, password, role, name, login });
            window.alert('Usuário cadastrado com sucesso!');
        } catch (error) {
            console.log(error);
        }

        setEmail('');
        setName('');
        setLogin('');
        setPassword('');
        setRole('');
    }

    const handleShowSetorModal = () => setShowSetorModal(true);
    const handleCloseSetorModal = () => setShowSetorModal(false);

    const handleSelectSetor = (setor: string) => {
        setRole(setor);
        handleCloseSetorModal();
    };


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="card">
                    <div className="card-body">
                        <div className="col-12">
                            <h1 className="text-center">Registro de Usuário</h1>
                        </div>
                        <div className="col-12">
                            <form onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nome</label>
                                    <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="login" className="form-label">Usuário</label>
                                    <input type="text" className="form-control" id="login" name="login" value={login} onChange={(e) => setLogin(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Senha</label>
                                    <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="mb-5">
                                    <Form.Label htmlFor="formSetor">Setor</Form.Label>
                                    <div className="d-flex gap-3">
                                        <Form.Control type="text" name="setor" placeholder="Setor" value={role} readOnly />
                                        <Button variant="secondary" onClick={handleShowSetorModal} style={{ right: '15px', top: '10px' }}>
                                            Buscar
                                        </Button>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Registrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
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
        </div>

    )
}

export default Register;