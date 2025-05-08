import React, { useState, useRef, useEffect } from "react";
import CarData from "./components/CarData";
import { Column, Row } from "../../style";
import { RaceCar } from "../../dto";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";

export interface CarDimensions {
  width: number;
  height: number;
}

export interface GroupCounts {
  carrozzeria: number;
  vetro: number;
  gomme: number;
  gommeLeft: number; // Nuovo: pixel della gomma sinistra
  gommeRight: number; // Nuovo: pixel della gomma destra
}

export interface AdditionalMetrics {
  carrozzeriaDistanceFromGround: number;
  wheelbase: number;
  centerOfMassHeight: number;
  aerodynamicCoefficient: number;
}

const CarUploader: React.FC<{
  setCarData: React.Dispatch<React.SetStateAction<RaceCar | null>>;
}> = ({ setCarData }) => {
  const [dimensions, setDimensions] = useState<CarDimensions | null>(null);
  const [groupCounts, setGroupCounts] = useState<GroupCounts>({
    carrozzeria: 0,
    vetro: 0,
    gomme: 0,
    gommeLeft: 0,
    gommeRight: 0,
  });
  const [additionalMetrics, setAdditionalMetrics] =
    useState<AdditionalMetrics | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [carImg, setCarImg] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const vetroColors = new Set(["#d8fdfe", "#a7e2e4"]);
  const gommeColors = new Set(["#000", "#2d2b2b", "#504e4e"]);

  const componentToHex = (c: number): string => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const rgbaToHex = (r: number, g: number, b: number, a: number): string => {
    if (a === 255) {
      return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    } else {
      return (
        "#" +
        componentToHex(r) +
        componentToHex(g) +
        componentToHex(b) +
        componentToHex(a)
      );
    }
  };

  const normalizeHex = (hex: string): string => {
    const lowerHex = hex.toLowerCase();
    return lowerHex === "#000000" ? "#000" : lowerHex;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const dataUrl = canvas.toDataURL("image/png");
        setCarImg(dataUrl);

        let minX = canvas.width;
        let maxX = 0;
        let minY = canvas.height;
        let maxY = 0;
        let sumCarrozzeriaY = 0;
        const frontEdge = new Array<number>(canvas.height).fill(-1);

        const leftWheelX: number[] = [];
        const rightWheelX: number[] = [];

        let counts: GroupCounts = {
          carrozzeria: 0,
          vetro: 0,
          gomme: 0,
          gommeLeft: 0,
          gommeRight: 0,
        };

        let frontCarrozzeriaPixels = 0;
        let backCarrozzeriaPixels = 0;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          if (a === 0) continue;

          const hexColor = normalizeHex(rgbaToHex(r, g, b, a));
          const pixelIndex = i / 4;
          const x = pixelIndex % canvas.width;
          const y = Math.floor(pixelIndex / canvas.width);

          if (gommeColors.has(hexColor)) {
            counts.gomme++;
            if (x < canvas.width / 2) {
              counts.gommeLeft++; // incremento gomma sinistra
              leftWheelX.push(x);
            } else {
              counts.gommeRight++; // incremento gomma destra
              rightWheelX.push(x);
            }
          } else if (vetroColors.has(hexColor)) {
            counts.vetro++;
          } else {
            counts.carrozzeria++;
            sumCarrozzeriaY += y;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
            frontEdge[y] = Math.max(frontEdge[y], x);

            if (x < canvas.width / 2) {
              backCarrozzeriaPixels++;
            } else {
              frontCarrozzeriaPixels++;
            }
          }
        }

        setGroupCounts(counts);

        if (minX > maxX || minY === canvas.height) {
          setDimensions({ width: 0, height: 0 });
        } else {
          const width = maxX - minX;
          const height = canvas.height - minY;
          setDimensions({ width, height });
        }

        const carrozzeriaDistanceFromGround = canvas.height - maxY;

        let wheelbase = 0;
        const average = (arr: number[]) =>
          arr.reduce((acc, val) => acc + val, 0) / arr.length;
        if (leftWheelX.length > 0 && rightWheelX.length > 0) {
          const leftCenter = average(leftWheelX);
          const rightCenter = average(rightWheelX);
          wheelbase = Math.abs(rightCenter - leftCenter);
        }

        let centerOfMassHeight = 0;
        if (counts.carrozzeria > 0) {
          const avgY = sumCarrozzeriaY / counts.carrozzeria;
          centerOfMassHeight = canvas.height - avgY;
        }

        const slopes: number[] = [];
        for (let y = minY; y < maxY; y++) {
          if (frontEdge[y] !== -1 && frontEdge[y + 1] !== -1) {
            slopes.push(Math.abs(frontEdge[y + 1] - frontEdge[y]));
          }
        }
        const avgSlope =
          slopes.length > 0
            ? slopes.reduce((acc, v) => acc + v, 0) / slopes.length
            : 0;
        let aerodynamicCoefficient = 0.35;
        if (avgSlope <= 1) {
          aerodynamicCoefficient = 0.35;
        } else if (avgSlope >= 5) {
          aerodynamicCoefficient = 0.25;
        } else {
          aerodynamicCoefficient = 0.35 - ((avgSlope - 1) * 0.1) / 4;
        }

        setAdditionalMetrics({
          carrozzeriaDistanceFromGround,
          wheelbase,
          centerOfMassHeight,
          aerodynamicCoefficient,
        });

        const total = frontCarrozzeriaPixels + backCarrozzeriaPixels;
        if (total > 0) {
          const balanceValue = backCarrozzeriaPixels / frontCarrozzeriaPixels;
          setBalance(balanceValue);
        } else {
          setBalance(null);
        }
      };

      if (event.target && typeof event.target.result === "string") {
        img.src = event.target.result;
      }
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    setWeight(
      groupCounts.carrozzeria * 3 +
        groupCounts.vetro * 0.5 +
        groupCounts.gomme * 2
    );
  }, [groupCounts]);

  return (
    <div>
      <Row sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <h4>Calcolo dimensioni, conteggio pixel e metriche aggiuntive</h4>
        <Link
          to="/carInfo"
          target="_blank"
          style={{ textDecoration: "none", marginLeft: 10, color: "blue" }}
        >
          <InfoIcon />
        </Link>
      </Row>
      <Column>
        <input type="file" accept="image/png" onChange={handleImageUpload} />
        <canvas ref={canvasRef} style={{ display: "none" }} />
        {carImg && (
          <img
            src={carImg}
            alt={`Car image`}
            style={{ width: 160, height: 80 }}
          />
        )}
      </Column>

      {dimensions && additionalMetrics && weight && balance && carImg && (
        <CarData
          dimensions={dimensions}
          additionalMetrics={additionalMetrics}
          balance={balance}
          groupCounts={groupCounts}
          weight={weight}
          carImg={carImg}
          setCarData={setCarData}
        />
      )}
    </div>
  );
};

export default CarUploader;
