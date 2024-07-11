import Image from "next/image";
import { ChangeEventHandler, useState } from "react";

interface HeaderProps {
  onFileUpload: ChangeEventHandler<HTMLInputElement>
  onOpenModal: () => void;
  toggleDarkMode: () => void;
  selectedDV: string | null;
}

const Header: React.FC<HeaderProps> = ({ onFileUpload, onOpenModal, toggleDarkMode, selectedDV }) => {

  return (
    <header className="app-container py-3 bg-inherit">
      <section className="flex justify-between items-center">

        <div className="flex items-center" >
          <Image className="mr-8 rounded-3xl" src="/developer-brand-profile.jpg" alt="Website-logo" width={50} height={50} />
          <h1 id="page-title" className="text-2xl font-bold text-center dark:text-d-l90 text-d">SCATTER PRO</h1>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <p className="text-sm">{selectedDV ? selectedDV : 'No DV Selected'}</p>
            <button onClick={onOpenModal} className="btn">Select DV</button>
          </div>
          <div className="flex items-center gap-8">
            <input type="file" accept=".xlsx, .xls" onChange={(e) => onFileUpload(e)}
              className="cursor-pointer inputFile" />
          </div>
          <button className="btn" onClick={toggleDarkMode}>
            DarkMode
          </button>
        </div>




      </section>
    </header>
  );
}

export default Header;