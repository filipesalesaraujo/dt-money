import {useMemo} from 'react'

import {useContextSelector} from "use-context-selector";

import {TransactionsContext} from '../context/TransactionsContext'

export function useSummary() {
    const transactions = useContextSelector(TransactionsContext, (context) => {
        return context.transactions
    })

    return useMemo(() => {
        return transactions.reduce(
            (acc, transaction) => {
                if (transaction.type === 'income') {
                    acc.income += transaction.price
                    acc.total += transaction.price
                } else {
                    acc.outcome += transaction.price
                    acc.total -= transaction.price
                }
                return acc
            },
            {income: 0, outcome: 0, total: 0},
        )
    }, [transactions])
}
