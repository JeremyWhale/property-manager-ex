import { IcPageHeader, IcButton } from "@ukic/react";
import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
// import Toolbar from '@mui/material/Toolbar';
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { Add, Edit, Engineering } from "@mui/icons-material";
import axios from "axios";
import apiLocation from "../components/apiLocation";
import { MenuItem, Modal, TextField, Typography } from "@mui/material";
import formatDisplayDate from "../components/formatdisplayDate";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../App.context";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "property",
    numeric: false,
    disablePadding: false,
    label: "Property",
  },
  {
    id: "item",
    numeric: false,
    disablePadding: false,
    label: "Items",
  },
  {
    id: "tradeSupplier",
    numeric: false,
    disablePadding: false,
    label: "Trade Supplier",
  },
  {
    id: "cost",
    numeric: false,
    disablePadding: false,
    label: "Cost",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function PurchasesView() {
  const navigate = useNavigate();
  
  const { setIssueToEdit } = useAppContext()

  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("date");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContractorName, setSelectedContractorName] = useState("");
  const [selectedIssueId, setSelectedIssueId] = useState("");
  const [contractor, setContractor] = useState();

  const [selectedProperty, setSelectedProperty] = useState('none')
  const [propertyList, setPropertyList] = useState([])
  const [unfilteredRows, setUnfilteredRows] = useState([])

  useEffect(() => {
    axios
      .get(`${apiLocation}/purchases/`)
      .then((response) => {
        const data = response.data;
        const mappedRows = data.map((issue) => ({
          id: issue.id,
          dateReported: issue.date,
          property: issue.property,
          problem: issue.items,
          dateResolved: issue.cost,
          contractor: issue.trade_supplier,
        }));

        setUnfilteredRows(mappedRows); // Update the state with the mapped data
      })
      .catch((error) => {
        console.error("There was an error fetching the purchases:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedProperty === 'none'){
      setRows(unfilteredRows)
    }
    else{
      const filteredRows = unfilteredRows.filter(obj => {
        if (obj.property === selectedProperty) {
            return true;
        }
        return false;
      })

      setRows(filteredRows)
    }
  }, [selectedProperty, unfilteredRows])

  useEffect(() => {
    // Make an Axios GET request to fetch the data
    axios
      .get(`${apiLocation}/trade-supplier/${selectedContractorName}/`)
      .then((response) => {
        const data = response.data;
        const mappedContractors = {
          name: data.name,
          address: data.address,
          phoneNumber: data.phone_number,
          email: data.email,
        };

        setContractor(mappedContractors);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedContractorName]);

  useEffect(() => {
    async function getPropertyList(){
      try {
        const response = await axios.get(`${apiLocation}/property-list`);

        // Convert the response data into your desired format
        const data = response.data.map((property) => ({
          addressLine1: property.address_line_1,
          country: property.country,
        }));

        setPropertyList(data);
      } catch (e) {
        // Handle your error here
        console.error("Error fetching data:", e);
      }
    }

    getPropertyList()
  }, [])



  // Function to open the modal when the contractor name is clicked
  const handleOpenModal = (contractorName, issueID) => {
    setSelectedContractorName(contractorName);
    setSelectedIssueId(issueID);
  };

  const handleNotOpenModal = (contractorName, issueID) => {
    setSelectedContractorName(contractorName);
    setSelectedIssueId(issueID);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  const handleIssueEditSelect = () => {
    setIssueToEdit(selectedIssueId)
    navigate('/purchases/edit')
  }

  return (
    <>
      <IcPageHeader heading="Purchases">
          <>
            {selectedContractorName.length !== 0 && (
              <IcButton
                slot="actions"
                variant="tertiary"
                onClick={() => setModalOpen(true)}
              >
                <Engineering slot="left-icon" /> Supplier Details
              </IcButton>
            )}
            {selectedIssueId !== "" && (
              <IcButton
                slot="actions"
                variant="tertiary"
                onClick={handleIssueEditSelect}
              >
                <Edit slot="left-icon" /> Edit Purchase
              </IcButton>
            )}
          </>
        <IcButton
          slot="actions"
          variant="primary"
          onClick={() => navigate("/purchases/add")}
        >
          <Add slot="left-icon" /> Add Purchase
        </IcButton>
        <TextField
          slot="input"
          labelId="demo-simple-select-label"
          variant="outlined"
          id="demo-simple-select"
          value={selectedProperty}
          label="Property filter"
          select
          onChange={(e) => setSelectedProperty(e.target.value)}
          fullWidth
        >
          <MenuItem key='none' value='none'>No filter</MenuItem>
          {propertyList
          .sort((a, b) => a.addressLine1.localeCompare(b.addressLine1))
          .map((property, index) => (
            <MenuItem key={index} value={property.addressLine1}>
              {property.addressLine1}
            </MenuItem>
          ))}
        </TextField>
      </IcPageHeader>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      sx={{ cursor: "pointer" }}
                      onClick={() => { handleOpenModal(row.contractor, row.id)}}
                    >
                      <TableCell align="left">
                        {formatDisplayDate(row.dateReported)}
                      </TableCell>
                      <TableCell align="left">{row.property}</TableCell>
                      <TableCell align="left">{row.problem}</TableCell>
                      <TableCell align="left">{row.contractor}</TableCell>
                      <TableCell align="left">£{row.dateResolved}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={5} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        {/* Material-UI Modal */}
        <Modal open={modalOpen} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              p: 2,
              borderRadius: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {" "}
              Supplier{" "}
            </Typography>
            {contractor?.name && (
              <Typography sx={{ mt: 2 }}>
                <b>Name:</b> {contractor.name}
              </Typography>
            )}
            {contractor?.address && (
              <Typography sx={{ mt: 2 }}>
                <b>Address:</b> {contractor.address}
              </Typography>
            )}
            {contractor?.phoneNumber && (
              <Typography sx={{ mt: 2 }}>
                <b>Phone Number:</b> {contractor.phoneNumber}
              </Typography>
            )}
            {contractor?.email && (
              <Typography sx={{ mt: 2 }}>
                <b>Email:</b> {contractor.email}
              </Typography>
            )}
          </Box>
        </Modal>
      </Box>
    </>
  );
}
