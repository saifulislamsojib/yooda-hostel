import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { SubmitHandler, UseFormReset } from "react-hook-form";
import toast from "react-hot-toast";
import DistributionModal from "../components/Distribution/DistributionModal";
import DistributionTable from "../components/Distribution/DistributionTable";
import TopBar from "../components/TopBar";
import requests from "../services/httpService";

interface IOption {
  value: string;
  label: string;
}

interface IFormInput {
  studentId: string;
  foodItemList: IOption[];
  shift: IOption;
  date: Date;
}

interface IDistribution {
  _id?: string;
  studentId: string;
  foodItemList: string[];
  shift: string;
  date: Date;
  status: string;
}

interface IFood {
  _id: string;
  name: string;
  price: string;
}

const Distribution = () => {
  const [open, setOpen] = useState(false);
  const [foods, setFoods] = useState<IFood[]>([]);
  const [distribution, setDistribution] = useState<IDistribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await requests.get<{ data: IDistribution[] }>(
          "/distribute"
        );
        setDistribution(data.map((it, i) => ({ ...it, id: i + 1 })));
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        console.log(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await requests.get<{ data: IFood[] }>("/food");
        setFoods(data);
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (
    data,
    e,
    reset?: UseFormReset<IFormInput>
  ) => {
    const { foodItemList, shift, ...other } = data;
    const foodItem = foodItemList.map((it) => it.value);
    const newData = { ...other, foodItemList: foodItem, shift: shift.value };
    const toastId = toast.loading("Loading...");
    try {
      const res = await requests.post<{ data: IDistribution; error: string }>(
        "/distribute",
        newData
      );
      toast.dismiss(toastId);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Successfully Distributed!");
        handleClose();
        reset?.({});
      }
    } catch (error: any) {
      toast.dismiss(toastId);
      toast.error(error.message);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <TopBar
        title="Distribution Foods"
        btnText="Distribute"
        onClick={handleOpen}
      />
      {loading && (
        <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      {!loading && distribution.length > 0 ? (
        <DistributionTable rows={distribution} />
      ) : (
        !loading && (
          <Typography
            color="lightgrey"
            id="modal-modal-title"
            variant="h6"
            component="h6"
            sx={{ mt: 3, textAlign: "center" }}
          >
            No Distribution Found Today..
          </Typography>
        )
      )}
      <DistributionModal
        onSubmit={onSubmit}
        open={open}
        handleClose={handleClose}
        foods={foods}
      />
    </div>
  );
};

export default Distribution;
