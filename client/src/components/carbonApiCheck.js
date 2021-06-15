import { useEffect, useState } from "react";

export function CarbonApiCheck() {
  const [carbonApiStatus, setCarbonApiStatus] = useState("");
  const [testResponse, setTestResponse] = useState({});

  function testServerRequest() {
    fetch("http://localhost:4000/carboninterface/auth")
      .then((res) => res.json())
      .then((res) => setCarbonApiStatus(res));
  }

  function getCar() {
    fetch("http://localhost:4000/carboninterface/getcar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "vehicle",
        distance_unit: "km",
        distance_value: 100,
        vehicle_model_id: "c3334a98-cf8d-48a3-843a-3bef3f107c92",
      }),
    })
      .then((res) => res.json())
      .then((res) => setTestResponse(res));
  }

  return (
    <>
      <hr />

      <div onClick={() => testServerRequest()} style={{ cursor: "pointer" }}>
        check CarbonInterface Authorization via Server
      </div>
      <div>CarbonInterface API Status: {carbonApiStatus.message}</div>
      <div onClick={() => getCar()} style={{ cursor: "pointer" }}>
        get Car
      </div>
      <div>{JSON.stringify(testResponse)}</div>
    </>
  );
}
