import React, { useState, useEffect } from "react";
import { getNextCollectionDate } from "../utils/dateUtils";

const Info: React.FC = () => {
  const [relativeMessages, setRelativeMessages] = useState<{
    rubbish: string;
    glass: string;
    recycling: string;
  }>({
    rubbish: "",
    glass: "",
    recycling: "",
  });

  useEffect(() => {
    const startDates = {
      rubbish: new Date(2025, 0, 27),
      glass: new Date(2025, 0, 21),
      recycling: new Date(2025, 0, 28),
    };

    const messages = {
      rubbish: getNextCollectionDate("rubbish", startDates).message,
      glass: getNextCollectionDate("glass", startDates).message,
      recycling: getNextCollectionDate("recycling", startDates).message,
    };

    setRelativeMessages(messages);
  }, []);

  return (
    <div>
      <h2>Information</h2>
      <ul>
        <li>
          <strong>Wifi</strong>
          name: subscribe to my onlyfans <br />
          password: 19@clydecrescent
        </li>
        <li>
          <strong>Bins</strong>
          <ul>
            <li>
              Rubbish: Next empty is <b>{relativeMessages.rubbish}</b>
            </li>
            <li>
              Glass: Next empty is <b>{relativeMessages.glass}</b>
            </li>
            <li>
              Recycling: Next empty is <b>{relativeMessages.recycling}</b>
            </li>
          </ul>
          Wrong? See here:{" "}
          <a href="https://www.pncc.govt.nz/Services/Rubbish-and-recycling/Palmy-Collections/Rubbish-and-recycling-days">
            See here
          </a>
        </li>
        <li>
          <strong>Flat Consumables</strong>
          The flat card is on the bookcase in the lounge. Ask James for the pin
          code. Please take and use if you notice a consumable is out
          (toiletpaper, bin liners, paper towels, cleaning products etc). If the
          card declines, <a href="tel:0225457881">call me</a>
        </li>
        <li>
          <strong>Cleaning Roster</strong>
          The cleaning roster tick boxes on save to your local device, I cannot
          see when you tick these. This is just to help you keep track. You
          might notice some weeks you have extra jobs, this is because some jobs
          are monthly and some are weekly.
        </li>
        <li>
          <strong>Rent payment</strong>
          Rent should be paid weekly on Mondays to the rent account listed in
          messenger
        </li>
      </ul>
    </div>
  );
};

export default Info;
