"use client";

import { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js/auto";

import Header from "@/components/layout/Header";
import ScatterPlot from "@/components/graphs/ScatterPlot";
import Modal from "@/components/modal/Modal";
import { Data } from "@/types/Data";
import { handleFileUpload } from "@/services/utils/handleFileUpload";

Chart.register(...registerables);
Chart.defaults.color = 'rgb(150, 150, 150)';

export default function Home() {
  const [data, setData] = useState<Data[]>([]);
  const [variables, setVariables] = useState<string[]>([]);
  const [renderedVariables, setRenderedVariables] = useState<string[]>([]);
  const [DV, setDV] = useState<string | null>(null);
  const [IVs, setIVs] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const header = document.getElementById("headerWrapper");
    const main = document.getElementById("main");
    const variableColumn = document.getElementById("variableColumn");

    if (header && main && variableColumn) {
      const headerHeight = header.offsetHeight;
      const calculatedHeight = `calc(98vh - ${headerHeight}px)`;

      main.style.height = calculatedHeight;
      variableColumn.style.height = calculatedHeight;
    }
  }, []);

  useEffect(() => {
    setRenderedVariables(variables);
  }, [variables])

  const handleUpload = (e: any) => {
    handleFileUpload(e, setData, setVariables);
  };

  const handleSelectDV = (variable: string) => {
    setDV(variable);
    setIsModalOpen(false);
  };

  const addIV = (iv: string) => {
    if (!IVs.includes(iv)) {
      setIVs([...IVs, iv]);
    }
  };

  const removeIV = (iv: string) => {
    setIVs(IVs.filter(item => item !== iv));
  };

  const handleSearchChange = (query: string) => {
    const validQuery = query.trim().toLowerCase();
    if (validQuery === '' || validQuery.length <= 0) {
      setRenderedVariables(variables)
    } else {
      const filtered = variables.filter((variable) =>
        variable.toLowerCase().includes(validQuery)
      );
      setRenderedVariables(filtered);
    }
  };

  return (
    <div className="h-screen">
      <div id="headerWrapper">
        <Header onFileUpload={handleUpload} onOpenModal={() => setIsModalOpen(true)} selectedDV={DV} />
      </div>
      <main id="main" className="app-container">

        {isModalOpen && (
          <Modal
            variables={variables}
            onSelect={handleSelectDV}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        <div className="grid grid-cols-11 relative gap-8">

          {/* IDEPENDANT VARIABLE LIST */}
          <div id="variableColumn" className="sticky top-2 h-full col-span-3 border-neutral-800 border px-4 py-2 rounded-lg bg-neutral-800 overflow-y-scroll no-scrollbar">
            <p className="text-center text-xl">Variables</p>

            <div className="flex justify-between">
              <input type="text" placeholder="Search.." onChange={(e) => handleSearchChange(e.target.value)}
                className="px-4 py-1 rounded-lg text-neutral-50 border-none outline-none"
                style={{ backgroundColor: 'hsl(0 0% 18%)' }} />
              <button onClick={() => { setIVs([]) }}>Clear All</button>
            </div>


            {renderedVariables.map((col: any) => (
              <div key={col} className="cursor-pointer flex justify-between items-center my-4">
                <p className="text-sm">{col}</p>
                <div className="flex gap-2">
                  <button onClick={() => addIV(col)}>+</button>
                  <button
                    onClick={() => removeIV(col)}
                    style={{ backgroundColor: IVs.includes(col) ? 'hsl(0 0% 50%)' : '' }}
                  >
                    {IVs.includes(col) ? 'x' : '-'}
                  </button>
                </div>
              </div>
            ))}


          </div>

          {/* GRAPHS */}
          <div className="col-span-8">
            <div className="grid grid-cols-2 gap-x-8">
              {IVs.map(iv => (
                <ScatterPlot key={iv} DV={DV!} IV={iv} data={data.map(item => ({ x: item[DV!], y: item[iv] }))} />
              ))}
            </div>

          </div>
        </div>


      </main>
    </div>
  );
}