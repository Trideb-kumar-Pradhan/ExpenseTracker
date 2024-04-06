import React, { useEffect, useState } from "react";
import Styles from "./AddBalance.module.css";
import { useSnackbar } from "notistack";

const AddBalance = ({ balAmount, setBalAmount }) => {
  const [inputAmount, setInputAmount] = useState("");
  const [showBalanceForm, setShowBalanceForm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    localStorage.setItem("balAmount", balAmount);
  }, [balAmount]);

  const handleAddBalance = (e) => {
    e.preventDefault();
    const amountToAdd = parseInt(inputAmount);

    if (!isNaN(amountToAdd) && amountToAdd >= 0) {
      setBalAmount((prevAmount) => prevAmount + amountToAdd);
      setInputAmount("");
      setShowBalanceForm(false);
      enqueueSnackbar("Balance added successfully!", { variant: "success" });
    } else {
      // alert("Please enter valid amount!");
      enqueueSnackbar("Please enter valid amount!", { variant: "error" });
    }
  };
  const handleAddIncomeClick = () => {
    setShowBalanceForm(true);
  };

  const handleCancelClick = () => {
    setShowBalanceForm(false);
  };

  return (
    <div className={Styles.MainContainer}>
      <div className={Styles.Container}>
        <p>
          Wallet Balance: <span>₹{balAmount}</span>
        </p>
        <button className={Styles.BtnIncome} onClick={handleAddIncomeClick}>
          + Add Income
        </button>
      </div>
      {showBalanceForm ? (
        <div className={Styles.Backdrop}>
          <div className={Styles.BalanceForm}>
            <p>Add Balance</p>
            <form onSubmit={handleAddBalance}>
              <input
                type="number"
                placeholder="Income Amount"
                id="amount"
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
              />
              <button className={Styles.AddBtn}>Add Balance</button>
              <button className={Styles.CancleBtn} onClick={handleCancelClick}>
                Cancle
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AddBalance;
