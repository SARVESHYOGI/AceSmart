import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState } from "react";
import { generateMockTest } from "../api/mockTest";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Atom } from "react-loading-indicators";
import { Link } from "react-router-dom";

export type MCQOptionKey = "A" | "B" | "C" | "D";

export type MCQ = {
  question: string;
  options: Record<MCQOptionKey, string>;
  correctAnswer: MCQOptionKey;
  explanation: string;
};

export type Inputs = {
  exam: string;
  subject: string;
  topic: string;
};

export default function MockTest() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const allFields = watch();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const res = await generateMockTest(data);
      handleClose();
      console.log(res);
      setData(res);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [data, setData] = React.useState<MCQ[] | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-gray-50 w-full flex flex-col items-center py-8">
      {loading && (
        <div className="absolute inset-0 z-50 backdrop-blur-md bg-white/30 flex items-center justify-center">
          <Atom color="#32cd32" size="large" text="" textColor="" />
        </div>
      )}
      <div className="text-3xl font-bold mb-8 text-gray-800">MockTest</div>
      <div className="w-full max-w-md">
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          className="!mb-6 !w-full"
        >
          Generate New Questions
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          PaperProps={{
            className: "rounded-lg",
          }}
        >
          <DialogTitle
            id="responsive-dialog-title"
            className="!text-xl !font-semibold !text-gray-800"
          >
            {"Generate new questions through AI"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText component="div">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 mt-2"
              >
                <div className="flex flex-col">
                  <label
                    htmlFor="exam"
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    Exam
                  </label>
                  <input
                    id="exam"
                    {...register("exam", { required: "Exam is required" })}
                    type="text"
                    placeholder="Give exam type"
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.exam && (
                    <p className="text-red-500 text-sm">
                      {errors.exam.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="subject"
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    Subject
                  </label>
                  <input
                    {...register("subject")}
                    id="subject"
                    type="text"
                    placeholder="Give subject"
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="topic"
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    Topic
                  </label>
                  <input
                    {...register("topic")}
                    id="topic"
                    type="text"
                    placeholder="Enter topic"
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <DialogActions className="!px-6 !pb-4">
                  <Button
                    autoFocus
                    // onClick={handleClose}
                    type="submit"
                    disabled={!allFields}
                    className="!bg-blue-600 !text-white hover:!bg-blue-700 !rounded"
                  >
                    Generate
                  </Button>
                  <Button onClick={handleClose} autoFocus className="!rounded">
                    Cancel
                  </Button>
                </DialogActions>
              </form>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <Button variant="outlined" className="!mb-6 !w-full">
          Old Questions
        </Button>
      </div>
      {data && (
        <>
          <div>test generated</div>
          <Link to="/test">
            <Button>GO TO TEST</Button>
          </Link>
        </>
      )}
    </div>
  );
}
