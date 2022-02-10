import { Box, CircularProgress, Pagination } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { SubmitHandler, UseFormReset } from "react-hook-form";
import toast from "react-hot-toast";
import Select, { SingleValue, StylesConfig } from "react-select";
import StudentModal from "../components/Students/StudentModal";
import StudentTable from "../components/Students/StudentTable";
import TopBar from "../components/TopBar";
import requests from "../services/httpService";

const selectStyles: StylesConfig<
  { value: string; label: string },
  false,
  never
> = {
  container: (provided) => ({
    ...provided,
    maxWidth: 350,
    margin: "0 auto",
  }),
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
  }),
};

const options = ["active", "inActive"].map((it) => ({ value: it, label: it }));

const Container = styled("section")`
  margin-bottom: 10px;
`;

interface IFormInput {
  _id?: string;
  fullName: string;
  roll: string;
  age: string;
  class: string;
  hall: string;
  status: any;
}

const Students = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({} as IFormInput);
  const [count, setCount] = useState<number | null>(null);
  const [students, setStudents] = useState<IFormInput[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let toastId: string | undefined;
      if (count !== null) {
        toastId = toast.loading("Loading...");
      }
      try {
        const { data } = await requests.get<{ data: IFormInput[] }>(
          `/student?count=${count}`
        );
        setLoading(false);
        if (count !== null) {
          toast.dismiss(toastId);
        }
        setStudents(
          data.map((student, index) => ({ ...student, id: index + 1 }))
        );
        handleClose();
      } catch (error: any) {
        if (count !== null) {
          toast.dismiss(toastId);
        }
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
    const path = editData?._id ? `/student/${editData._id}` : "/student";
    const method = editData?._id ? "patch" : "post";
    const toastId = toast.loading("Loading...");
    const { status, ...other } = data;
    const newData = { ...other, status: status?.value };
    try {
      const res = await requests[method]<{ data: IFormInput }>(path, newData);
      toast.dismiss(toastId);
      toast.success(
        editData?._id
          ? "Student Updated Successfully"
          : "Student Added Successfully"
      );
      handleClose();
      reset?.({});
      if (editData?._id) {
        setStudents((preStudents) => {
          const newStudents = [...preStudents];
          const index = newStudents.findIndex(
            (student) => student._id === editData?._id
          );
          newStudents[index] = { ...newStudents[index], ...newData };
          return newStudents;
        });
      } else {
        setStudents((preStudents) => {
          if (preStudents.length < 10) {
            return [
              ...preStudents,
              { ...res.data, id: preStudents.length + 1 },
            ];
          } else {
            return preStudents;
          }
        });
      }
    } catch (error: any) {
      toast.dismiss(toastId);
      toast.error(error.message);
    }
  };

  const handleStatus = async (
    newValue: SingleValue<{
      value: string;
      label: string;
    }>
  ) => {
    const toastId = toast.loading("Loading...");
    try {
      console.log(selectedItems);
      await requests.patch("/student/updateStatus", {
        ids: selectedItems,
        status: newValue?.value,
      });
      toast.dismiss(toastId);
      toast.success("Status Updated Successfully");
      setStudents((preStudents) => {
        const newData = [...preStudents];
        const filtered = preStudents.filter((item) =>
          selectedItems.includes(item._id || "")
        );
        filtered.forEach((item) => {
          const index = newData.findIndex((i) => i._id === item._id);
          newData[index] = { ...item, status: newValue?.value };
        });
        return newData;
      });
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
      await requests.delete(`/student/${id}`);
      toast.dismiss(toastId);
      toast.success("Student Deleted Successfully");
      setStudents((preStudents) => preStudents.filter((it) => it._id !== id));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Container>
      <TopBar
        title="Manage Students"
        btnText="Add A Student"
        onClick={handleOpen}
      />
      <Select styles={selectStyles} options={options} onChange={handleStatus} />
      {loading ? (
        <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <StudentTable
          handleOpen={handleOpen}
          rows={students}
          setEditData={setEditData}
          setSelectedItems={setSelectedItems}
          handleDelete={handleDelete}
        />
      )}
      {!loading && (
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
          <Pagination count={10} color="primary" onChange={handleChange} />
        </Box>
      )}
      <StudentModal
        editData={editData}
        onSubmit={onSubmit}
        open={open}
        handleClose={handleClose}
      />
    </Container>
  );
};

export default Students;
