// Handle File Upload ts

import * as XLSX from 'xlsx';
import { Data } from "@/types/Data";

export const handleFileUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  setData: React.Dispatch<React.SetStateAction<Data[]>>,
  setVariables: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const arrayBuffer = event.target?.result as ArrayBuffer;
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData: Data[] = XLSX.utils.sheet_to_json(sheet);
    setData(jsonData);
    setVariables(Object.keys(jsonData[0]));
  };
  reader.readAsArrayBuffer(file);
};
