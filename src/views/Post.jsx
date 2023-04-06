import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { postData } from "../actions/dataActions";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
export default function Detail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [productID, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [amount, setAmount] = useState("");
  const [statusName, setStatusName] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [createBy, setCreateBy] = useState("");
  const [customerName, setCustomerName] = useState("");

  const handleSubmit = async () => {
    setLoading(true);

    const response = dispatch(
      postData({
        productID,
        productName,
        amount,
        status: statusName,
        transactionDate: `${transactionDate.$y}-${
          transactionDate.$M + 1 < 10
            ? `0${transactionDate.$M + 1}`
            : transactionDate.$M + 1
        }-${
          transactionDate.$D < 10
            ? `0${transactionDate.$D}`
            : transactionDate.$D
        } ${
          transactionDate.$H < 10
            ? `0${transactionDate.$H}`
            : transactionDate.$H
        }:${
          transactionDate.$m < 10
            ? `0${transactionDate.$m}`
            : transactionDate.$m
        }:${
          transactionDate.$s < 10
            ? `0${transactionDate.$s}`
            : transactionDate.$s
        }`,
        createBy,
        customerName,
      })
    );

    setLoading(false);
    if (response === "OK") navigate("/");
  };

  return (
    <>
      <Box>
        <Typography variant="h2" mb={5} mt={2}>
          ADD NEW DATA
        </Typography>
      </Box>
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            width: "30ch",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <InputLabel>Product ID</InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          onChange={(e) => setProductID(e.target.value)}
        />
        <InputLabel>Product Name</InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          onChange={(e) => setProductName(e.target.value)}
        />
        <InputLabel>Amount</InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          onChange={(e) => setAmount(e.target.value)}
        />
        <InputLabel>Customer Name</InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <InputLabel>Status</InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          onChange={(e) => setStatusName(e.target.value)}
          select
        >
          <MenuItem value={0}>SUCCESS</MenuItem>
          <MenuItem value={1}>FAILED</MenuItem>
        </TextField>
        <InputLabel>Transaction Date</InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            onChange={(e) => setTransactionDate(e)}
            format="L HH:mm:ss"
          />
        </LocalizationProvider>
        <InputLabel>Create By</InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          onChange={(e) => setCreateBy(e.target.value)}
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
