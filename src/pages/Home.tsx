import { Box, CircularProgress, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SubmitHandler, UseFormReset } from "react-hook-form";
import toast from "react-hot-toast";
import FoodModal from "../components/Food/FoodModal";
import FoodTable from "../components/Food/FoodTable";
import TopBar from "../components/TopBar";
import requests from "../services/httpService";

interface IFormInput {
  name: string;
  price: string;
  _id?: string;
}

const Home = () => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({} as IFormInput);
  const [count, setCount] = useState<number | null>(null);
  const [foods, setFoods] = useState<IFormInput[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let toastId: string | undefined;
      if (count !== null) {
        toastId = toast.loading("Loading...");
      }
      try {
        const { data } = await requests.get<{ data: IFormInput[] }>(
          `/food?count=${count || 0}&limit=${10}`
        );
        setLoading(false);
        if (count !== null) {
          toast.dismiss(toastId);
        }
        setFoods(data.map((food, index) => ({ ...food, id: index + 1 })));
        handleClose();
      } catch (error: any) {
        setLoading(false);
        console.log(error.message);
      }
    })();
  }, [count]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditData({} as IFormInput);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (
    data,
    e,
    reset?: UseFormReset<IFormInput>
  ) => {
    const path = editData?._id ? `/food/${editData._id}` : "/food";
    const method = editData?._id ? "patch" : "post";
    const toastId = toast.loading("Loading...");
    try {
      const res = await requests[method]<{ data: IFormInput }>(path, data);
      toast.dismiss(toastId);
      toast.success(
        editData?._id ? "Food Updated Successfully" : "Food Added Successfully"
      );
      handleClose();
      reset?.({});
      if (editData?._id) {
        setFoods((preStudents) => {
          const newStudents = [...preStudents];
          const index = newStudents.findIndex(
            (student) => student._id === editData?._id
          );
          newStudents[index] = { ...newStudents[index], ...data };
          return newStudents;
        });
      } else {
        setFoods((preFoods) => {
          if (preFoods.length < 10) {
            return [...preFoods, { ...res.data, id: preFoods.length + 1 }];
          } else {
            return preFoods;
          }
        });
      }
    } catch (error: any) {
      toast.dismiss(toastId);
      toast.error(error.message);
    }
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCount((value - 1) * 10);
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Loading...");
    try {
      await requests.delete(`/food/${id}`);
      toast.dismiss(toastId);
      toast.success("Food Deleted Successfully");
      setFoods((preFoods) => preFoods.filter((it) => it._id !== id));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <TopBar title="Manage Foods" btnText="Add A Food" onClick={handleOpen} />
      {loading ? (
        <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <FoodTable
          handleOpen={handleOpen}
          rows={foods}
          setEditData={setEditData}
          handleDelete={handleDelete}
        />
      )}
      {!loading && (
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
          <Pagination count={10} color="primary" onChange={handleChange} />
        </Box>
      )}
      <FoodModal
        editData={editData}
        onSubmit={onSubmit}
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Home;
