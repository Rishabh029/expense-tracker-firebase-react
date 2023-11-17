import { useEffect, useState } from "react"
import { query, collection, where, orderBy ,onSnapshot, doc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
export const useGetTransactions = () => {

    const [transactions, setTransactions] = useState([]);
    const [transactionsTotal, setTransactionsTotal] = useState({balance :0.00,income :0.00,expenses :0.00});
    

    const transactionCollectionRef = collection(db, "transactions");
    const { userId } = useGetUserInfo();

    const getTransactions = async => {
        let unsubscribe;
        try {
            const queryTransactions = query(transactionCollectionRef, where("userId", "==", userId), orderBy("createdAt"));

            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                let docs = [];
                let totalIncome = 0;
                let totalExpense = 0;

                snapshot.forEach((doc) => {

                    const data = doc.data();
                    const id = doc.id;

                    docs.push({...data, id});

                    if(data.transactionType === "expense"){
                        totalExpense += Number(data.transactionAmount)
                    }else{
                        totalIncome += Number(data.transactionAmount)

                    }

                });

                let balance = totalIncome - totalExpense;

                setTransactionsTotal( {
                    balance : balance,
                    expenses :totalExpense,
                    income :totalIncome,
                })
                setTransactions(docs);
            })

        } catch (error) {
            console.error(error);
        }

    };

    useEffect(() => {
        getTransactions()
    }, [])

    return { transactions , transactionsTotal}
}