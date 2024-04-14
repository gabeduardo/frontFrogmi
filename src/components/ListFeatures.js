import React, { useState, useEffect } from "react";
import UILisFeatures from "./UIListFeatures";
import UISelect from "./UISelect";
import fetchDataFeatures from "../utils/fetchDataFeatures";
import {
  Button,
  TextField,
  Pagination,
  Dialog,
  CircularProgress,
  Alert,
} from "@mui/material";
import FormComments from "./FormComments";
import styles from "./FormComments.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";

function ListFeatures() {
  const [data, setData] = useState(null);
  const [apiUrl, setApiUrl] = useState(
    "http://192.168.5.181:3000//api/features?"
  );
  const [page, setPage] = useState(null);
  const [perPage, setPerPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useState(
    new URLSearchParams(window.location.search)
  );

  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formatParams = params
          .toString()
          .replaceAll("mag_type", "mag_type[]");
        const finalURL = `${apiUrl}${formatParams}`;
        const response = await fetchDataFeatures(finalURL);
        const { data, pagination } = response;
        setData(data);
        setPage(pagination.total);
        setPerPage(pagination.per_page);
        setCurrentPage(pagination.current_page);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params]);

  useEffect(() => {
    if (!success) return;
    const timerId = setTimeout(() => {
      setSuccess(false);
    }, [6000]);

    return () => clearTimeout(timerId);
  }, [success]);

  useEffect(() => {
    if (!error) return;
    const timerId = setTimeout(() => {
      setError(false);
    }, [6000]);

    return () => clearTimeout(timerId);
  }, [error]);

  const handlehangePagination = (event, page) => {
    const newParams = new URLSearchParams(params);
    newParams.set("page", page);
    setCurrentPage(page);
    setParams(newParams);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${newParams}`
    );

    // const apiUrlBase =  `http://192.168.5.181:3000//api/features?page=${page}&per_page=${perPage}`
    // setApiUrl(apiUrlBase)
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const perPage = parseInt(value);
    setPerPage(perPage);
  };

  const handleButton = () => {
    const newParams = new URLSearchParams(params);
    newParams.set("per_page", perPage);
    setParams(newParams);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${newParams}`
    );
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {data ? (
        <div className={styles["main-container"]}>
          <div className={styles["header"]}>Prueba Gabriel Medina</div>
          <div className={styles["filters-container"]}>
            <UISelect
              setParams={setParams}
              params={params}
              setCurrentPage={setCurrentPage}
            />
            <Button
              onClick={handleOpen}
              variant="contained"
              startIcon={<AddCircleIcon />}
            >
              Añadir Comentarios
            </Button>
          </div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className={styles.dialog}>
              <FormComments
                handleClose={handleClose}
                setSuccess={setSuccess}
                setError={setError}
              />
            </div>
          </Dialog>
          <UILisFeatures data={data} />
          <div className={styles["filters-main-filter"]}>
            <div className={styles["filters-per-page"]}>
              <TextField
                id="outlined-basic"
                label="Cantidad de items por página"
                type="number"
                variant="outlined"
                onChange={handleChange}
                size="small"
              />
              <Button
                onClick={handleButton}
                startIcon={<SearchIcon />}
                variant="contained"
              >
                Mostrar
              </Button>
            </div>
            <Pagination
              count={page}
              page={currentPage}
              onChange={handlehangePagination}
            />
          </div>
        </div>
      ) : (
        <CircularProgress />
      )}
      <div className={styles.alerts}>
        {success && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            {success}
          </Alert>
        )}
        {error && (
          <Alert icon={<ErrorIcon fontSize="inherit" />} severity="error">
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default ListFeatures;
