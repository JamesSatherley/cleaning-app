import React from "react";

interface Bill {
  date: string;
  amount: number;
}

const powerBills: Bill[] = [
  { date: "2025-01-15", amount: 97.9 },
  { date: "2024-12-12", amount: 81.84 },
  { date: "2024-12-12", amount: 125.46 },
];

const gasBills: Bill[] = [
  { date: "2025-10-21", amount: 156.0 },
  { date: "2024-10-18", amount: 308.2 },
];

const internetBills: Bill[] = [
  { date: "2025-01-15", amount: 106 },
  { date: "2024-12-12", amount: 113.14 },
  { date: "2024-12-12", amount: 113.47 },
];

const amenitiesMonthly = 100;
const gasWeekly = 23.94;

const Money: React.FC = () => {
  function getDaysInMonth() {
    const now = new Date();
    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0
    ).getDate();

    return daysInMonth;
  }

  function monthlyToWeeklyCost(monthlyCost: number) {
    const dailyCost = monthlyCost / getDaysInMonth();

    return dailyCost * 7;
  }

  function weeklyToMonthlyCost(weeklyCost: number) {
    const dailyCost = weeklyCost / 7;

    return dailyCost * getDaysInMonth();
  }

  const powerMonthly = (powerBills[0]?.amount + powerBills[1]?.amount) / 2 - 80;
  const internetMonthly =
    (internetBills[0]?.amount + internetBills[1]?.amount) / 2;

  const totalMonthly =
    powerMonthly +
    internetMonthly +
    amenitiesMonthly +
    weeklyToMonthlyCost(gasWeekly);
  const totalWeekly = monthlyToWeeklyCost(totalMonthly);

  return (
    <div>
      <h2>Bills</h2>
      <div>
        <div className="money">
          <p className="bigMoney">
            Per week cost is <strong>${(totalWeekly / 3).toFixed(2)}</strong>
          </p>
          <table>
            <thead>
              <tr>
                <th>Bill</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Power</td>
                <td>${(monthlyToWeeklyCost(powerMonthly) / 3).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Internet</td>
                <td>
                  ${(monthlyToWeeklyCost(internetMonthly) / 3).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td>Gas</td>
                <td>
                  ${(monthlyToWeeklyCost(amenitiesMonthly) / 3).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td>Amenities</td>
                <td>${(gasWeekly / 3).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <h3>Past Bills</h3>

        <h4>Power Bills</h4>
        <ul>
          {powerBills.map((bill, index) => (
            <li key={index}>
              {bill.date}: ${bill.amount.toFixed(2)}
            </li>
          ))}
        </ul>

        <h4>Gas Bills</h4>
        <ul>
          {gasBills.map((bill, index) => (
            <li key={index}>
              {bill.date}: ${bill.amount.toFixed(2)}
            </li>
          ))}
        </ul>

        <h4>Internet Bills</h4>
        <ul>
          {internetBills.map((bill, index) => (
            <li key={index}>
              {bill.date}: ${bill.amount.toFixed(2)}
            </li>
          ))}
        </ul>

        <h4>Amenities</h4>
        <p>
          Monthly Amenities Cost:{" "}
          <strong>${amenitiesMonthly.toFixed(2)}</strong>, which is total $
          <strong>{monthlyToWeeklyCost(amenitiesMonthly).toFixed(2)}</strong>{" "}
          weekly or $
          <strong>
            {(monthlyToWeeklyCost(amenitiesMonthly) / 3).toFixed(2)}
          </strong>{" "}
          per person weekly
        </p>
      </div>

      <div>
        <h3>Totals</h3>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Total</th>
              <th>Total per Person</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Weekly</td>
              <td>${totalWeekly.toFixed(2)}</td>
              <td>${(totalWeekly / 3).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Monthly</td>
              <td>${totalMonthly.toFixed(2)}</td>
              <td>${(totalMonthly / 3).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h3>Utilities payment</h3>
        <p>
          Utilities should be paid to the flat account listing in messenger. If
          you leave the flat, you will be paid out any excess you are owed from
          this account.
        </p>
      </div>
      <div>
        <h3>How this works</h3>
        <p>
          I take the last two internet and power bills, add them together and
          divide by 2 to get an average power + internet bills of the last two
          months. I take $80 off this value, as my work gives me $80 to go
          towards my power bill because I work from home. I add $70 to allow for
          various cleaning products to the monthly total. I add Gas onto this.
          This gets shown as "total - monthly". I then divide it by the number
          of days in a month, to get the monthly cost, and multiply it by seven
          to get the weekly cost.
          <br />
          <br />
          Calculating gas is a bit harder. I ordered 2x 45L of LPG gas bottles
          which last approximately 2 months each, although this was with 2x
          people instead of three. At the last time of ordering these were
          $154.10 each. You also rent the bottles for $78 each per year. I've
          estimated we will go through a bottle every 45 days. This means gas
          costs $3.42 per day and the bottle rental is 0.43, totaling $3.85.
          <br />
          <br />
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Total</th>
                <th>Total per Person</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Weekly</td>
                <td>${gasWeekly}</td>
                <td>${(gasWeekly / 3).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Monthly</td>
                <td>${weeklyToMonthlyCost(gasWeekly).toFixed(2)}</td>
                <td>${(weeklyToMonthlyCost(gasWeekly) / 3).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </p>
      </div>
    </div>
  );
};

export default Money;
