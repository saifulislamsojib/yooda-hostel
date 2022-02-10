import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { FC } from "react";

interface IDistribution {
  _id?: string;
  studentId: string;
  foodItemList: string[];
  shift: string;
  date: Date;
  status: string;
}

interface IProps {
  rows: IDistribution[];
}

const FoodTable: FC<IProps> = ({ rows }) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "No", minWidth: 70 },
    { field: "_id", headerName: "ID", minWidth: 200 },
    { field: "studentId", headerName: "Student Id", minWidth: 200 },
    { field: "shift", headerName: "Shift", minWidth: 130 },
    { field: "status", headerName: "Status", minWidth: 130 },
  ];

  return (
    <div style={{ width: "100%", marginTop: 20, marginBottom: 20 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
        disableSelectionOnClick
        rowsPerPageOptions={[]}
        hideFooter
      />
    </div>
  );
};

export default FoodTable;
