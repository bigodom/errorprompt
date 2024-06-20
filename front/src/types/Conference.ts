export type Conference = {
    id?: number;
    loja: number;
    id_checagem: number;
    setor: string;
    data_ocorrencia_erro: string;
    data_correcao_erro?: string;
    data_cadastro_erro?: string;
    codigo_do_item: number;
    codigo_de_barras?: string;
    id_motivo: number;
    quantidade: number;
    valor: number;
    obs?: string;
    responsavel_pelo_erro: string;
    usuario_lancamento_error?: string;
}