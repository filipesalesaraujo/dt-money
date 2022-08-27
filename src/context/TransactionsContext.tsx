import { createContext, ReactNode, useEffect, useState } from 'react'

import { api } from '../lib/axios'

interface ITransactions {
  id: string
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface TCreateTransationInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface ITransactionsContext {
  transactions: ITransactions[]
  fetchTransactions: (quert?: string) => Promise<void>
  createTransaction: (data: TCreateTransationInput) => Promise<void>
}

interface ITransactionsProvider {
  children: ReactNode
}

export const TransactionsContext = createContext({} as ITransactionsContext)

export function TransactionsProvider({ children }: ITransactionsProvider) {
  const [transactions, setTransactions] = useState<ITransactions[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })
    setTransactions(response.data)
  }

  async function createTransaction(data: TCreateTransationInput) {
    const { description, price, category, type } = data

    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
