import React from "react";
import "../../css/CardComponent.css";

interface Props {
  name: string,
  amount: number
}

const formatter = new Intl.NumberFormat('en-GB', {
  style: "currency",
  currency: "GBP"
})

const CardComponent: React.FC<Props> = ({name, amount}) => {
  return(
    <div className={"fund-container"}>
      <h2>{name}</h2>
      <p>By ActionFunder</p>
      <div className={"amount-text"}>
        Total Fund amount: <br/>
        <strong data-testid={"amount"}> {formatter.format(amount)} </strong>
      </div>
    </div>
  )
}

export default CardComponent;