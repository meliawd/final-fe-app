"use client";
// import axios from "axios";
import { useEffect, useState } from "react";

const InformasiSaldo = () => {
  // const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(
        //   "http://127.0.0.1:8000/api-maybank-v1/balinfo"
        // );
        // console.log(response.data);
        // setData(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // Safely access the error message
        } else {
          setError("An unknown error occurred"); // Handle non-Error objects
        }
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  // if (!data) return <div>Loading...</div>;

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold text-center">
          Balance Information
        </h1>
        <div className="text-lg text-center">
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </div>
      </div>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded">
        {" "}
        Check Saldo{" "}
      </button>
      <table className="w-full mt-2 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Account Infos</th>
            <th className="border border-gray-300 px-4 py-2">Value</th>
            <th className="border border-gray-300 px-4 py-2">Currency</th>
          </tr>
        </thead>
      </table>
    </>
  );
};

export default InformasiSaldo;
