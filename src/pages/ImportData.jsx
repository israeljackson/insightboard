import Title from "../components/Title";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

import { useState } from "react"
import Papa from "papaparse"
import * as XLSX from "xlsx"

function ImportData() {

  const [importData, setImportData] = useState([])
  const emptyCell = "\u2014"

  const getField = (row, keys) => {
    for (const key of keys) {
      const value = row?.[key]
      if (value !== undefined && value !== null && value !== "") return value
    }
    return ""
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]

    if (!file) return

    const extension = file.name.split(".").pop().toLowerCase()

    if (extension === "csv"){
      parseCSV(file)
    }
    if (extension === "xlsx"){
      parseExcel(file)
    }
  }

  const parseCSV = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        console.log("Parsed CSV: ", results.data)
        setImportData(results.data)
      }
    })
  }

  const parseExcel = (file) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const data = Uint8Array(event.target.result)
      const workbook = XLSX.read(data, {type: "array"})
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(sheet)
      console.log("Parsed Excel:", jsonData)
      setImportData(jsonData)
    }
    reader.readAsArrayBuffer(file)
  }

  return ( 
    <>
      <Title subtitle={"Upload products from CSV file"} />
      <div className="p-8 mt-6 bg-white rounded-xl">
        <label 
          className="w-full border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-xl p-12 flex flex-col items-center transition-colors">
          <CloudArrowUpIcon className="text-gray-400 h-15 4-15 justify-center items-center"/>
          <h1 className="text-center text-2xl mt-4 font-medium text-gray-700">Drag and drop your CSV files here</h1>
          <p className="text-center mt-2 text-gray-500">or click to browse</p>

          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div> 

      {importData.length > 0 && (

        <div className="p-8 mt-6 bg-white rounded-xl">

        <h2 className="text-lg font-semibold mb-4">
        Preview Imported Data
        </h2>

        <div className="overflow-x-auto">
        <table className="w-full text-sm">

        <thead className="bg-gray-100">
        <tr>
        <th className="p-2">ID</th>
        <th className="p-2">Title</th>
        <th className="p-2">Category</th>
        <th className="p-2">Price</th>
        <th className="p-2">Stock</th>
        <th className="p-2">Rating</th>
        <th className="p-2">Thumbnail</th>
        <th className="p-2">Description</th>
        </tr>
        </thead>

        <tbody>

        {importData.map((item, index) => (

        <tr key={index} className="border-t">

        <td className="p-2">{getField(item, ["id"]) || emptyCell}</td>
        <td className="p-2">{getField(item, ["title", "name"]) || emptyCell}</td>
        <td className="p-2">{getField(item, ["category"]) || emptyCell}</td>
        <td className="p-2">{getField(item, ["price"]) || emptyCell}</td>
        <td className="p-2">{getField(item, ["stock"]) || emptyCell}</td>
        <td className="p-2">{getField(item, ["rating"]) || emptyCell}</td>
        <td className="p-2">
          {getField(item, ["thumbnail", "image"]) ? (
            <img
              src={getField(item, ["thumbnail", "image"])}
              alt={getField(item, ["title", "name"]) || "Product thumbnail"}
              className="h-10 w-10 rounded object-cover"
            />
          ) : (
            emptyCell
          )}
        </td>
        <td className="p-2">{getField(item, ["description"]) || emptyCell}</td>

        </tr>

        ))}

        </tbody>
        </table>
        </div>

        </div>

      )}

      <div className="p-8 mt-6 bg-white rounded-xl">
        <h1 className="text-lg font-medium mb-3">File Format Example</h1>

        <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-700 border border-gray-200 overflow-x-auto">
          <div className="min-w-300">
          <div className="grid grid-cols-[80px_160px_140px_90px_80px_80px_220px_1fr] gap-2 mb-2 text-gray-500 font-medium">
              <div>id</div>
              <div>title</div>
              <div>category</div>
              <div>price</div>
              <div>stock</div>
              <div>rating</div>
              <div>thumbnail</div>
              <div>description</div>
            </div>
            <div className="grid grid-cols-[80px_160px_140px_90px_80px_80px_220px_1fr] gap-2">
              <div>101</div>
              <div>Red Lipstick</div>
              <div>Beauty</div>
              <div>12.99</div>
              <div>91</div>
              <div>4.6</div>
              <div className="break-words">/images/product-image.jpg</div>
              <div className="break-words">Professional makeup</div>
            </div>
            <div className="grid grid-cols-[80px_160px_140px_90px_80px_80px_220px_1fr] gap-2">
              <div>102</div>
              <div>Perfume</div>
              <div>Fragrance</div>
              <div>45.50</div>
              <div>34</div>
              <div>4.2</div>
              <div className="break-words">/images/product-image.jpg</div>
              <div className="break-words">Luxury fragrance</div>
            </div>
            <div className="grid grid-cols-[80px_160px_140px_90px_80px_80px_220px_1fr] gap-2">
              <div>103</div>
              <div>Foundation</div>
              <div>Beauty</div>
              <div>24.99</div>
              <div>12</div>
              <div>4.4</div>
              <div className="break-words">/images/product-image.jpg</div>
              <div className="break-words">Full coverage</div>
            </div>
          </div>
        </div>
      </div>
    </>
    
  );
}

export default ImportData;
