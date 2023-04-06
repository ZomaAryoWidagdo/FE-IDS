import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editData, getDataDetails } from "../actions/dataActions";
import {
  Box,
  Button,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
export default function Detail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({});
  const { dataDetails } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(getDataDetails(id));
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async () => {
    setLoading(true);

    const response = await dispatch(editData(values, id));

    setLoading(false);

    if (response === "OK") navigate("/");
  };

  return (
    <>
      <Box>
        <Typography variant="h2" mb={5} mt={2}>
          EDIT DATA
        </Typography>
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            width: "30ch",
          },
          "& .MuiNativeSelect-root": { width: "auto" },
        }}
        noValidate
        autoComplete="off"
      >
        <InputLabel>Product ID</InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder={dataDetails?.productID}
          onChange={(e) => {
            setValues({ ...values, productID: e.target.value });
          }}
        />
        <InputLabel>Product Name</InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder={dataDetails?.productName}
          onChange={(e) => {
            setValues({ ...values, productName: e.target.value });
          }}
        />
        <InputLabel>Amount</InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder={dataDetails?.amount}
          onChange={(e) => {
            setValues({ ...values, amount: e.target.value });
          }}
        />
        <InputLabel>Customer Name</InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder={dataDetails?.customerName}
          onChange={(e) => {
            setValues({ ...values, customerName: e.target.value });
          }}
        />
        <InputLabel>Status</InputLabel>
        <NativeSelect
          sx={{
            borderRadius: "4px",
            padding: "16.5px 14px",
            border: 0.1,
            boxSizing: "content-box",
            height: "1.4375em",
            margin: 0,
            display: "block",
            minWidth: 0,
            animationDuration: "10ms",
          }}
          defaultValue={dataDetails?.status}
          onChange={(e) => {
            setValues({ ...values, status: e.target.value });
          }}
        >
          <option value={0}>SUCCESS</option>
          <option value={1}>FAILED</option>
        </NativeSelect>
        <InputLabel>Transaction Date</InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            defaultValue={dayjs(dataDetails.transactionDate)}
            onChange={(e) => setValues({ ...values, transactionDate: e })}
            format="L HH:mm:ss"
          />
        </LocalizationProvider>
        <InputLabel>Create By</InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder={dataDetails?.createBy}
          onChange={(e) => {
            setValues({ ...values, createBy: e.target.value });
          }}
        />
        <Box display="flex" justifyContent={"space-evenly"}>
          <Button
            variant="contained"
            onClick={() => handleSubmit()}
            disabled={loading}
          >
            Submit
          </Button>
          <Button variant="contained" onClick={() => navigate("/")}>
            Back
          </Button>
        </Box>
      </Box>
    </>
  );
}
