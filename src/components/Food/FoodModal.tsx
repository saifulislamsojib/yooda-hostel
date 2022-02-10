import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { FC } from "react";
import { Controller, useForm, UseFormReset } from "react-hook-form";

interface IFormInput {
  name: string;
  price: string;
}

interface IProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (
    data: IFormInput,
    event?: React.BaseSyntheticEvent<object, any, any> | undefined,
    reset?: UseFormReset<IFormInput>
  ) => void;
  editData?: any;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "98%",
  maxWidth: 400,
  bgcolor: "white",
  boxShadow: 24,
  p: 2,
  borderRadius: 2,
};

const inputs: ("Name" | "Price")[] = ["Name", "Price"];

const FoodModal: FC<IProps> = ({ open, handleClose, onSubmit, editData }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        reset({});
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {editData?._id ? "Update Food" : "Add A Food"}
          </Typography>
          <IconButton
            onClick={() => {
              handleClose();
              reset({});
            }}
            color="primary"
            aria-label="close"
            component="span"
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        <Box
          component="form"
          onSubmit={handleSubmit((...args) => onSubmit(...args, reset))}
          noValidate
          sx={{ mt: 1 }}
        >
          {inputs.map((name, i) => (
            <Controller
              key={i}
              name={name.toLowerCase() as "name" | "price"}
              control={control}
              rules={{ required: true }}
              defaultValue={editData?.[name.toLowerCase()]}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label={name}
                  type={name === "Price" ? "number" : "text"}
                  error={!!errors[name.toLowerCase() as "name" | "price"]}
                />
              )}
            />
          ))}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button type="submit" variant="contained">
              {editData?._id ? "Update Food" : "Add Food"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default FoodModal;
