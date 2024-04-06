import React, { useState, useEffect } from "react";
import Styles from "./AddExpences.module.css";
import { useSnackbar } from "notistack";

const AddExpences = ({
  balAmount,
  setBalAmount,
  onAddExpenses,
  totalExpenses,
  editExpense,
}) => {
  const [showExpensesForm, setShowExpensesForm] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleAddExpensesClick = () => {
    setShowExpensesForm(true);
  };

  useEffect(() => {
    if (editExpense) {
      setTitle(editExpense.title);
      setPrice(editExpense.price);
      setDate(editExpense.date);
      setCategory(editExpense.category);
      setShowExpensesForm(true); // Show the form
    }
  }, [editExpense]);

  const handleAddExpenses = (e) => {
    e.preventDefault();
    const newExpense = {
      title: title,
      price: parseFloat(price),
      date: date,
      category: category,
    };
    onAddExpenses(newExpense);
    setBalAmount(balAmount - parseFloat(price)); // Update the balance
    setTitle("");
    setPrice("");
    setDate("");
    setCategory(null);
    setShowExpensesForm(false);
    enqueueSnackbar("Expense added successfully!", { variant: "success" });
    // console.log(expenses);
  };

  const handleCancelClick = () => {
    setShowExpensesForm(false);
  };
  return (
    <div className={Styles.MainContainer}>
      <div className={Styles.Container}>
        <p>
          Expense: <span>₹{totalExpenses}</span>
        </p>
        <button className={Styles.BtnExpense} onClick={handleAddExpensesClick}>
          + Add Expense
        </button>
      </div>
      {showExpensesForm ? (
        <div className={Styles.Backdrop}>
          <div className={Styles.FormContainer}>
            {/* <p>Add Expenses</p> */}
            <p>{editExpense ? "Edit Expense" : "Add Expenses"}</p>

            <form className={Styles.ExpenseForm} onSubmit={handleAddExpenses}>
              <input
                type="text"
                placeholder="Title"
                id="title"
                value={title}
                className={Styles.inputBox}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="number"
                placeholder="Price"
                id="price"
                value={price}
                className={Styles.inputBox}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="date"
                placeholder="dd-month-yyyy"
                id="date"
                value={date}
                className={Styles.inputBox}
                onChange={(e) => setDate(e.target.value)}
              />

              <select
                className={Styles.inputBox}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="shopping">Shopping</option>
                <option value="Bill">Bill</option>
                <option value="Entertenment">Entertenment</option>
                <option value="Fuel">Fuel</option>
              </select>
              <button type="submit" className={Styles.AddBtn}>
                Add Expenses
                {/* {!editExpense ? "Update Expense" : "Add Expense"} */}
              </button>
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

export default AddExpences;
