import * as Dialog from "@radix-ui/react-dialog";

import {ArrowCircleDown, ArrowCircleUp, X} from "phosphor-react";

import {CloseButton, Content, Overlay, TransactionType, TransactionTypeButton} from "./styles";
import {Transactions} from "../../pages/Transactions";

export function NewTransactionModal() {
    return (
        <Dialog.Portal>
            <Overlay/>
            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>

                <CloseButton>
                    <X size={24}/>
                </CloseButton>

                <form>
                    <input type="text" placeholder='Descrição' required/>
                    <input type="number" placeholder='Preço' required/>
                    <input type="text" placeholder='Categoria' required/>

                    <TransactionType>

                        <TransactionTypeButton value="income" variant='income'>
                            <ArrowCircleUp size={24}/>
                            <span>Entrada</span>
                        </TransactionTypeButton>

                        <TransactionTypeButton value="outcome" variant='outcome'>
                            <ArrowCircleDown size={24}/>
                            <span>Saída</span>
                        </TransactionTypeButton>

                    </TransactionType>

                    <button type="submit">Cadastrar</button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}