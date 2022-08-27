import {MagnifyingGlass} from "phosphor-react";

import {useForm} from "react-hook-form";
import * as z from 'zod'
import {zodResolver} from "@hookform/resolvers/zod";

import {SearchFormContainer} from "./styles";

const searchFormSchema = z.object({
    query: z.string()
})

type TSearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {

    const {register, handleSubmit, formState: {isSubmitting}} = useForm<TSearchFormInputs>({
        resolver: zodResolver(searchFormSchema)
    })

    async function handleSearchTransactions(data: TSearchFormInputs) {
        await new Promise((resolve => setTimeout(resolve, 2000)))

        console.log(data)
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input type='text' placeholder="Busque por transações" {...register('query')}/>
            <button type='submit' disabled={isSubmitting}>
                <MagnifyingGlass size={20}/>
                <span>Buscar</span>
            </button>
        </SearchFormContainer>
    )
}