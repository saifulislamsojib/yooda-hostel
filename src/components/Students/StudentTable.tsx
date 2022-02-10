import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { Dispatch, FC } from "react";

interface IProps {
  rows: any[];
  handleOpen: () => void;
  setEditData: Dispatch<React.SetStateAction<any>>;
  setSelectedItems: Dispatch<React.SetStateAction<string[]>>;
  handleDelete: (id: string) => void;
}

const StudentTable: FC<IProps> = ({
  rows,
  handleOpen,
  setEditData,
  setSelectedItems,
  handleDelete,
}) => {
  const handleEditModal = (row: any) => {
    setEditData(row);
    handleOpen();
  };

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 150 },
    { field: "fullName", headerName: "Full Name", width: 180 },
    { field: "roll", headerName: "Roll", width: 100 },
    { field: "age", headerName: "Age", width: 100 },
    { field: "class", headerName: "Class", width: 100 },
    { field: "hall", headerName: "Hall", width: 130 },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            onClick={() => handleEditModal(params.row)}
          >
            Edit
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => handleDelete(params.row._id)}
            sx={{ ml: 2 }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ width: "100%", marginTop: 20, marginBottom: 10 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
        disableSelectionOnClick
        checkboxSelection
        rowsPerPageOptions={[]}
        hideFooter
        onSelectionModelChange={(ids) => {
          const data = rows
            .filter((row) => ids.includes(row.id))
            .map((row) => row._id);
          setSelectedItems(data);
        }}
      />
    </div>
  );
};

export default StudentTable;
