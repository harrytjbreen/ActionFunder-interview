import React, {useState} from "react";
import testFunds from "../../testFunds.json";
import CardComponent from "./CardComponent";
import "../../css/CardDisplay.css";
import {Dropdown} from "react-bootstrap";

interface Fund {
  id: number,
  name: string,
  amount: number
}

const nameCompare = (a:Fund, b:Fund) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);

const amountCompare = (a:Fund, b:Fund) => (a.amount > b.amount) ? 1 : ((b.amount > a.amount) ? -1 : 0);

const sortingOptions = [
  {
    text:"name ascending",
    sort: (list: Fund[]): Fund[] => {
      return list.sort(nameCompare);
    }
  },
  {
    text:"name descending",
    sort: (list: Fund[]): Fund[] => {
      return list.sort(nameCompare).reverse();
    }
  },
  {
    text:"amount ascending",
    sort: (list: Fund[]): Fund[] => {
      return list.sort(amountCompare);
    }
  },
  {
    text:"amount descending",
    sort: (list: Fund[]): Fund[] => {
      return list.sort(amountCompare).reverse();
    }
  },
]

const prettyFormatString = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
}

const CardDisplay: React.FC = () => {

  const [funds, setFunds] = useState<Fund[]>(testFunds);

  return(
    <>
      <Dropdown>
        <Dropdown.Toggle size={"lg"} variant={"outline-secondary"} className={"dropdown"} id={"sort-dropdown"}>Sort By</Dropdown.Toggle>
        <Dropdown.Menu>
          {sortingOptions.map(option =>
            <Dropdown.Item as={"button"} key={option.text} onClick={() => setFunds(prevState => option.sort([...prevState]))}>
              {/* [...prevState] is needed over prevState as it forces React to rerender */}
              {prettyFormatString(option.text)}
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
      <div className={"display-container"}>
        {funds.map(fund => (
          <CardComponent key={fund.id} name={fund.name} amount={fund.amount}/>
        ))}
      </div>
    </>
  )
}

export default CardDisplay;