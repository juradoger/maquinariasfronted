import React, { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";

const getAxisYDomain = (from, to, ref, offset, data) => {
  const refData = data.slice(from - 1, to);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];
  refData.forEach((d) => {
    if (d[ref] > top) top = d[ref];
    if (d[ref] < bottom) bottom = d[ref];
  });
  return [(bottom | 0) - offset, (top | 0) + offset];
};

const Grafico = ({ initialData }) => {
  console.log(initialData);
  const [data, setData] = useState(initialData);
  const [left, setLeft] = useState("dataMin");
  const [right, setRight] = useState("dataMax");
  const [refAreaLeft, setRefAreaLeft] = useState("");
  const [refAreaRight, setRefAreaRight] = useState("");
  const [top, setTop] = useState("dataMax+1");
  const [bottom, setBottom] = useState("dataMin-1");
  const [top2, setTop2] = useState("dataMax+20");
  const [bottom2, setBottom2] = useState("dataMin-20");

  const zoom = () => {
    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      setRefAreaLeft("");
      setRefAreaRight("");
      return;
    }

    let newRefAreaLeft = refAreaLeft;
    let newRefAreaRight = refAreaRight;
    if (newRefAreaLeft > newRefAreaRight)
      [newRefAreaLeft, newRefAreaRight] = [newRefAreaRight, newRefAreaLeft];

    const [newBottom, newTop] = getAxisYDomain(
      newRefAreaLeft,
      newRefAreaRight,
      "ganancia",
      1,
      initialData
    );
    const [newBottom2, newTop2] = getAxisYDomain(
      newRefAreaLeft,
      newRefAreaRight,
      "perdida",
      50,
      initialData
    );

    setRefAreaLeft("");
    setRefAreaRight("");
    setData(initialData.slice());
    setLeft(newRefAreaLeft);
    setRight(newRefAreaRight);
    setBottom(newBottom);
    setTop(newTop);
    setBottom2(newBottom2);
    setTop2(newTop2);
  };

  const zoomOut = () => {
    setData(initialData.slice());
    setRefAreaLeft("");
    setRefAreaRight("");
    setLeft("dataMin");
    setRight("dataMax");
    setTop("dataMax+1");
    setBottom("dataMin");
    setTop2("dataMax+50");
    setBottom2("dataMin+50");
  };

  return (
    <div
      className="highlight-bar-charts"
      style={{ userSelect: "none", width: "100%" }}
    >
      <button
        type="button"
        className="btn btn-warning update"
        onClick={zoomOut}
      >
        Zoom
      </button>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          onMouseDown={(e) => setRefAreaLeft(e.activeLabel)}
          onMouseMove={(e) => refAreaLeft && setRefAreaRight(e.activeLabel)}
          onMouseUp={zoom}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            dataKey="name"
            domain={[left, right]}
            type="category"
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
          />
          <YAxis
            orientation="right"
            allowDataOverflow
            domain={[bottom2, top2]}
            type="number"
            yAxisId="2"
          />
          <Tooltip />
          <Line
            yAxisId="1"
            type="natural"
            dataKey="ganancia"
            stroke="#00ff00"
            strokeWidth={3}
            animationDuration={300}
          />
          <Line
            yAxisId="2"
            type="natural"
            dataKey="perdida"
            stroke="#ff0000"
            strokeWidth={3}
            animationDuration={300}
          />

          {refAreaLeft && refAreaRight ? (
            <ReferenceArea
              yAxisId="1"
              x1={refAreaLeft}
              x2={refAreaRight}
              strokeOpacity={0.3}
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Grafico;
