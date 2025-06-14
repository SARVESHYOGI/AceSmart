import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import React, { useEffect } from "react";
import { generateMockTest } from "../api/mockTest";

export type MCQOptionKey = "A" | "B" | "C" | "D";

export type MCQ = {
  question: string;
  options: Record<MCQOptionKey, string>;
  correctAnswer: MCQOptionKey;
  explanation: string;
};

export default function MockTest() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [data, setData] = React.useState<MCQ[] | null>(null);

  useEffect(() => {
    const res = generateMockTest({});

    setData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="min-h-screen bg-gray-50 w-full flex flex-col items-center py-8">
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
              <form className="flex flex-col gap-4 mt-2">
                <div className="flex flex-col">
                  <label
                    htmlFor="exam"
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    Exam
                  </label>
                  <input
                    id="exam"
                    type="text"
                    placeholder="Give exam type"
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="subject"
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    Subject
                  </label>
                  <input
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
                    id="topic"
                    type="text"
                    placeholder="Enter topic"
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions className="!px-6 !pb-4">
            <Button
              autoFocus
              onClick={handleClose}
              className="!bg-blue-600 !text-white hover:!bg-blue-700 !rounded"
            >
              Generate
            </Button>
            <Button onClick={handleClose} autoFocus className="!rounded">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Button variant="outlined" className="!mb-6 !w-full">
          Old Questions
        </Button>
      </div>
    </div>
  );
}
