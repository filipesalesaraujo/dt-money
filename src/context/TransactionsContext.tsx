import {createContext, ReactNode, useEffect, useState} from "react";

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
        const url = new URL('http://localhost:3333/transactions')

        if (query) {
            url.searchParams.append('q', query)
        }

        const response = await fetch(url)
        const data = await response.json()
        setTransactions(data)
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