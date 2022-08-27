import * as Dialog from "@radix-ui/react-dialog";

import {ArrowCircleDown, ArrowCircleUp, X} from "phosphor-react";

import {Controller, useForm} from "react-hook-form";
import * as z from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";

import {CloseButton, Content, Overlay, TransactionType, TransactionTypeButton} from "./styles";

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
})

type TNewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {

    const {control, register, handleSubmit, formState: {isSubmitting}} = useForm<TNewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {
            type: 'income'
        }
    })

    async function handleCreateNewTransaction(data: TNewTransactionFormInputs) {
        await new Promise((resolve => setTimeout(resolve, 2000)))
        console.log(data)
    }

    return (
        <Dialog.Portal>
            <Overlay/>
            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>

                <CloseButton>
                    <X size={24}/>
                </CloseButton>

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input type="text" placeholder='Descrição' required {...register('description')} />
                    <input type="number" placeholder='Preço' required {...register('price', {valueAsNumber: true})}/>
                    <input type="text" placeholder='Categoria' required {...register('category')}/>

                    <Controller control={control} name="type" render={({field}) => {
                        return (
                            <TransactionType onValueChange={field.onChange} value={field.value}>
                                <TransactionTypeButton value="income" variant='income'>
                                    <ArrowCircleUp size={24}/>
                                    <span>Entrada</span>
                                </TransactionTypeButton>

                                <TransactionTypeButton value="outcome" variant='outcome'>
                                    <ArrowCircleDown size={24}/>
                                    <span>Saída</span>
                                </TransactionTypeButton>
                            </TransactionType>
                        )
                    }}/>

                    <button type="submit" disabled={isSubmitting}>Cadastrar</button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}