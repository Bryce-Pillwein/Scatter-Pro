import Image from "next/image";
import { ChangeEventHandler, useState } from "react";

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
          {/* <Image className="mr-8" src="/logo.png" alt="Website-logo" width={40} height={40} /> */}
          <h1 id="page-title" className="text-2xl font-bold text-center">Graph Correlations</h1>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <p className="text-neutral-300 text-sm">{selectedDV ? selectedDV : 'No DV Selected'}</p>
            <button onClick={onOpenModal}>Select DV</button>
          </div>
          <div className="flex items-center gap-8">
            <input type="file" accept=".xlsx, .xls" onChange={(e) => onFileUpload(e)}
              className="cursor-pointer  text-neutral-300" />
          </div>
        </div>




      </section>
    </header>
  );
}

export default Header;