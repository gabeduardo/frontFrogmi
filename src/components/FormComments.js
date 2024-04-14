import React, { useState, useEffect } from "react";
import UILisFeatures from "./UIListFeatures";
import UISelect from "./UISelect";
import fetchDataFeatures from "../utils/fetchDataFeatures";
import { Button, TextField, Pagination, Modal, Alert } from "@mui/material";
import axios from "axios";
import styles from "./FormComments.module.css";

function FormComments({ handleClose, setSuccess, setError }) {
  const [featureId, setFeatureId] = useState();
  const [comment, setComment] = useState("");

  const handleFeatureId = (event) => {
    const {
      target: { value },
    } = event;
    setFeatureId(parseInt(value));
  };

  const handleComment = (event) => {
    const {
      target: { value },
    } = event;
    setComment(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      feature_id: featureId,
      body: comment,
    };

    try {
      const response = await axios.post(
        `http://192.168.5.181:3000//api/features/${featureId}/comments`,
        formData
      );
      setSuccess("El comentario ha sido creado exitosamente");
    } catch (response) {
      const {
        data: { error },
      } = response.response;
      setError(error);
    }
    handleClose();
  };

  return (
    <div className={styles.form}>
      <TextField
        label="Feature Id"
        type="number"
        variant="outlined"
        onChange={handleFeatureId}
      />
      <TextField
        label="Comentario"
        type="string"
        variant="outlined"
        onChange={handleComment}
      />

      <Button onClick={handleSubmit} variant="contained">
        Añadir Comentario
      </Button>
    </div>
  );
}

export default FormComments;
