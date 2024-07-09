import Image from "next/image";
import { ChangeEventHandler, useEffect, useState } from "react";
import { handleFileUpload } from "@/services/utils/handleFileUpload";

interface HeaderProps {
  onFileUpload: ChangeEventHandler<HTMLInputElement>
  onOpenModal: () => void;
  selectedDV: string | null;
}

const Header: React.FC<HeaderProps> = ({ onFileUpload, onOpenModal, selectedDV }) => {
  const [DV, setDV] = useState<string | null>(null);

  return (
    <header className="app-container py-3">
      <section className="flex justify-between items-center">

        <div className="flex items-center" >
          <Image className="mr-8" src="/logo.png" alt="Website-logo" width={40} height={40} />
          <h1 id="page-title" className="text-2xl font-bold text-center">Geotech</h1>
        </div>

        <div className="flex items-center gap-8">
          <p className="text-neutral-500 text-sm">Import SPSS:</p>
          <input type="file" accept=".xlsx, .xls" onChange={(e) => onFileUpload(e)}
            id="file-upload" className="cursor-pointer px-6 py-1 text-sm bg-neutral-800 text-neutral-300 rounded-md hover:bg-neutral-600" />
          <label htmlFor="file-upload"
            className="hidden hover:hidden"
          >Upload SPSS</label>
        </div>

        <div className="flex items-center gap-8">
          <p className="text-neutral-500 text-sm">DV: {selectedDV ? selectedDV : 'None'}</p>
          <button onClick={onOpenModal}>Select DV</button>
        </div>

      </section>
    </header>
  );
}

export default Header;