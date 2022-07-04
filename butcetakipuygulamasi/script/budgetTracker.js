export default class budgetTracker {
  constructor(querySelectorString) {
    this.root = document.querySelector(querySelectorString);
    //console.log(this.root); // App class'i ve icerisindekilere ulastik.
    this.root.innerHTML = budgetTracker.html();

    this.root.querySelector(".new-entry").addEventListener("click", () => {
      this.onNewEntryBtnClick();
    });

    //Localstorage'den veriyi yukle
    this.load();
  }

  static html() {
    return `
        <table class="budget-tracker">
        <thead>
        <tr>
            <th>Tarih</th>
            <th>Açıklama</th>
            <th>Gelir/Gider</th>
            <th>Miktar</th>
            <th>Sil</th>
        </tr>
        </thead>
        <tbody class="entries">
        </tbody>
        <tbody>
            <tr>
                <td colspan="5" class="controls">
            <button type="button" class="new-entry button-17">Ekle</button>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr><td colspan="5" class="summary">
                <strong>Toplam:</strong>
                <span class="total"></span>

            </td></tr>
        </tfoot>
    </table>
    `;
  }
  static entryHtml() {
    return `
    <tr>
    <td>
      <input type="date" class="input input-date" name="" id="" />
    </td>
    <td>
      <input
        type="text"
        placeholder="Açıklama Ekleyin"
        class="input input-description"
      />
    </td>
    <td>
      <select class="input input-type">
        <option value="income">Gelir</option>
        <option value="expense">Gider</option>
      </select>
    </td>
    <td>
      <input type="number" placeholder="0" class="input input-amount" />
    </td>
</td>
<td>
<button type="button" class="delete-entry">&#10005;</button>
</td>
  </tr>
    `;
  }
  load() {
    const entries = JSON.parse(
      localStorage.getItem("budget-tracker-entries") || "[]"
    );

    //console.log(entries);
    for (const entry of entries) {
      this.addEntry(entry);
    }
    this.updateSummary();
  }
  updateSummary() {
    const total = this.getEntryRow().reduce((total, row) => {
      const amount = row.querySelector(".input-amount").value;
      const isExpense = row.querySelector(".input-type").value === "expense";
      const modifier = isExpense ? -1 : 1;

      return total + amount * modifier;
    }, 0);

    const totalFormatted = new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(total);

    this.root.querySelector(".total").innerHTML = totalFormatted;
  }

  save() {
    const data = this.getEntryRow().map((row) => {
      return {
        date: row.querySelector(".input-date").value,
        description: row.querySelector(".input-description").value,
        type: row.querySelector(".input-type").value,
        amount: parseFloat(row.querySelector(".input-amount").value),
      };
    });

    localStorage.setItem("budget-tracker-entries", JSON.stringify(data));
    this.updateSummary();
    //console.log(data);
    //console.log(this.getEntryRow());
  } //localStorage'e kaydetme fonksiyonu
  addEntry(entry = {}) {
    this.root
      .querySelector(".entries")
      .insertAdjacentHTML("beforeend", budgetTracker.entryHtml());

    const row = this.root.querySelector(".entries tr:last-of-type");

    row.querySelector(".input-date").value =
      entry.date || new Date().toISOString().replace(/T.*/, ""); // Gun verisini alip T'den sonrakileri(Bizim isimize yaramayan bilgiler oldugu icin) replace methodu ile ayirdik.
    row.querySelector(".input-description").value = entry.description || "";
    row.querySelector(".input-type").value = entry.type || "income";
    row.querySelector(".input-amount").value = entry.amount;
    row.querySelector(".delete-entry").addEventListener("click", (e) => {
      this.onDeleteEntryBtnClick(e);
    });
    row.querySelectorAll(".input").forEach((input) => {
      input.addEventListener("change", () => this.save());
    });
  }

  getEntryRow() {
    return Array.from(this.root.querySelectorAll(".entries tr"));
  }

  onNewEntryBtnClick() {
    this.addEntry();
  }

  onDeleteEntryBtnClick(e) {
    e.target.closest("tr").remove();
    this.save();
  }
}
