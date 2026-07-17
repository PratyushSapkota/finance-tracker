import { TransactionAdd } from '@/features/transactions/components/TransactionAdd'
import { TransactionTransfer } from '@/features/transactions/components/TransactionTransfer'
import React from 'react'

function RightPage() {
    return (
        <div className="border flex-1">
            <TransactionAdd />
            <TransactionTransfer />
        </div>
    )
}

export default RightPage
