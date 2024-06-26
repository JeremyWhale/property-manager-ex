import React, { useState, useEffect } from "react";
import { IcButton, IcPageHeader } from "@ukic/react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import {
  Add,
  AdminPanelSettingsOutlined,
  Delete,
  Edit,
  HelpOutlined,
  Logout,
  Storage,
  UploadOutlined,
} from "@mui/icons-material";
import apiLocation from "../components/apiLocation";
import axios from "axios";
import StaticAlert from "../components/staticAlert";
import { useAppContext } from "../App.context";

export default function SettingsView({ setLoggedIn }) {
  const { currentUser, setCurrentUser } = useAppContext()

  // Supplier
  const [supplierModalOpen, setSupplierModalOpen] = useState(false);
  const [supplierEditModalOpen, setSupplierEditModalOpen] = useState(false);

  const [gasSupplierOptions, setGasSupplierOptions] = useState([]);
  const [electricSupplierOptions, setElectricSupplierOptions] = useState([]);
  const [waterSupplierOptions, setWaterSupplierOptions] = useState([]);
  const [tradeSupplierOptions, setTradeSupplierOptions] = useState([])
  const [selectedSupplier, setSelectedSupplier] = useState("");

  const [supplierId, setSupplierId] = useState("");
  const [supplierType, setSupplierType] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierEmail, setSupplierEmail] = useState("");
  const [supplierPhone, setSupplierPhone] = useState("");
  const [supplierAddress, setSupplierAddress] = useState("");

  const [supplierUploadSucess, setSupplierUploadSuccess] = useState(false);
  const [showSupplierMessage, setShowSupplierMessage] = useState(false);
  const [supplierEditUploadSucess, setSupplierEditUploadSuccess] =
    useState(false);
  const [showSupplierEditMessage, setShowSupplierEditMessage] = useState(false);

  // Deposit scheme
  const [dsModalOpen, setDsModalOpen] = useState(false);
  const [dsEditModalOpen, setDsEditModalOpen] = useState(false);

  const [dsOptions, setDsOptions] = useState([]);
  const [selectedDs, setSelectedDs] = useState("");

  const [dsId, setDsId] = useState("");

  const [dsName, setDsName] = useState("");
  const [dsPhone, setDsPhone] = useState("");
  const [dsEmail, setDsEmail] = useState("");
  const [dsAddress, setDsAddress] = useState("");

  const [dsUploadSucess, setDsUploadSuccess] = useState(false);
  const [showDsMessage, setShowDsMessage] = useState(false);
  const [dsEditUploadSucess, setDsEditUploadSuccess] = useState(false);
  const [showDsEditMessage, setShowDsEditMessage] = useState(false);

  // Agent
  const [agentModalOpen, setAgentModalOpen] = useState(false);
  const [agentEditModalOpen, setAgentEditModalOpen] = useState(false);

  const [agentOptions, setAgentOptions] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");

  const [agentId, setAgentId] = useState("");

  const [agentName, setAgentName] = useState("");
  const [agentPhone, setAgentPhone] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [agentAddress, setAgentAddress] = useState("");

  const [agentUploadSucess, setAgentUploadSuccess] = useState(false);
  const [showAgentMessage, setShowAgentMessage] = useState(false);
  const [agentEditUploadSucess, setAgentEditUploadSuccess] = useState(false);
  const [showAgentEditMessage, setShowAgentEditMessage] = useState(false);

  //contractor
  const [contractorModalOpen, setContractorModalOpen] = useState(false);
  const [contractorEditModalOpen, setContractorEditModalOpen] = useState(false);

  const [contractorOptions, setContractorOptions] = useState([]);
  const [selectedContractor, setSelectedContractor] = useState("");

  const [contractorId, setContractorId] = useState("");

  const [cName, setCName] = useState("");
  const [cAddress, setCaddress] = useState("");
  const [cPhone, setCphone] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cBankAccount, setCBankAccount] = useState("");
  const [cSortCode, setCSortCode] = useState("");

  const [contractorUploadSucess, setContractorUploadSuccess] = useState(false);
  const [showContractorMessage, setShowContractorMessage] = useState(false);
  const [contractorEditUploadSucess, setContractorEditUploadSuccess] =
    useState(false);
  const [showContractorEditMessage, setShowContractorEditMessage] =
    useState(false);

    async function getAgentList() {
      try {
        const response = await axios.get(`${apiLocation}/agents`);

        // Convert the response data into your desired format
        const data = response.data.map((tenant) => ({
          name: tenant.name,
          id: tenant.id,
        }));

        setAgentOptions(data);
      } catch (e) {
        // Handle your error here
        console.error("Error fetching data:", e);
      }
    }

    async function getDepositSchemes() {
      try {
        const response = await axios.get(`${apiLocation}/deposit-scheme-list/`);

        // Convert the response data into your desired format
        const data = response.data.map((tenant) => ({
          name: tenant.scheme_name,
          id: tenant.id,
        }));

        setDsOptions(data);
      } catch (e) {
        // Handle your error here
        console.error("Error fetching data:", e);
      }
    }

    async function getContractorList() {
      try {
        const response = await axios.get(`${apiLocation}/contractor-list`);

        // Convert the response data into your desired format
        const data = response.data.map((contractor) => ({
          id: contractor.id,
          name: contractor.name,
        }));

        setContractorOptions(data);
      } catch (e) {
        // Handle your error here
        console.error("Error fetching data:", e);
      }
    }

    async function getSuppliers() {
      try {
        const Gresponse = await axios.get(`${apiLocation}/gas-supplier-list/`);
        const Eresponse = await axios.get(
          `${apiLocation}/electric-supplier-list/`
        );
        const Wresponse = await axios.get(
          `${apiLocation}/water-supplier-list/`
        );

        const Tresponse = await axios.get(
          `${apiLocation}/trade-supplier-list/`
        );

        // Convert the response data into your desired format
        const Gdata = Gresponse.data.map((tenant) => ({
          name: tenant.name,
          id: tenant.id,
        }));

        const Edata = Eresponse.data.map((tenant) => ({
          name: tenant.name,
          id: tenant.id,
        }));

        const Wdata = Wresponse.data.map((tenant) => ({
          name: tenant.name,
          id: tenant.id,
        }));

        const Tdata = Tresponse.data.map((tenant) => ({
          name: tenant.name,
          id: tenant.id,
        }));

        setGasSupplierOptions(Gdata);
        setElectricSupplierOptions(Edata);
        setWaterSupplierOptions(Wdata);
        setTradeSupplierOptions(Tdata)
      } catch (e) {
        // Handle your error here
        console.error("Error fetching data:", e);
      }
    }

  useEffect(() => {
    getAgentList();
    getDepositSchemes();
    getContractorList();
    getSuppliers();
  }, [supplierModalOpen, supplierEditModalOpen, dsEditModalOpen, dsModalOpen, agentModalOpen, agentEditModalOpen, contractorEditModalOpen, contractorModalOpen]);

  useEffect(() => {
    async function getAgentInfo() {
      axios
        .get(`${apiLocation}/agent-details/${selectedAgent}`)
        .then((response) => {
          setAgentId(response.data.id);
          setAgentName(response.data.name);
          setAgentPhone(response.data.phone_number);
          setAgentEmail(response.data.email);
          setAgentAddress(response.data.address);
        });
    }

    {
      selectedAgent !== "" && getAgentInfo();
    }
  }, [selectedAgent]);

  useEffect(() => {
    async function getDsInfo() {
      axios
        .get(`${apiLocation}/deposit-scheme-details/${selectedDs}`)
        .then((response) => {
          setDsId(response.data.id);
          setDsName(response.data.scheme_name);
          setDsPhone(response.data.scheme_contact_number);
          setDsEmail(response.data.scheme_email);
          setDsAddress(response.data.scheme_address);
        });
    }

    {
      selectedDs !== "" && getDsInfo();
    }
  }, [selectedDs]);

  useEffect(() => {
    async function getContractorInfo() {
      axios
        .get(`${apiLocation}/contractor-details/${selectedContractor}/`)
        .then((response) => {
          setContractorId(response.data.id);
          setCName(response.data.name);
          setCaddress(response.data.address);
          setCphone(response.data.phone_number);
          setCEmail(response.data.email);
          setCBankAccount(response.data.bank_account_number);
          setCSortCode(response.data.bank_sort_code);
        });
    }

    {
      selectedContractor !== "" && getContractorInfo();
    }
  }, [selectedContractor]);

  useEffect(() => {
    async function getSupplierInfo() {
      axios
        .get(`${apiLocation}/${supplierType}-supplier/${selectedSupplier}`)
        .then((response) => {
          setSupplierId(response.data.id);
          setSupplierName(response.data.name);
          setSupplierPhone(response.data.phone_number);
          setSupplierEmail(response.data.email);
          setSupplierAddress(response.data.address);
        });
    }

    {
      selectedSupplier !== "" && getSupplierInfo();
    }
  }, [selectedSupplier]);

  useEffect(() => {
    setSelectedSupplier("")
    setSupplierName("");
    setSupplierPhone("");
    setSupplierEmail("");
    setSupplierAddress("")
    setShowSupplierMessage(false)
    setShowSupplierEditMessage(false)

    setSelectedDs("")
    setDsName("");
    setDsPhone("");
    setDsEmail("");
    setDsAddress("")
    setShowDsMessage(false)
    setShowDsEditMessage(false)

    setSelectedAgent("")
    setAgentName("");
    setAgentPhone("");
    setAgentEmail("");
    setAgentAddress("");
    setShowAgentMessage(false)
    setShowAgentEditMessage(false)

    setSelectedContractor("")
    setCName("");
    setCaddress("");
    setCphone("");
    setCEmail("");
    setCSortCode("");
    setCBankAccount("");
    setShowContractorMessage(false)
    setShowContractorEditMessage(false)
  }, [supplierType, supplierModalOpen, supplierEditModalOpen, dsEditModalOpen, dsModalOpen, agentModalOpen, agentEditModalOpen, contractorEditModalOpen, contractorModalOpen])

  function handleLogout() {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  }

  function handleSupplierAdd() {
    const data = {
      name: supplierName,
      phone_number: supplierPhone,
      email: supplierEmail,
      address: supplierAddress,
    };

    if (supplierType === "electric") {
      axios
        .post(`${apiLocation}/electric-supplier-add/`, data)
        .then((response) => {
          setSupplierUploadSuccess(true);
          setShowSupplierMessage(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    if (supplierType === "gas") {
      axios
        .post(`${apiLocation}/gas-supplier-add/`, data)
        .then((response) => {
          setSupplierUploadSuccess(true);
          setShowSupplierMessage(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    if (supplierType === "water") {
      axios
        .post(`${apiLocation}/water-supplier-add/`, data)
        .then((response) => {
          setSupplierUploadSuccess(true);
          setShowSupplierMessage(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    if (supplierType === "trade") {
      axios
        .post(`${apiLocation}/trade-supplier-add/`, data)
        .then((response) => {
          setSupplierUploadSuccess(true);
          setShowSupplierMessage(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    setSupplierType("");
    setSupplierName("");
    setSupplierPhone("");
    setSupplierEmail("");
    setSupplierAddress("")

    getSuppliers();
  }

  function handleSupplierDelete() {
    if (supplierType === "electric") {
      axios
        .delete(`${apiLocation}/electric-supplier-delete/${supplierId}`)
        .then((response) => {
          setSupplierEditUploadSuccess(true);
          setShowSupplierEditMessage(true);
          getSuppliers();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    if (supplierType === "gas") {
      axios
        .delete(`${apiLocation}/gas-supplier-delete/${supplierId}`)
        .then((response) => {
          setSupplierEditUploadSuccess(true);
          setShowSupplierEditMessage(true);
          getSuppliers();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    if (supplierType === "water") {
      axios
        .delete(`${apiLocation}/water-supplier-delete/${supplierId}`)
        .then((response) => {
          setSupplierEditUploadSuccess(true);
          setShowSupplierEditMessage(true);
          getSuppliers();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    if (supplierType === "trade") {
      axios
        .delete(`${apiLocation}/trade-supplier-delete/${supplierId}`)
        .then((response) => {
          setSupplierEditUploadSuccess(true);
          setShowSupplierEditMessage(true);
          getSuppliers();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    setSupplierType("");
    setSelectedSupplier("")
    setSupplierName("");
    setSupplierPhone("");
    setSupplierEmail("");
    setSupplierAddress("")
  }

  function handleSupplierEdit() {
    const data = {
      id: supplierId,
      name: supplierName,
      phone_number: supplierPhone,
      email: supplierEmail,
      address: supplierAddress,
    };

    if (supplierType === "electric") {
      axios
        .put(`${apiLocation}/electric-supplier-edit/${supplierId}`, data)
        .then((response) => {
          setSupplierEditUploadSuccess(true);
          setShowSupplierEditMessage(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    if (supplierType === "gas") {
      axios
        .put(`${apiLocation}/gas-supplier-edit/${supplierId}`, data)
        .then((response) => {
          setSupplierEditUploadSuccess(true);
          setShowSupplierEditMessage(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    if (supplierType === "water") {
      axios
        .put(`${apiLocation}/water-supplier-edit/${supplierId}`, data)
        .then((response) => {
          setSupplierEditUploadSuccess(true);
          setShowSupplierEditMessage(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    if (supplierType === "trade") {
      axios
        .put(`${apiLocation}/trade-supplier-edit/${supplierId}`, data)
        .then((response) => {
          setSupplierEditUploadSuccess(true);
          setShowSupplierEditMessage(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    setSupplierType("");
    setSelectedSupplier("")
    setSupplierName("");
    setSupplierPhone("");
    setSupplierEmail("");
    setSupplierAddress("")

    getSuppliers();
  }

  function handleDsAdd() {
    const data = {
      scheme_name: dsName,
      scheme_contact_number: dsPhone,
      scheme_email: dsEmail,
      scheme_address: dsAddress,
    };

    axios
      .post(`${apiLocation}/deposit-scheme-add/`, data)
      .then((response) => {
        setDsUploadSuccess(true);
        setShowDsMessage(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setDsName("");
    setDsPhone("");
    setDsEmail("");
    setDsAddress("")

    getDepositSchemes();
  }

  function handleDsDelete(){
    axios
      .delete(`${apiLocation}/deposit-scheme-delete/${dsId}`)
      .then((response) => {
        setDsEditUploadSuccess(true);
        setShowDsEditMessage(true);
        getDepositSchemes();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      setSelectedDs("")
      setDsName("");
      setDsPhone("");
      setDsEmail("");
      setDsAddress("")
  }

  function handleDsEdit() {
    const data = {
      id: dsId,
      scheme_name: dsName,
      scheme_contact_number: dsPhone,
      scheme_email: dsEmail,
      scheme_address: dsAddress,
    };

    axios
      .put(`${apiLocation}/deposit-scheme-edit/${dsId}`, data)
      .then((response) => {
        setDsEditUploadSuccess(true);
        setShowDsEditMessage(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setSelectedDs("")
    setDsName("");
    setDsPhone("");
    setDsEmail("");
    setDsAddress("")

    getDepositSchemes();
  }

  function handleAgentAdd() {
    const data = {
      name: agentName,
      phone_number: agentPhone,
      email: agentEmail,
      address: agentAddress,
    };

    axios
      .post(`${apiLocation}/agent-add/`, data)
      .then((response) => {
        setAgentUploadSuccess(true);
        setShowAgentMessage(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setAgentName("");
    setAgentPhone("");
    setAgentEmail("");
    setAgentAddress("");

    getAgentList();
  }

  function handleAgentDelete(){
    axios
      .delete(`${apiLocation}/agent-delete/${agentId}`)
      .then((response) => {
        setAgentEditUploadSuccess(true);
        setShowAgentEditMessage(true);
        getAgentList();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      setSelectedAgent("")
      setAgentName("");
      setAgentPhone("");
      setAgentEmail("");
      setAgentAddress("");
  }

  function handleAgentEdit() {
    const data = {
      id: agentId,
      name: agentName,
      phone_number: agentPhone,
      email: agentEmail,
      address: agentAddress,
    };

    axios
      .put(`${apiLocation}/agent-edit/${agentId}`, data)
      .then((response) => {
        setAgentEditUploadSuccess(true);
        setShowAgentEditMessage(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setSelectedAgent("")
    setAgentName("");
    setAgentPhone("");
    setAgentEmail("");
    setAgentAddress("");

    getAgentList();
  }

  function handleContractorAdd() {
    const data = {
      name: cName,
      address: cAddress,
      phone_number: cPhone,
      email: cEmail,
      bank_sort_code: cSortCode,
      bank_account_number: cBankAccount,
    };

    axios
      .post(`${apiLocation}/contractor-add/`, data)
      .then((response) => {
        setContractorUploadSuccess(true);
        setShowContractorMessage(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setCName("");
    setCaddress("");
    setCphone("");
    setCEmail("");
    setCSortCode("");
    setCBankAccount("");

    getContractorList();
  }

  function handleContractorDelete(){
    axios
      .delete(`${apiLocation}/contractor-delete/${contractorId}`)
      .then((response) => {
        setContractorEditUploadSuccess(true);
        setShowContractorEditMessage(true);
        getContractorList();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      setSelectedContractor("")
      setCName("");
      setCaddress("");
      setCphone("");
      setCEmail("");
      setCSortCode("");
      setCBankAccount("");
  }

  function handleContractorEdit() {
    const data = {
      id: contractorId,
      name: cName,
      address: cAddress,
      phone_number: cPhone,
      email: cEmail,
      bank_sort_code: cSortCode,
      bank_account_number: cBankAccount,
    };

    axios
      .put(`${apiLocation}/contractor-edit/${contractorId}`, data)
      .then((response) => {
        setContractorEditUploadSuccess(true);
        setShowContractorEditMessage(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setSelectedContractor("")
    setCName("");
    setCaddress("");
    setCphone("");
    setCEmail("");
    setCSortCode("");
    setCBankAccount("");

    getContractorList();
  }

  return (
    <>
      <IcPageHeader heading={`Settings for ${currentUser}`}>
        <IcButton
          slot="actions"
          variant="tertiary"
          href="https://www.dropbox.com/scl/fo/17x91s79g72ycsd0hrlq9/AHK2D_Z35LEqEtN6Q-N6_AQ?rlkey=j7e7u7jdsw4losxudwcn2rzy6&dl=0"
          target="_blank"
        >
          <HelpOutlined slot="left-icon" /> User Guide
        </IcButton>
        <IcButton
          slot="actions"
          variant="tertiary"
          href="https://www.dropbox.com/scl/fo/98rb9am8clf6tbm86hm31/AM0h4BCGtCykPUCFYlfKINM?rlkey=ebuo40bw7jy04cpbhr4maqgqk&dl=0"
          target="_blank"
        >
          <Storage slot="left-icon" /> Cloud Storage
        </IcButton>
        <IcButton
          slot="actions"
          variant="tertiary"
          href={`${apiLocation}/admin/auth/`}
          target="_blank"
        >
          <AdminPanelSettingsOutlined slot="left-icon" /> Admin portal
        </IcButton>
        <IcButton
          slot="actions"
          variant="primary"
          onClick={() => handleLogout()}
        >
          <Logout slot="left-icon" /> Log Out
        </IcButton>
      </IcPageHeader>
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ paddingTop: 2 }}
      >
        <Grid item xs={12}>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ marginRight: 2 }}
            onClick={() => setSupplierModalOpen(true)}
          >
            Add Supplier
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ marginRight: 2 }}
            onClick={() => setDsModalOpen(true)}
          >
            Add Deposit Scheme
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ marginRight: 2 }}
            onClick={() => setAgentModalOpen(true)}
          >
            Add Agent
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ marginRight: 2 }}
            onClick={() => setContractorModalOpen(true)}
          >
            Add Contractor
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            sx={{ marginRight: 2 }}
            onClick={() => setSupplierEditModalOpen(true)}
          >
            Edit Supplier
          </Button>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            sx={{ marginRight: 2 }}
            onClick={() => setDsEditModalOpen(true)}
          >
            Edit Deposit Scheme
          </Button>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            sx={{ marginRight: 2 }}
            onClick={() => setAgentEditModalOpen(true)}
          >
            Edit Agent
          </Button>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            sx={{ marginRight: 2 }}
            onClick={() => setContractorEditModalOpen(true)}
          >
            Edit Contractor
          </Button>
        </Grid>
      </Grid>
      {/* Supplier Modal */}
      <Modal
        open={supplierModalOpen}
        onClose={() => setSupplierModalOpen(false)}
      >
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
            Add Supplier
          </Typography>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            <Grid item xs={6}>
              <TextField
                slot="input"
                labelId="demo-simple-select-label"
                variant="outlined"
                id="demo-simple-select"
                value={supplierType}
                label="Supplier Type (required)"
                select
                onChange={(e) => setSupplierType(e.target.value)}
                fullWidth
                color={supplierType === "" && "error"}
                sx={{ marginTop: 2 }}
              >
                <MenuItem value={"electric"}> Electric </MenuItem>
                <MenuItem value={"gas"}> Gas </MenuItem>
                <MenuItem value={"trade"}> Trade </MenuItem>
                <MenuItem value={"water"}> Water </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Supplier Name (required)"
                variant="outlined"
                fullWidth
                color={supplierName === "" && "error"}
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Supplier Email"
                variant="outlined"
                fullWidth
                value={supplierEmail}
                onChange={(e) => setSupplierEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Supplier Phone Number"
                variant="outlined"
                fullWidth
                value={supplierPhone}
                onChange={(e) => setSupplierPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Supplier Address"
                variant="outlined"
                fullWidth
                value={supplierAddress}
                onChange={(e) => setSupplierAddress(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<UploadOutlined />}
                disabled={
                  supplierType === "" ||
                  supplierName === ""
                }
                onClick={() => handleSupplierAdd()}
              >
                Upload Supplier
              </Button>
            </Grid>
            {showSupplierMessage && (
              <Grid item xs={12}>
                {supplierUploadSucess ? (
                  <StaticAlert
                    type="success"
                    message="New supplier successfully uploaded"
                  />
                ) : (
                  <StaticAlert
                    type="error"
                    message="An error occurred when uploading supplier, supplier upload failed"
                  />
                )}
              </Grid>
            )}
          </Grid>
        </Box>
      </Modal>
      {/* Deposit scheme Modal */}
      <Modal open={dsModalOpen} onClose={() => setDsModalOpen(false)}>
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
            Add Deposit Scheme
          </Typography>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Scheme Name (required)"
                variant="outlined"
                fullWidth
                color={dsName === "" && "error"}
                value={dsName}
                onChange={(e) => setDsName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Scheme Phone Number"
                variant="outlined"
                fullWidth
                value={dsPhone}
                onChange={(e) => setDsPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Scheme Email"
                variant="outlined"
                fullWidth
                value={dsEmail}
                onChange={(e) => setDsEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Scheme Address"
                variant="outlined"
                fullWidth
                value={dsAddress}
                onChange={(e) => setDsAddress(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<UploadOutlined />}
                disabled={dsName === ""}
                onClick={() => handleDsAdd()}
              >
                Upload Deposit Scheme
              </Button>
            </Grid>
            {showDsMessage && (
              <Grid item xs={12}>
                {dsUploadSucess ? (
                  <StaticAlert
                    type="success"
                    message="New deposit scheme successfully uploaded"
                  />
                ) : (
                  <StaticAlert
                    type="error"
                    message="An error occurred when uploading deposit scheme, deposit scheme upload failed"
                  />
                )}
              </Grid>
            )}
          </Grid>
        </Box>
      </Modal>
      {/* Agent Modal */}
      <Modal open={agentModalOpen} onClose={() => setAgentModalOpen(false)}>
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
            Add Agent
          </Typography>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Agent Name (required)"
                variant="outlined"
                fullWidth
                color={agentName === "" && "error"}
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Agent Phone Number"
                variant="outlined"
                fullWidth
                value={agentPhone}
                onChange={(e) => setAgentPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Agent Email Address"
                variant="outlined"
                fullWidth
                value={agentEmail}
                onChange={(e) => setAgentEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Agent Address"
                variant="outlined"
                fullWidth
                value={agentAddress}
                onChange={(e) => setAgentAddress(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<UploadOutlined />}
                disabled={
                  agentName === ""
                }
                onClick={() => handleAgentAdd()}
              >
                Upload Agent
              </Button>
            </Grid>
            {showAgentMessage && (
              <Grid item xs={12}>
                {agentUploadSucess ? (
                  <StaticAlert
                    type="success"
                    message="New agent successfully uploaded"
                  />
                ) : (
                  <StaticAlert
                    type="error"
                    message="An error occurred when uploading agent, agent upload failed"
                  />
                )}
              </Grid>
            )}
          </Grid>
        </Box>
      </Modal>
      {/* Contractor Modal */}
      <Modal
        open={contractorModalOpen}
        onClose={() => setContractorModalOpen(false)}
      >
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
            Add Contractor
          </Typography>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Contractor Name (required)"
                variant="outlined"
                fullWidth
                color={cName === "" && "error"}
                value={cName}
                onChange={(e) => setCName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Contractor Address"
                variant="outlined"
                fullWidth
                value={cAddress}
                onChange={(e) => setCaddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Contractor Phone Number"
                variant="outlined"
                fullWidth
                value={cPhone}
                onChange={(e) => setCphone(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Contractor Email Address"
                variant="outlined"
                fullWidth
                value={cEmail}
                onChange={(e) => setCEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Contractor Sort Code"
                variant="outlined"
                fullWidth
                value={cSortCode}
                onChange={(e) => setCSortCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Contractor Bank Account Number"
                variant="outlined"
                fullWidth
                value={cBankAccount}
                onChange={(e) => setCBankAccount(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<UploadOutlined />}
                disabled={cName === ""}
                onClick={() => handleContractorAdd()}
              >
                Upload Contractor
              </Button>
            </Grid>
            {showContractorMessage && (
              <Grid item xs={12}>
                {contractorUploadSucess ? (
                  <StaticAlert
                    type="success"
                    message="New agent successfully uploaded"
                  />
                ) : (
                  <StaticAlert
                    type="error"
                    message="An error occurred when uploading agent, agent upload failed"
                  />
                )}
              </Grid>
            )}
          </Grid>
        </Box>
      </Modal>

      {/* Supplier edit Modal */}
      <Modal
        open={supplierEditModalOpen}
        onClose={() => setSupplierEditModalOpen(false)}
      >
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
            Edit Supplier
          </Typography>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            <Grid item xs={6}>
              <TextField
                slot="input"
                labelId="demo-simple-select-label"
                variant="outlined"
                id="demo-simple-select"
                value={supplierType}
                label="Supplier Type"
                select
                onChange={(e) => setSupplierType(e.target.value)}
                fullWidth
                color={supplierType === "" && "error"}
                sx={{ marginTop: 2 }}
              >
                <MenuItem value={"electric"}> Electric </MenuItem>
                <MenuItem value={"gas"}> Gas </MenuItem>
                <MenuItem value={"trade"}> Trade </MenuItem>
                <MenuItem value={"water"}> Water </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                slot="input"
                labelId="demo-simple-select-label"
                variant="outlined"
                id="demo-simple-select"
                value={selectedSupplier}
                label="Supplier"
                select
                onChange={(e) => setSelectedSupplier(e.target.value)}
                fullWidth
                color={selectedSupplier === "" && "error"}
                sx={{ marginTop: 2 }}
              >
                {supplierType === "gas" &&
                  gasSupplierOptions
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((data) => (
                    <MenuItem key={data.id} value={data.name}>
                      {data.name}
                    </MenuItem>
                  ))}
                {supplierType === "electric" &&
                  electricSupplierOptions
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((data) => (
                    <MenuItem key={data.id} value={data.name}>
                      {data.name}
                    </MenuItem>
                  ))}
                {supplierType === "water" &&
                  waterSupplierOptions
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((data) => (
                    <MenuItem key={data.id} value={data.name}>
                      {data.name}
                    </MenuItem>
                  ))}
                {supplierType === "trade" &&
                  tradeSupplierOptions
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((data) => (
                    <MenuItem key={data.id} value={data.name}>
                      {data.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Supplier Name (required)"
                variant="outlined"
                fullWidth
                color={supplierName === "" && "error"}
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Supplier Email"
                variant="outlined"
                fullWidth
                value={supplierEmail}
                onChange={(e) => setSupplierEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Supplier Phone Number"
                variant="outlined"
                fullWidth
                value={supplierPhone}
                onChange={(e) => setSupplierPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Supplier Address"
                variant="outlined"
                fullWidth
                value={supplierAddress}
                onChange={(e) => setSupplierAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                startIcon={<UploadOutlined />}
                disabled={
                  supplierType === "" ||
                  supplierName === ""
                }
                onClick={() => handleSupplierEdit()}
              >
                Upload Edited Supplier
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                startIcon={<Delete />}
                color="error"
                disabled={
                  selectedSupplier === ""
                }
                onClick={() => handleSupplierDelete()}
              >
                Delete Supplier
              </Button>
            </Grid>
            {showSupplierEditMessage && (
              <Grid item xs={12}>
                {supplierEditUploadSucess ? (
                  <StaticAlert
                    type="success"
                    message="Supplier successfully edited/deleted"
                  />
                ) : (
                  <StaticAlert
                    type="error"
                    message="An error occurred when editing supplier, supplier edit failed"
                  />
                )}
              </Grid>
            )}
          </Grid>
        </Box>
      </Modal>
      {/* Deposit scheme edit Modal */}
      <Modal open={dsEditModalOpen} onClose={() => setDsEditModalOpen(false)}>
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
            Edit Deposit Scheme
          </Typography>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Selected Deposit Scheme"
                variant="outlined"
                fullWidth
                select
                color={selectedDs === "" && "error"}
                value={selectedDs}
                onChange={(e) => setSelectedDs(e.target.value)}
              >
                {dsOptions
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((data) => (
                  <MenuItem key={data.id} value={data.name}>
                    {data.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Scheme Name (required)"
                variant="outlined"
                fullWidth
                color={dsName === "" && "error"}
                value={dsName}
                onChange={(e) => setDsName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Scheme Phone Number"
                variant="outlined"
                fullWidth
                value={dsPhone}
                onChange={(e) => setDsPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Scheme Email"
                variant="outlined"
                fullWidth
                value={dsEmail}
                onChange={(e) => setDsEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Scheme Address"
                variant="outlined"
                fullWidth
                value={dsAddress}
                onChange={(e) => setDsAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                startIcon={<UploadOutlined />}
                disabled={dsName === ""}
                onClick={() => handleDsEdit()}
              >
                Upload Edited Deposit Scheme
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                startIcon={<Delete />}
                color="error"
                disabled={
                  selectedDs === ""
                }
                onClick={() => handleDsDelete()}
              >
                Delete Deposit Scheme
              </Button>
            </Grid>
            {showDsEditMessage && (
              <Grid item xs={12}>
                {dsEditUploadSucess ? (
                  <StaticAlert
                    type="success"
                    message="Deposit scheme successfully edited/deleted"
                  />
                ) : (
                  <StaticAlert
                    type="error"
                    message="An error occurred when uploading deposit scheme, deposit scheme upload failed"
                  />
                )}
              </Grid>
            )}
          </Grid>
        </Box>
      </Modal>
      {/* Agent Edit Modal */}
      <Modal
        open={agentEditModalOpen}
        onClose={() => setAgentEditModalOpen(false)}
      >
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
            Edit Agent
          </Typography>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Selected Agent"
                variant="outlined"
                fullWidth
                select
                color={selectedAgent === "" && "error"}
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
              >
                {agentOptions
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((data) => (
                  <MenuItem key={data.id} value={data.name}>
                    {data.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Agent Name (required)"
                variant="outlined"
                fullWidth
                color={agentName === "" && "error"}
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Agent Phone Number"
                variant="outlined"
                fullWidth
                value={agentPhone}
                onChange={(e) => setAgentPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Agent Email Address"
                variant="outlined"
                fullWidth
                value={agentEmail}
                onChange={(e) => setAgentEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Agent Address"
                variant="outlined"
                fullWidth
                value={agentAddress}
                onChange={(e) => setAgentAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                startIcon={<UploadOutlined />}
                disabled={agentName === ""}
                onClick={() => handleAgentEdit()}
              >
                Upload Edited Agent
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                startIcon={<Delete />}
                color="error"
                disabled={
                  selectedAgent === ""
                }
                onClick={() => handleAgentDelete()}
              >
                Delete Agent
              </Button>
            </Grid>
            {showAgentEditMessage && (
              <Grid item xs={12}>
                {agentEditUploadSucess ? (
                  <StaticAlert
                    type="success"
                    message="Agent successfully edited/deleted"
                  />
                ) : (
                  <StaticAlert
                    type="error"
                    message="An error occurred when editing agent, agent edit failed"
                  />
                )}
              </Grid>
            )}
          </Grid>
        </Box>
      </Modal>
      {/* Contractor Edit Modal */}
      <Modal
        open={contractorEditModalOpen}
        onClose={() => setContractorEditModalOpen(false)}
      >
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
            Edit Contractor
          </Typography>
          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Selected Contractor"
                variant="outlined"
                fullWidth
                select
                color={selectedContractor === "" && "error"}
                value={selectedContractor}
                onChange={(e) => setSelectedContractor(e.target.value)}
              >
                {contractorOptions
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((data) => (
                  <MenuItem key={data.id} value={data.name}>
                    {data.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Contractor Name (required)"
                variant="outlined"
                fullWidth
                color={cName === "" && "error"}
                value={cName}
                onChange={(e) => setCName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Contractor Address"
                variant="outlined"
                fullWidth
                value={cAddress}
                onChange={(e) => setCaddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Contractor Phone Number"
                variant="outlined"
                fullWidth
                value={cPhone}
                onChange={(e) => setCphone(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Contractor Email Address"
                variant="outlined"
                fullWidth
                value={cEmail}
                onChange={(e) => setCEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Contractor Sort Code"
                variant="outlined"
                fullWidth
                value={cSortCode}
                onChange={(e) => setCSortCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Contractor Bank Account Number"
                variant="outlined"
                fullWidth
                value={cBankAccount}
                onChange={(e) => setCBankAccount(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                startIcon={<UploadOutlined />}
                disabled={cName === ""}
                onClick={() => handleContractorEdit()}
              >
                Upload Edited Contractor
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                startIcon={<Delete />}
                color="error"
                disabled={
                  selectedContractor === ""
                }
                onClick={() => handleContractorDelete()}
              >
                Delete Contractor
              </Button>
            </Grid>
            {showContractorEditMessage && (
              <Grid item xs={12}>
                {contractorEditUploadSucess ? (
                  <StaticAlert
                    type="success"
                    message="Contractor successfully edited/deleted"
                  />
                ) : (
                  <StaticAlert
                    type="error"
                    message="An error occurred when editing contractor, contractor edit failed"
                  />
                )}
              </Grid>
            )}
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
