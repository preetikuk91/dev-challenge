class calculateData  {
  constructor() {
    this.data = {};
    this.key = "";
    this.addData = this.addData.bind(this);
    this.getData = this.getData.bind(this);
    this.renderData = this.renderData.bind(this);
  }
  addData(message) {
    const res = JSON.parse(message.body);
    const mid = (res.bestBid + res.bestAsk) / 2;
    const curr = this.data[res.name];
    if(curr) {
      if(curr.mid.length === 30) {
        curr.mid.shift();
      }
      curr.mid.push(mid);
      res.mid = curr.mid;
    } else {
      res.mid = [mid];
    }
    this.data[res.name] = res;

    this.key = res.name;
    this.renderData();
  }
  getData(){
    const obj = Object.values(this.data);
    return obj.sort((a, b) => (a.lastChangeBid - b.lastChangeBid))
  }
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
      Sparkline.draw(sparks, item.mid);
      const sparkCell = document.createElement("div");
      sparkCell.classList.add("table-body-cell");
      sparkCell.appendChild(sparks);
      tableRow.appendChild(sparkCell);
      // this.appendChild(sparks, tableRow);
      table.appendChild(tableRow);
    });
  }
  appendChild(data, parent){
    const name = document.createElement("div");
    name.innerHTML = data;
    name.classList.add("table-body-cell");
    parent.appendChild(name);
  }
}

const table = new calculateData();
const callback = table.addData;
export {callback};