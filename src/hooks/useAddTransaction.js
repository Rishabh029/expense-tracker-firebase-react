import {Transaction, addDoc , collection, serverTimestamp} from "firebase/firestore" ;
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
export const useAddtransaction = () => {
    const transactionCollectionRef = collection (db ,"transactions" ); 
    const {userId} = useGetUserInfo();
    const addTransaction = async ({description,transactionAmount,transactionType}) => {
        await addDoc( transactionCollectionRef , {
            userId ,
            description,transactionAmount,transactionType,
            createdAt: serverTimestamp(),
        } ) 
    }
    return {addTransaction};
} 