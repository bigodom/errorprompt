export type Conference = {
    id?: number;
    loja: number;
    checagem: string;
    setor: string;
    data_ocorrencia_erro: string;
    data_correcao_erro?: string;
    data_cadastro_erro?: string;
    codigo_do_item: number;
    motivo: string;
    quantidade: number;
    valor: number;
    obs1?: string;
    obs2?: string;
    obs_correcao?: string;
    responsavel_pelo_erro: string;
    usuario_lancamento_erro?: string;
}