import Table from "../table";
import Data  from "../testData.json";
describe("test calculateData", () => {
  test("it should render table", () => {
    const testData = { body: JSON.stringify(Data)};

    document.body.innerHTML = "<div id=\"resp-table-body\">\n" +
      "            <div id=\"resp-table-row\"></div>\n" +
      "        </div>";
    window.Sparkline = {draw: jest.fn()};
    const t = new Table();
    jest.spyOn(t, 'addData');
    jest.spyOn(t, 'appendChild');
    jest.spyOn(t, 'sortSparkLineData');
    jest.spyOn(t, 'renderData');
    jest.spyOn(t, 'getData');
    t.addData(testData);
    expect(t.data).toMatchObject({});
    expect(t.data).toHaveProperty(Data.name);
    expect(t.addData).toHaveBeenCalledTimes(1);
    expect(t.addData).toHaveBeenCalledWith(testData);
    expect(t.sortSparkLineData).toHaveBeenCalled();
    expect(t.appendChild).toHaveBeenCalled();
    expect(t.renderData).toHaveBeenCalled();
    expect(t.getData).toHaveBeenCalled();
    const responseHtml = "<div id=\"resp-table-body\"><div class=\"resp-table-row\"><div class=\"table-body-cell\">usdjpy</div><div class=\"table-body-cell\">106.7297012204255</div><div class=\"table-body-cell\">107.25199883791178</div><div class=\"table-body-cell\">-2.8769211401569663</div><div class=\"table-body-cell\">-4.862314256927661</div><div class=\"table-body-cell\"><span></span></div></div></div>";

    expect(document.body.innerHTML).toBe(responseHtml);
  });

});