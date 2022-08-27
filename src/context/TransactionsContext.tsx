import {createContext, ReactNode, useEffect, useState} from "react";
import {api} from "../lib/axios";

interface ITransactions {
    id: string
    description: string
    type: 'income' | 'outcome'
    price: number
    category: string
    createdAt: string
}

interface ITransactionsContext {
    transactions: ITransactions[]
    fetchTransactions: (quert?: string) => Promise<void>;
}

interface ITransactionsProvider {
    children: ReactNode
}

export const TransactionsContext = createContext({} as ITransactionsContext)

export function TransactionsProvider({children}: ITransactionsProvider) {

    const [transactions, setTransactions] = useState<ITransactions[]>([])

    async function fetchTransactions(query?: string) {
        const response = await api.get('/transactions', {
            params: {
                q: query,
            }
        })
        setTransactions(response.data)
    }

    useEffect(() => {
        fetchTransactions()
    }, [])

    return (
        <TransactionsContext.Provider value={{transactions, fetchTransactions}}>
            {children}
        </TransactionsContext.Provider>
    )
}