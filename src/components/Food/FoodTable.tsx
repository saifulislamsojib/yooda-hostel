import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { Dispatch, FC } from "react";

interface IProps {
  rows: any[];
  handleOpen: () => void;
  setEditData: Dispatch<React.SetStateAction<any>>;
  handleDelete: (id: string) => void;
}

const FoodTable: FC<IProps> = ({
  rows,
  handleOpen,
  setEditData,
  handleDelete,
}) => {
  const handleEditModal = (row: any) => {
    setEditData(row);
    handleOpen();
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "No", minWidth: 70 },
    { field: "_id", headerName: "ID", minWidth: 200 },
    { field: "name", headerName: "Name", minWidth: 200 },
    { field: "price", headerName: "Price", minWidth: 130 },
    {
      field: "action",
      headerName: "Action",
      minWidth: 180,
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
