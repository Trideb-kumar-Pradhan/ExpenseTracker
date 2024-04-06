import React, { useState, useEffect } from "react";
import AddBalance from "../AddBalance/AddBalance";
import AddExpences from "../AddExpences/AddExpences";
import Table from "../Table/Table";
import ExpencesPieChart from "../Chart/ExpencesPieChart";
import BarChartComponent from "../Chart/BarChartExpences";
import Styles from "./MainPage.module.css";
import { SnackbarProvider } from "notistack";
import { Bar } from "recharts";

const MainPage = () => {
  const initializeBalAmount = () => {
    const storedAmount = localStorage.getItem("balAmount");
    return storedAmount ? parseInt(storedAmount) : 5000;
  };
  const [balAmount, setBalAmount] = useState(initializeBalAmount);

  const [totalExpenses, setTotalExpenses] = useState(() => {
    const storedTotalExpenses = localStorage.getItem("totalExpenses");
    return storedTotalExpenses ? parseFloat(storedTotalExpenses) : 0;
  });
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem("expenses");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });

  const [editExpense, setEditExpense] = useState(null);

  useEffect(() => {
    // Update localStorage whenever totalExpenses or expenses change
    localStorage.setItem("totalExpenses", totalExpenses);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [totalExpenses, expenses]);

  const handleExpenses = (newExpense) => {
    setExpenses([...expenses, newExpense]);
    setTotalExpenses(totalExpenses + newExpense.price);
  };

  const handleDeleteExpense = (updatedExpenses) => {
    try {
      // Calculate the total price of deleted expenses
      const deletedExpensesTotal = updatedExpenses.reduce(
        (total, expense) => total + expense.price,
        0
      );

      // Update the total expenses in local storage
      localStorage.setItem("totalExpenses", deletedExpensesTotal.toString());

      // Update the state with the updated expenses
      setExpenses(updatedExpenses);
      setTotalExpenses(deletedExpensesTotal); // Update totalExpenses state
    } catch (error) {
      console.error("Error updating total expenses:", error);
    }
  };

  const handleEditExpense = (expense) => {
    // Pass the selected expense data to the AddExpenses component for editing
    setEditExpense(expense);
  };

  const handleUpdateExpense = (updatedExpense) => {
    const updatedExpenses = expenses.map((expense) =>
      expense === editExpense ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
    setEditExpense(null);
    // setIsEditModalOpen(false);
    // Update total expenses if necessary
    const difference = updatedExpense.price - editExpense.price;
    setTotalExpenses(totalExpenses + difference);
  };

  const calculateCategorySpending = () => {
    const categorySpending = {};
    expenses.forEach((expense) => {
      const { category, price } = expense;
      if (categorySpending[category]) {
        categorySpending[category] += price;
      } else {
        categorySpending[category] = price;
      }
    });
    // Convert the object into an array of objects
    return Object.entries(categorySpending).map(([category, value]) => ({
      name: category,
      value: value,
    }));
  };

  return (
    <div>
      <h1 className={Styles.Heading}>Expense Tracker</h1>
      <div className={Styles.TopContainer}>
        <div className={Styles.Child}>
          <SnackbarProvider>
            <AddBalance balAmount={balAmount} setBalAmount={setBalAmount} />
          </SnackbarProvider>
        </div>
        <div className={Styles.Child}>
          <SnackbarProvider>
            <AddExpences
              balAmount={balAmount}
              setBalAmount={setBalAmount}
              onAddExpenses={handleExpenses}
              totalExpenses={totalExpenses}
              editExpense={editExpense}
              setEditExpense={setEditExpense}
              onUpdateExpense={handleUpdateExpense}
            />
          </SnackbarProvider>
        </div>
        <div className={Styles.Child}>
          <ExpencesPieChart categoriesData={expenses} />
        </div>
      </div>
      <div className={Styles.BottomContainer}>
        <div className={Styles.BottomChild1}>
          <SnackbarProvider>
            <Table
              expenses={expenses}
              onDeleteExpense={handleDeleteExpense}
              onEditExpense={handleEditExpense}
            />
          </SnackbarProvider>
        </div>
        <div className={Styles.BottomChild2}>
          <BarChartComponent data={calculateCategorySpending()} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
