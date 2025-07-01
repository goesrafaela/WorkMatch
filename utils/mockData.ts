// utils/mockDatabase.ts

export const mockDB = {
    candidatos: [] as any[],
    empresas: [] as any[],
    likes: [] as { deId: string; paraId: string }[],
    matches: [] as { usuarios: [string, string] }[],
    userType: "", // "candidato" ou "empresa"
};

let idCounter = 0;

export const cadastrarUsuario = (dados: any, tipo: "empresa" | "candidato") => {
    const id = `id_${++idCounter}`;
    const novoUsuario = { id, ...dados };

    if (tipo === "empresa") {
        mockDB.empresas.push(novoUsuario);
    } else {
        mockDB.candidatos.push(novoUsuario);
    }

    return id;
};

export const buscarPerfisDisponiveis = async (tipoUsuario: "empresa" | "candidato", meuId: string) => {
    const lista = tipoUsuario === "empresa" ? mockDB.candidatos : mockDB.empresas;
    return lista.filter((p) => p.id !== meuId);
};

export const darLike = (deId: string, paraId: string) => {
    mockDB.likes.push({ deId, paraId });

    const likeInverso = mockDB.likes.find(like => like.deId === paraId && like.paraId === deId);
    const deuMatch = Boolean(likeInverso);

    if (deuMatch) {
        mockDB.matches.push({ usuarios: [deId, paraId] });
    }

    return deuMatch;
};
