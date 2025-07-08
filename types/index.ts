// types/index.ts

export type UserType = "empresa" | "candidato";

export interface CompanyProfile {
    id: string;
    nomeEmpresa: string;
    porte: string;
    nomeResponsavel: string;
    profissaoBuscada: string;
}

export interface CandidateProfile {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    habilidades: string[];
}

export type RootStackParamList = {
    Login: undefined;
    Register: { accountType: "empresa" | "candidato" };
    Home: undefined;
    Match: undefined;
    Chat: undefined;
    Perfil: undefined;
    ChatDetail: { nome: string };
    Config: undefined;
    PerfilDetalhado: { card: { nome: string; descricao: string; foto: string } };

};
