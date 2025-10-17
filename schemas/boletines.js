import z from 'zod';

const boletinSchema = z.object({
    num: z.string(),
    categoria: z.string(),
    fecha: z.coerce.date()
})


export function validarBoletin(input) {
    return boletinSchema.safeParse(input)
}