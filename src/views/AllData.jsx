import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllData } from "../actions/dataActions";
import {
  DataGridPremium,
  GridActionsCellItem,
  GridToolbarContainer,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
} from "@mui/x-data-grid-premium";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ArticleIcon from "@mui/icons-material/Article";
import { Typography } from "@mui/material";

export default function AllData() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { allData } = useSelector((state) => state.data);

  useEffect(() => {
    setLoading(true);

    dispatch(getAllData()).then((x) => {
      if (x === "OK") setLoading(false);
    });

    // eslint-disable-next-line
  }, []);

  const apiRef = useGridApiRef();

  const initialState = useKeepGroupedColumnsHidden({
    apiRef,
    initialState: {
      rowGrouping: {
        model: ["period"],
      },
    },
  });

  function AddToolbar(props) {
    const handleClick = () => {
      navigate("/post");
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add Data
        </Button>
      </GridToolbarContainer>
    );
  }

  const handleDetailClick = (id) => {
    if (!isNaN(id)) navigate(`${id}`);
  };

  const handleEditClick = (id) => {
    if (!isNaN(id)) navigate(`/edit/${id}`);
  };

  const columns = [
    {
      field: "period",
      headerName: "Period",
    },
    {
      field: "id",
      headerName: "Number",
    },
    {
      field: "productID",
      headerName: "Product ID",
    },
    {
      field: "amount",
      headerName: "Amount",
    },
    {
      field: "status",
      headerName: "Status",
    },
    {
      field: "transactionDate",
      headerName: "Transaction Date",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<ArticleIcon />}
            label="Detail"
            onClick={() => handleDetailClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
      <Box>
        <Typography variant="h2" mb={5} mt={2}>
          ALL DATA LIST
        </Typography>
      </Box>
      <Box sx={{ height: "80vh", width: "90vw" }}>
        <DataGridPremium
          rows={allData}
          columns={columns}
          apiRef={apiRef}
          initialState={initialState}
          hideFooter
          loading={loading}
          slots={{
            toolbar: AddToolbar,
          }}
        />
      </Box>
    </>
  );
}
