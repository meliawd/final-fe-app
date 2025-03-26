"use client";
import axios from "axios";
import { useEffect, useState } from "react";

interface BalanceInfo {
  balanceType: string;
  amount: {
    value: string;
    currency: string;
  };
  floatAmount: {
    value: string;
    currency: string;
  };
  holdAmount: {
    value: string;
    currency: string;
  };
  availableBalance: {
    value: string;
    currency: string;
  };
  ledgerBalance: {
    value: string;
    currency: string;
  };
  currentMultilateralLimit: {
    value: string;
    currency: string;
  };
  registrationStatusCode: string;
  status: string;
}

interface AdditionalInfo {
  deviceId: string;
  channel: string;
}

interface ApiResponse {
  responseCode: string;
  responseMessage: string;
  referenceNo: string;
  partnerReferenceNo: string;
  accountNo: string;
  name: string;
  accountInfos: BalanceInfo[];
  additionalInfo: AdditionalInfo;
}

const DISPLAY_ACCOUNT = {
  amount: "Amount",
  floatAmount: "Float Amount",
  holdAmount: "Hold Amount",
  availableBalance: "Available Balance",
  ledgerBalance: "Ledger Balance",
  currentMultilateralLimit: "Current Multilateral Limit",
};
type KeyDisplay = keyof typeof DISPLAY_ACCOUNT;

const InformasiSaldo = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState("");
  const [showTable, setShowTable] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api-maybank-v1/balinfo"
        );
        console.log(response.data.data);
        setData(response.data.data);
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
  if (!data) return <div>Loading...</div>;

  return (
    <div className="px-4">
      <div>
        <h1 className="text-4xl font-semibold text-center">Informasi Saldo</h1>
        <div className="text-lg text-center">
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          <p>Nama : {data.name}</p>
        </div>
        <div className="text-lg text-center">
          <p>Account No : {data.accountNo}</p>
        </div>
        <div className="text-lg text-center">
          <p>Partner Reference No : {data.partnerReferenceNo}</p>
        </div>
      </div>
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-2.5 rounded"
        onClick={() => setShowTable(!showTable)}
      >
        {" "}
        Check Saldo{" "}
      </button>

      <div className="border-b border-gray-400 pb-2"></div>

      {showTable && (
        <>
          <div className="mt-3">
            <h2 className="font-semibold">
              Balance Type : {data.accountInfos[0].balanceType}
            </h2>
            <h2 className="font-semibold">
              Status : {data.accountInfos[0].status}
            </h2>
            <h2 className="font-semibold">
              RegStatusCode : {data.accountInfos[0].registrationStatusCode}
            </h2>
            <table className="w-full mt-2 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">#</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Account Infos
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Value</th>
                  <th className="border border-gray-300 px-4 py-2">Currency</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.accountInfos[0])
                  .filter(
                    ([key]) =>
                      ![
                        "balanceType",
                        "registrationStatusCode",
                        "status",
                      ].includes(key)
                  )
                  .map(([key, data], index) => (
                    <tr
                      key={index}
                      className="text-left odd:bg-white even:bg-gray-100"
                    >
                      <td className="border border-gray-300 px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {DISPLAY_ACCOUNT[key as KeyDisplay]}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {(data as { value: string }).value}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {(data as { currency: string }).currency}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3">
            <h2 className="font-semibold">
              Balance Type : {data.accountInfos[1].balanceType}
            </h2>
            <h2 className="font-semibold">
              Status : {data.accountInfos[1].status}
            </h2>
            <h2 className="font-semibold">
              RegStatusCode : {data.accountInfos[1].registrationStatusCode}
            </h2>
            <table className="w-full mt-2 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">#</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Account Infos
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Value</th>
                  <th className="border border-gray-300 px-4 py-2">Currency</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.accountInfos[1])
                  .filter(
                    ([key]) =>
                      ![
                        "balanceType",
                        "registrationStatusCode",
                        "status",
                      ].includes(key)
                  )
                  .map(([key, data], index) => (
                    <tr
                      key={index}
                      className="text-left odd:bg-white even:bg-gray-100"
                    >
                      <td className="border border-gray-300 px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {DISPLAY_ACCOUNT[key as KeyDisplay]}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {(data as { value: string }).value}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {(data as { currency: string }).currency}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default InformasiSaldo;
