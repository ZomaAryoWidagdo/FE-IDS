import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDataDetails } from "../actions/dataActions";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
export default function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { dataDetails } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataDetails(id));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Box>
        <Typography variant="h2" mb={5} mt={2}>
          DATA DETAIL
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
        <InputLabel>Number</InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={dataDetails.id}
          disabled
        />
        <InputLabel>Product ID</InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={dataDetails.productID}
          disabled
        />
        <InputLabel>Product Name</InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={dataDetails.productName}
          disabled
        />
        <InputLabel>Amount</InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={dataDetails.amount}
          disabled
        />
        <InputLabel>Customer Name</InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={dataDetails.customerName}
          disabled
        />
        <InputLabel>Status</InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={dataDetails.statusName}
          disabled
        />
        <InputLabel>Transaction Date</InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={dataDetails.transactionDate}
          disabled
        />
        <InputLabel>Create By</InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={dataDetails.createBy}
          disabled
        />
        <InputLabel>Created On</InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={dataDetails.createdOn}
          disabled
        />
        <Box>
          <Button variant="contained" onClick={() => navigate(`/`)}>
            Back
          </Button>
        </Box>
      </Box>
    </>
  );
}
