import { useState } from "react";
import DOMPurify from "dompurify";

function App() {
  const [memberName, setMemberName] = useState("");
  const [memberId, setMemberId] = useState("");
  const [points, setPoints] = useState(0);
  const [inputPoints, setInputPoints] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddPoints = () => {
    if (!inputPoints || Number(inputPoints) <= 0) {
      setError("Enter valid points");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setPoints(points + Number(inputPoints));

      console.log(
        "[Analytics] User interacted with End-to-End Frequent Flyer Portal"
      );

      setInputPoints("");
      setLoading(false);
    }, 1000);
  };

  const handleRedeemPoints = () => {
    if (!inputPoints || Number(inputPoints) <= 0) {
      setError("Enter valid points");
      return;
    }

    if (Number(inputPoints) > points) {
      setError("Not enough points");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setPoints(points - Number(inputPoints));

      console.log(
        "[Analytics] User interacted with End-to-End Frequent Flyer Portal"
      );

      setInputPoints("");
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ padding: "32px" }}>
      <h1>End-to-End Frequent Flyer Portal</h1>

      <br />

      <input
        aria-label="Member Name"
        type="text"
        placeholder="Member Name"
        value={memberName}
        onChange={(e) =>
          setMemberName(
            DOMPurify.sanitize(e.target.value)
          )
        }
      />

      <br />
      <br />

      <input
        aria-label="Member ID"
        type="text"
        placeholder="Member ID"
        value={memberId}
        onChange={(e) =>
          setMemberId(
            DOMPurify.sanitize(e.target.value)
          )
        }
      />

      <br />
      <br />

      {memberName && memberId ? (
        <>
          <h3>Member Name: {memberName}</h3>
          <h3>Member ID: {memberId}</h3>
          <h2>Current Points: {points}</h2>
        </>
      ) : (
        <p>No Data Found</p>
      )}

      <br />

      <input
        aria-label="Points"
        type="number"
        placeholder="Enter Points"
        value={inputPoints}
        onChange={(e) =>
          setInputPoints(e.target.value)
        }
        style={{
          border: error ? "2px solid red" : "",
        }}
      />

      <br />
      <br />

      <button onClick={handleAddPoints}>
        Add Points
      </button>

      <button
        onClick={handleRedeemPoints}
        style={{ marginLeft: "10px" }}
      >
        Redeem Points
      </button>

      <br />
      <br />

      {loading && <p>Loading...</p>}

      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}
    </div>
  );
}

export default App;