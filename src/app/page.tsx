"use client";

import { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js/auto";

import Header from "@/components/layout/Header";
import ScatterPlot from "@/components/graphs/ScatterPlot";
import Modal from "@/components/modal/Modal";
import { Data } from "@/types/Data";
import { handleFileUpload } from "@/services/utils/handleFileUpload";
import IconGeneral from "@/components/Icon/IconGeneral";

Chart.register(...registerables);
Chart.defaults.color = 'rgb(200, 200, 200)';
Chart.defaults.borderColor = 'rgb(50, 50, 50)';

export default function Home() {
  const [data, setData] = useState<Data[]>([]);
  const [variables, setVariables] = useState<string[]>([]);
  const [renderedVariables, setRenderedVariables] = useState<string[]>([]);
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const [DV, setDV] = useState<string | null>(null);
  const [IVs, setIVs] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const header = document.getElementById("headerWrapper");
    const main = document.getElementById("main");

    if (header && main) {
      const headerHeight = header.offsetHeight;
      const calculatedHeight = `calc(99vh - ${headerHeight}px)`;

      main.style.height = calculatedHeight;
      main.style.maxHeight = calculatedHeight;
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

  const toggleIV = (iv: string) => {
    if (!IVs.includes(iv)) {
      setIVs([...IVs, iv]);
    } else {
      setIVs(IVs.filter(item => item !== iv));
    }
  }

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

  const toggleActiveVariables = () => {
    setIsFilterActive(!isFilterActive);
    if (isFilterActive) {
      setRenderedVariables(variables);
    } else {
      const filtered = variables.filter((variable) => IVs.includes(variable));
      setRenderedVariables(filtered);
    }
  };

  return (
    <div className="h-screen pl-8">
      <div id="headerWrapper">
        <Header onFileUpload={handleUpload} onOpenModal={() => setIsModalOpen(true)} selectedDV={DV} />
      </div>
      <main id="main" className="app-container grid grid-cols-11 gap-8">

        {isModalOpen && (
          <Modal
            variables={variables}
            onSelect={handleSelectDV}
            onClose={() => setIsModalOpen(false)}
          />
        )}


        {/* IDEPENDANT VARIABLE LIST */}
        <div className="h-full col-span-3 rounded-lg flex flex-col">
          <p className="text-center text-xl">Variables</p>

          <div className="flex justify-between items-center gap-8">
            <input type="text" placeholder="Search.." onChange={(e) => handleSearchChange(e.target.value)}
              className="px-4 py-1 rounded-lg text-neutral-50 border-none outline-none placeholder-neutral-100 flex-auto bg-d-l18" />
            <div className="flex gap-4 items-center justify-center">
              <button onClick={() => toggleActiveVariables()}> <IconGeneral type="filter" /> </button>
              <button onClick={() => { setIVs([]) }}> <IconGeneral type='delete' /> </button>
            </div>
          </div>

          <div className="h-52 flex-auto overflow-y-scroll pr-8 mt-4">
            {renderedVariables.map((col: any) => (
              <div key={col} className="cursor-pointer flex justify-between items-center my-4">
                <p className="text-sm">{col}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleIV(col)} className="px-1 py-1"
                    style={{ backgroundColor: IVs.includes(col) ? 'hsl(0 0% 50%)' : '' }}>
                    {IVs.includes(col) ?
                      <IconGeneral type='minus' size={20} /> :
                      <IconGeneral type='add' size={20} />
                    }
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GRAPHS */}
        <div className="col-span-8 h-full overflow-y-scroll">
          <div className="grid grid-cols-2 gap-x-8 gap-y-8">
            {IVs.map(iv => (
              <ScatterPlot key={iv} DV={DV!} IV={iv} data={data.map(item => ({ x: item[DV!], y: item[iv] }))} />
            ))}
          </div>

        </div>


      </main>
    </div>
  );
}