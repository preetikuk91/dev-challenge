class calculateData {
  constructor() {
    this.data = {};
    this.addData = this.addData.bind(this);
    this.getData = this.getData.bind(this);
    this.renderData = this.renderData.bind(this);
    this.sortSparkLineData = this.sortSparkLineData.bind(this);
  }

  // addData is used as callback in client.subscribe method to handle the response
  addData(message) {
    const res = JSON.parse(message.body);
    const mid = (res.bestBid + res.bestAsk) / 2;
    const curr = this.data[res.name];
    const date = new Date();
    const currMilli = Date.parse(date);
    if (curr) {
      curr.mid.push([currMilli, mid]);
      res.mid = curr.mid;
    } else {
      res.mid = [[currMilli, mid]];
    }
    this.data[res.name] = res;
    this.sortSparkLineData();
    this.renderData();
  }

  //It is calculatng sparline data over the last 30 seconds for each currency
  sortSparkLineData() {
    const date = new Date();
    const currMilli = Date.parse(date);
    const lastTime = currMilli - 30000;
    Object.keys(this.data).forEach(item => {
      const newItems = this.data[item].mid.filter(i => i[0] > lastTime);
      this.data[item].mid = newItems;
    });
  }

  //this method is sorting the data on the basis of lastChangeBid to show in table
  getData() {
    const obj = Object.values(this.data);
    return obj.sort((a, b) => (a.lastChangeBid - b.lastChangeBid))
  }

  // Creating rows and cells for table to show data
  renderData() {
    const d = this.getData();
    const table = document.getElementById("resp-table-body");
    table.innerHTML = '';
    d.forEach(item => {
      const tableRow = document.createElement("div");
      tableRow.classList.add("resp-table-row");
      this.appendChild(item.name, tableRow);
      this.appendChild(item.bestBid, tableRow);
      this.appendChild(item.bestAsk, tableRow);
      this.appendChild(item.lastChangeBid, tableRow);
      this.appendChild(item.lastChangeAsk, tableRow);
      const sparks = document.createElement('span');
      let sparkLineData = [];
      item.mid.forEach(i => sparkLineData.push(i[1]));
      Sparkline.draw(sparks, sparkLineData);
      const sparkCell = document.createElement("div");
      sparkCell.classList.add("table-body-cell");
      sparkCell.appendChild(sparks);
      tableRow.appendChild(sparkCell);
      table.appendChild(tableRow);
    });
  }

  //common method for crating dynamic cells
  appendChild(data, parent) {
    const name = document.createElement("div");
    name.innerHTML = data;
    name.classList.add("table-body-cell");
    parent.appendChild(name);
  }
}

//const table = new calculateData();
//const callback = table.addData;
//export {callback};

export default calculateData;