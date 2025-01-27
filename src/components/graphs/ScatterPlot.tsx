import React from "react";
import { Scatter } from "react-chartjs-2";

interface ScatterPlotProps {
  DV: string;
  IV: string;
  data: { x: number; y: number }[];
  darkMode: boolean;
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({ DV, IV, data, darkMode }) => {
  const scatterData = {
    datasets: [
      {
        label: `${IV}`,
        data: data,
        backgroundColor: darkMode ? 'rgb(243, 122, 55)' : 'rgb(20, 147, 162)',
        borderColor: darkMode ? 'rgb(243, 122, 55)' : 'rgb(20, 147, 162)'
        // backgroundColor: 'rgb(20, 147, 162)',
        // borderColor: 'rgb(20, 147, 162)'
      },
    ],
  };

  return (
    <div className="mb-8">
      <Scatter
        data={scatterData}
        options={{
          scales: {
            x: { title: { display: true, text: DV } },
            y: { title: { display: true, text: IV } },
          },
        }}
      />
    </div>
  );
};

export default ScatterPlot;
