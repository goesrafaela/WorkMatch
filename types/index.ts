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
  nome?: string;
  sobrenome?: string;
  nascimento?: string;
  imagem?: string | null;
  localizacao?: string;
  areas?: string;
  experiencia?: string;
  bio?: string;
  genero?: string
}

export type RootStackParamList = {
  index: undefined;
  login: undefined;
  register: undefined;
  SearchScreen: undefined;
  registerCompany: undefined;
  CandidateStep1: undefined;
  CandidateStep2: { candidateData: CandidateProfile };
  CandidateStep3: { candidateData: CandidateProfile };
  CandidateStep4: { candidateData: CandidateProfile };
  CandidateStep5: { candidateData: CandidateProfile };
  CandidateStep6: { candidateData: CandidateProfile };
  home: undefined;
  chat: undefined;
  match: undefined;
  PerfilScreen: undefined;
  PerfilDetalhado: { userId: string };
  StartScreen: undefined;
  ChatDetail: { chatId: string };
  Config: undefined;
  CriarVaga: undefined;
  VisualizarInteressados: { vagaId: string };
};


