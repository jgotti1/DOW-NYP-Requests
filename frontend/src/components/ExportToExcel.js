import React from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const ExportToExcel = ({ data }) => {
  const handleExportToExcel = () => {
    if (!data || data.length === 0) {
      alert("No data to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);

    // Auto size columns
    const columnWidths = data.reduce((acc, row) => {
      Object.keys(row).forEach((col) => {
        const cellLength = String(row[col]).length;
        acc[col] = Math.max(acc[col] || 0, cellLength);
      });
      return acc;
    }, {});
    Object.keys(columnWidths).forEach((col) => {
      worksheet["!cols"] = worksheet["!cols"] || [];
      worksheet["!cols"].push({ wch: columnWidths[col] });
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "NYP-Requests");

    const formattedDate = formatDate(new Date());
    const filename = `NYPrequests-${formattedDate}.xlsx`;

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const excelBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(excelBlob, filename);
  };

  function formatDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  return (
    <button className="exportButton" onClick={handleExportToExcel}>
      Export <span style={{ fontSize: "18px", color: "red",  fontWeight: "bolder" }}>&#8593;</span> Excel
    </button>
  );
};

export default ExportToExcel;
