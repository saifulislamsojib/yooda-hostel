import CloseIcon from "@mui/icons-material/Close";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
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

interface IOption {
  value: string;
  label: string;
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
  overflow: "auto",
  maxHeight: "98%",
};

interface IFormInput {
  studentId: string;
  foodItemList: IOption[];
  shift: IOption;
  date: Date;
}

interface IFood {
  _id: string;
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
  foods: IFood[];
}

const inputs: { title: string; name: keyof IFormInput }[] = [
  {
    title: "Roll",
    name: "studentId",
  },
  {
    title: "Select Foods",
    name: "foodItemList",
  },
  {
    title: "Shift",
    name: "shift",
  },
  {
    title: "Date",
    name: "date",
  },
];

const selectStyles: StylesConfig<{}, false, never> = {
  control: (provided) => ({
    ...provided,
    minHeight: "40px",
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

const shiftOptions = ["Morning", "Day"].map((it) => ({ value: it, label: it }));

const DistributionModal: FC<IProps> = ({
  open,
  handleClose,
  onSubmit,
  foods,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({ defaultValues: { date: new Date() } });

  const options = foods.map((food) => ({ value: food._id, label: food.name }));

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
            Distribution Foods
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
              defaultValue={name === "date" ? new Date() : undefined}
              render={({ field }) =>
                name === "foodItemList" || name === "shift" ? (
                  <>
                    <label>{title}</label>
                    <Select
                      {...field}
                      styles={selectStyles}
                      options={name === "shift" ? shiftOptions : options}
                      isMulti={
                        name === "shift" ? false : (true as false | undefined)
                      }
                    />
                  </>
                ) : name === "date" ? (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      {...field}
                      label={title}
                      renderInput={(params) => (
                        <TextField sx={{ mt: 2 }} {...params} fullWidth />
                      )}
                      desktopModeMediaQuery="@media (min-width: 720px)"
                    />
                  </LocalizationProvider>
                ) : (
                  <TextField
                    {...field}
                    margin="normal"
                    required
                    fullWidth
                    label={title}
                    type={"text"}
                    error={!!errors[name]}
                  />
                )
              }
            />
          ))}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button type="submit" variant="contained">
              Distribute
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default DistributionModal;
