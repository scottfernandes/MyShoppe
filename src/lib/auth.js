import { hash,compare } from "bcryptjs";

export async function hashPass(password){
    const hp = await hash(password,10)
    return hp
}

export async function comparePass(passwordPlain,hashedPass){
    const isValid = await compare(passwordPlain,hashedPass)
    return isValid
}