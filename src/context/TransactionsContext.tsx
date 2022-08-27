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
}

interface ITransactionsProvider {
    children: ReactNode
}

export const TransactionsContext = createContext({} as ITransactionsContext)

export function TransactionsProvider({children}: ITransactionsProvider) {

    const [transactions, setTransactions] = useState<ITransactions[]>([])

    async function loadTransactions() {
        fetch("http://localhost:3333/transactions")
            .then(response => {
                response.json()
                    .then(data => {
                        setTransactions(data)
                    })
            })
    }

    useEffect(() => {
        loadTransactions()
    })

    return (
        <TransactionsContext.Provider value={{transactions}}>
            {children}
        </TransactionsContext.Provider>
    )
}