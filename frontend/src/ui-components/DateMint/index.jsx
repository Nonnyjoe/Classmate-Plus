import React, { useEffect, useState } from "react";

function DateMint({ cardDate }) {
  const [fullDate, setFullDate] = useState("");

  useEffect(() => {
    const getFullDateFromTimestamp = (cardDate) => {
      const timestampInSeconds = cardDate;
      const date = new Date(Number(timestampInSeconds) * 1000);

      // Extracting date components
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      // Formatting the full date string
      const fullDate = `${year}-${month}-${day}`;

      return fullDate;
    };

    const calculatedFullDate = getFullDateFromTimestamp(cardDate);
    setFullDate(calculatedFullDate);
  }, [cardDate]);

  return <div>{fullDate}</div>;
}

export default DateMint;
