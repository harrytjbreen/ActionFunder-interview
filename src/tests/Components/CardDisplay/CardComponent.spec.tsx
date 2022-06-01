import React from 'react';
import {cleanup, render, screen} from "@testing-library/react";
import CardComponent from "../../../Components/CardDisplay/CardComponent";

describe("Testing CardComponent", () => {

  const testData = {
    name: "TestName",
    amount: 123456,
    displayAmount: '£123,456.00'
  }

  afterEach(cleanup);

  it("should render the correct values", () => {
    render(<CardComponent name={testData.name} amount={testData.amount}/>)
    const title = screen.getByText(testData.name);
    const amount = screen.getByText(testData.displayAmount)
    expect(title).toBeDefined();
    expect(amount).toBeDefined();
  })
})