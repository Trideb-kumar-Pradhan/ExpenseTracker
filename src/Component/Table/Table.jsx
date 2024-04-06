import React, { useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { SiYourtraveldottv } from "react-icons/si";
import { FaPlaneDeparture } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import { IoFastFoodOutline } from "react-icons/io5";
import { CiReceipt } from "react-icons/ci";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSnackbar } from "notistack";

import Styles from "./Table.module.css";

const Table = ({ expenses, onDeleteExpense, onEditExpense }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const { enqueueSnackbar } = useSnackbar();

  const categoryIcons = {
    Travel: <FaPlaneDeparture />,
    Entertenment: <BiCameraMovie />,
    Food: <IoFastFoodOutline />,
    Bill: <CiReceipt />,
    Fuel: <BsFillFuelPumpFill />,
    shopping: <MdOutlineShoppingCart />,
  };

  const handleDeleteExpense = (index) => {
    const updateExpenses = expenses.filter((_, i) => i !== index);
    onDeleteExpense(updateExpenses);
    enqueueSnackbar("Expense Deleted successfully! ", { variant: "info" });

    localStorage.setItem("expenses", JSON.stringify(updateExpenses));
  };

  const handleEditExpense = (expense) => {
    onEditExpense(expense);
  };

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  }

  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderExpenses = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return expenses.slice(startIndex, endIndex).map((expense, index) => (
      <li key={startIndex + index}>
        <div className={Styles.Content}>
          <div className={Styles.FirstBox}>
            <div className={Styles.Round}>
              {" "}
              {categoryIcons[expense.category]}{" "}
            </div>
            <div>
              <div>{expense.title}</div>
              <div className={Styles.Date}>{formatDate(expense.date)}</div>
            </div>
          </div>
          <div className={Styles.LastBox}>
            <div className={Styles.Price}>₹{expense.price}</div>
            <div
              className={`${Styles.DeleteBtn} ${Styles.Btn}`}
              onClick={() => handleDeleteExpense(index)}
            >
              <TiDeleteOutline />
            </div>
            <div
              className={`${Styles.EditBtn} ${Styles.Btn}`}
              onClick={() => handleEditExpense}
            >
              <MdOutlineModeEditOutline />
            </div>
          </div>
        </div>

        <hr />
      </li>
    ));
  };

  return (
    <div>
      <h2 className={Styles.Heading}>Recent Transactions</h2>
      <ul className={Styles.MainContent}>{renderExpenses()}</ul>
      <div className={Styles.navigator}>
        <div
          className={`${Styles.leftBtn} ${Styles.Btn}`}
          onClick={handlePrevPage}
        >
          <FaArrowLeft />
        </div>
        <div className={`${Styles.NumBox} ${Styles.Btn}`}>{currentPage}</div>
        <div
          className={`${Styles.leftBtn} ${Styles.Btn}`}
          onClick={handleNextPage}
        >
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
};

export default Table;
