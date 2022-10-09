export interface IUsuario {
    id?: number;
    nome: string;
    email: string
    telefone: string
    sexo: string

}

export const sexoList: string[] = ["Masculino", "Feminino"]