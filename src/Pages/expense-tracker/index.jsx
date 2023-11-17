import { useState } from "react";
import { useAddtransaction } from "../../hooks/useAddTransaction"
import { useGetTransactions } from "../../hooks/useGetTransactions";
import "./Style.css"
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";

export const ExpenseTracker = () => {

    const [description , setDescription] = useState("");
    const [transactionAmount , settransactionAmount] = useState(0);
    const [transactionType , settransactionType] = useState("expense");
    const navigate = useNavigate();
    

    const { addTransaction } = useAddtransaction();
    const { transactions , transactionsTotal} = useGetTransactions();
    const {name , profilePhoto} = useGetUserInfo();

    const {balance , income , expenses } = transactionsTotal;

    const onSubmit = (e) => {
        e.preventDefault()
        addTransaction({description ,transactionAmount , transactionType,});

        setDescription("");
        settransactionAmount(0);
    }

    const signOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            navigate("/")
        } catch (error) {
            console.error(error);
        }
    }
    return (

        <div className="expense-tracker">
            <div>
            <div className="container">
                <h1>
                    {name}'s Expense Tracker
                </h1>
                <div className="balance">
                    <h2>Balance</h2>
                    {balance >= 0 ? <h3> Rs {balance}</h3> : <h3>- Rs {balance * -1}</h3>}
                </div>
                <div>
                    <div>
                        <h4 className="income">Income</h4>
                        <p>Rs {income}</p>
                    </div>
                    <div className="expenses">
                        <h4>Expenses</h4>
                        <p>Rs {expenses}</p>
                    </div>
                </div>
                <form className="add-transaction">
                    <input type="text" placeholder="Description" required onChange={(e) => setDescription(e.target.value)} value ={description}></input>
                    <input type="number" placeholder="Amount" required onChange={(e) => settransactionAmount(e.target.value)} value={transactionAmount}></input>
                    <input type="radio" id="expense" value='expense' checked = {transactionType==="expense"} onChange={(e) => settransactionType(e.target.value)}></input>
                    <label>Expense</label>
                    <input type="radio" id="income" value='income' 
                    checked = {transactionType === "income"} onChange={(e) => settransactionType(e.target.value)}></input>
                    <label>Income</label>
                    <button type="submit" onClick={onSubmit}>Add Transaction</button>
                </form>
            </div>
            </div>
            {profilePhoto && (
                <div className="profile">{""}
                <img className="profile-photo" src={profilePhoto}></img>
                <button onClick={signOut} className="sign-out-button ">Sign Out</button>
                </div>
            )}
            <div className="transactions">
                <h3>
                    Transactions
                </h3>
                <ul>
                    {transactions.map((transaction)=> {
                        const {description ,transactionAmount , transactionType} = transaction; 
                        return <li>
                            <h4>{transaction.description}</h4>

                            <p>
                                Rs{transactionAmount} - <label style = {{color : transactionType === 'expense' ? "red" : "green"}}>{transactionType}</label>
                            </p>
                        </li>
                    })}
                </ul>
            </div>
        </div>

    )
}