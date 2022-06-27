const addBox = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  popupTitle = popupBox.querySelector("header p");
(closeIcon = popupBox.querySelector("header i")),
  (descTag = popupBox.querySelector("textarea")),
  (titleTag = popupBox.querySelector("input")),
  (addBtn = popupBox.querySelector("button"));

const months = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
]; // Id degil ay olarak gostermek icin gereken array
const notes = JSON.parse(localStorage.getItem("notes") || "[]"); //localStorage'daki verileri array'e atama

let isUpdate = false,
  updateId;

addBox.addEventListener("click", () => {
  titleTag.focus(); // Not eklendikten sonra baslik sekmesine focuslanma(imlec'i getirme)
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = ""; // Not eklendikten sonra onceki verilerin silinmesi
  descTag.value = "";
  addBtn.innerText = "Not Ekle";
  popupTitle.innerText = "Yeni bir not ekleyin.";
  popupBox.classList.remove("show");
});

function showNotes() {
  document.querySelectorAll(".note").forEach((note) => note.remove()); // Arka arkaya not eklemenin onune gecme
  notes.forEach((note, index) => {
    let liTag = `
        <li class="note">
        <div class="details">
            <p>${note.title}</p>
            <span>
            ${note.description}

            </span>
        </div>
        <div class="bottom-content">
            <span>
                ${note.date}
            </span>
            <div class="settings">
                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                <ul class="menu">
                    <li onclick ="updateNote(${index},'${note.title}','${note.description}')"><i class="uil uil-pen">Düzenle</i>
                    </li>
                    <li onclick = "deleteNote(${index})"><i class="uil uil-trash">Sil</i>
                    </li>
                </ul>
            </div>
        </div>
    </li>`;

    addBox.insertAdjacentHTML("afterend", liTag);
  });
}
showNotes();

function deleteNote(noteId) {
  let confirmDel = confirm("Silmek istediğinize emin misiniz?");
  if (!confirmDel) return;
  notes.splice(noteId, 1); // Seçilen notu kaldırma
  console.log(noteId);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function updateNote(noteId, title, desc) {
  isUpdate = true;
  updateId = noteId;
  titleTag.value = title;
  descTag.value = desc;
  addBox.click();
  addBtn.innerText = "Düzenle";
  popupTitle.innerText = "Notu Düzenle";
  console.log(noteId, title, desc);
}

function showMenu(element) {
  element.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != element)
      element.parentElement.classList.remove("show");
    localStorage.setItem("notes", JSON.stringify(notes));
  });
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let noteTitle = titleTag.value,
    noteDesc = descTag.value;

  if (noteTitle || noteDesc) {
    let dateObj = new Date(),
      day = dateObj.getDate(),
      month = months[dateObj.getMonth()],
      year = dateObj.getFullYear();

    let noteInfo = {
      title: noteTitle,

      description: noteDesc,
      date: ` ${day} 
      ${month}  ${year}`,
    };

    if (!isUpdate) {
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }

    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    closeIcon.click();

    //console.log(noteInfo);
    //console.log("Ay: ", month," Gün: ", day, "Yıl: ", year );
    //console.log("Not Başlığı : " ,noteTitle, "Not :", noteDesc )
  }
});
