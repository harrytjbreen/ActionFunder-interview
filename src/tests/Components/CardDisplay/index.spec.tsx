import React from 'react';
import {cleanup, fireEvent, render, screen} from "@testing-library/react";
import CardDisplay from "../../../Components/CardDisplay";
import testFunds from "../../../testFunds.json"

describe("Testing CardComponent", () => {

  afterEach(cleanup);

  it("should render all 5 Cards", () => {
    render(<CardDisplay/>);
    testFunds.forEach(fund => {
      expect(screen.getByText(fund.name)).toBeDefined();
    })
  });

  it("should sort the cards correctly by name", () => {
    render(<CardDisplay/>);
    let sortedTestFundNames = testFunds.map(item => item.name).sort();
    fireEvent.click(screen.getByText('Sort By'));
    fireEvent.click(screen.getByText('Name ascending'));
    let children = screen.getAllByRole("heading").map(item => item.innerHTML);
    expect(children).toEqual(sortedTestFundNames);

    sortedTestFundNames.reverse();
    fireEvent.click(screen.getByText('Sort By'));
    fireEvent.click(screen.getByText('Name descending'));
    children = screen.getAllByRole("heading").map(item => item.innerHTML);
    expect(children).toEqual(sortedTestFundNames);
  });

  it("should sort the cards correctly by amount", () => {
    render(<CardDisplay/>);
    const formatter = new Intl.NumberFormat('en-GB', {
      style: "currency",
      currency: "GBP"
    })

    let sortedTestFundAmounts: number[] | string[] = testFunds.map(item => item.amount).sort((a,b) => a-b);
    sortedTestFundAmounts = sortedTestFundAmounts.map(item => formatter.format(item));

    fireEvent.click(screen.getByText('Sort By'));
    fireEvent.click(screen.getByText('Amount ascending'));
    let children = screen.getAllByTestId("amount").map(item => item.innerHTML.trim());
    expect(children).toEqual(sortedTestFundAmounts);

    sortedTestFundAmounts.reverse();
    fireEvent.click(screen.getByText('Sort By'));
    fireEvent.click(screen.getByText('Amount descending'));
    children = screen.getAllByTestId("amount").map(item => item.innerHTML.trim());
    expect(children).toEqual(sortedTestFundAmounts);
  })

})