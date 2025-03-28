import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

interface CarData {
  name: string;
  imageSrc: string; // base64 string per l’immagine
}

const CarForm: React.FC = () => {
  const [carName, setCarName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [savedCar, setSavedCar] = useState<CarData | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (carName && preview) {
      const carData: CarData = {
        name: carName,
        imageSrc: preview,
      };
      setSavedCar(carData);
      // reset form
      setCarName("");
      setImageFile(null);
      setPreview(null);
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Car Upload Form
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Car Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={carName}
          onChange={(e) => setCarName(e.target.value)}
          required
        />
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload Image
          <input
            type="file"
            accept="image/png, image/jpeg"
            hidden
            onChange={handleImageChange}
            required
          />
        </Button>

        {preview && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Image Preview:</Typography>
            <img
              src={preview}
              alt="Preview"
              style={{ width: "100%", maxHeight: 200, objectFit: "contain" }}
            />
          </Box>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Save Car
        </Button>
      </Box>

      {savedCar && (
        <Card sx={{ mt: 4 }}>
          <CardMedia
            component="img"
            height="200"
            image={savedCar.imageSrc}
            alt={savedCar.name}
          />
          <CardContent>
            <Typography variant="h6">{savedCar.name}</Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default CarForm;
