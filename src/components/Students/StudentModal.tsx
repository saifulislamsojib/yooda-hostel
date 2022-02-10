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
import Select, { StylesConfig } from "react-select";

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
  overflow: "auto",
  maxHeight: "98%",
};

interface IFormInput {
  fullName: string;
  roll: string;
  age: string;
  class: string;
  hall: string;
  status: string;
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

const inputs: { title: string; name: keyof IFormInput }[] = [
  {
    title: "Full Name",
    name: "fullName",
  },
  {
    title: "Roll",
    name: "roll",
  },
  {
    title: "Age",
    name: "age",
  },
  {
    title: "Class",
    name: "class",
  },
  {
    title: "Hall",
    name: "hall",
  },
  {
    title: "Full Name",
    name: "status",
  },
];

const selectStyles: StylesConfig<{}, false, never> = {
  control: (provided) => ({
    ...provided,
    height: "40px",
  }),
  indicatorSeparator: (provided) => ({
    display: "none",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "12px",
    overflow: "hidden",
    padding: 0,
    position: "relative",
  }),
};

const options = ["active", "inActive"].map((it) => ({ value: it, label: it }));

const StudentModal: FC<IProps> = ({
  open,
  handleClose,
  onSubmit,
  editData,
}) => {
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
            {editData?._id ? "Update Student" : "Add A Student"}
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
          {inputs.map(({ name, title }) => (
            <Controller
              key={name}
              name={name}
              control={control}
              rules={{ required: true }}
              defaultValue={
                name === "status"
                  ? editData?.[name]
                    ? { value: editData?.[name], label: editData?.[name] }
                    : options[0]
                  : editData?.[name]
              }
              render={({ field }) =>
                name === "status" ? (
                  <Select {...field} styles={selectStyles} options={options} />
                ) : (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    label={title}
                    type={name === "age" ? "number" : "text"}
                    error={!!errors[name]}
                  />
                )
              }
            />
          ))}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button type="submit" variant="contained">
              {editData?._id ? "Update Student" : "Add Student"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default StudentModal;
