import Table from "../table";
//const TableCls = require("../table.js");
describe("test calculateData", () => {
  test("it should call addData", () => {
    const addData = Table.prototype.addData = jest.fn();
    const t = new Table();
    const testData = { body: {"name":"usdjpy","bestBid":106.7297012204255,"bestAsk":107.25199883791178,"openBid":107.22827132623534,"openAsk":109.78172867376465,"lastChangeAsk":-4.862314256927661,"lastChangeBid":-2.8769211401569663}}
    t.addData(testData);
  });
  test("it should call sortSparkLineData", () => {
    const sortSparkLineData = Table.prototype.sortSparkLineData = jest.fn();
    const t = new Table();
    t.sortSparkLineData();
    expect(sortSparkLineData).toHaveBeenCalledTimes(1);
  });
  test("it should call renderData", () => {
    const renderData = Table.prototype.renderData = jest.fn();
    const t = new Table();
    t.renderData();
    expect(renderData).toHaveBeenCalledTimes(1);
  });
  test("it should call getData", () => {
    const getData = Table.prototype.getData = jest.fn();
    const t = new Table();
    t.getData();
    expect(getData).toHaveBeenCalledTimes(1);
  });
  test("it should call getData", () => {
    const appendChild = Table.prototype.appendChild = jest.fn();
    const t = new Table();
    t.appendChild();
    expect(appendChild).toHaveBeenCalledTimes(1);
  });
});