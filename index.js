let nFields = 1;
let fieldsets = [document.getElementsByTagName("fieldset")[0]];

const toRussian = {
    "usual": "обычное",
    "no-fat": "обезжиренное",
    "soy": "соевое",
    "coconut": "кокосовое"
};

function cloneText(textarea, parent) {
    parent.getElementsByClassName("comment")[0].innerHTML = textarea.value
        .replace(/(срочно)|(быстрее)|(побыстрее)|(скорее)|(поскорее)|(очень нужно)/gi, "<b>$&</b>");
}

function callModalWindow() {
    const modalWindowText = document.getElementById("modalWindowText");
    modalWindowText.innerText = `Вы заказали ${nFields} ${getRightForm(nFields)}`;

    const overlay = document.getElementsByClassName("overlay")[0];
    overlay.style.display = "flex";

    const tbody = overlay.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";


    for (let fieldset of fieldsets) {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerText = fieldset.getElementsByTagName("select")[0].selectedOptions[0].textContent;

        let td2 = document.createElement("td");
        fieldset.querySelectorAll('input[type="radio"]').forEach((x) => {
            if (x.checked) {
                td2.innerText = toRussian[x.value];
            }
        });

        let td3 = document.createElement("td");
        fieldset.querySelectorAll('input[type="checkbox"]').forEach((x) => {
            if (x.checked) {
                if (td3.innerText.length !== 0) {
                    td3.innerText += ", ";
                }
                td3.innerText += x.parentElement.querySelector('span').textContent;
            }
        });

        let td4 = document.createElement("td");
        td4.innerText = fieldset.getElementsByClassName("comment")[0].textContent;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tbody.appendChild(tr);
    }
}

function getRightForm(amount) {
    const mod = amount % 100;

    if (mod % 10 >= 5 || mod % 10 === 0 || Math.trunc(mod / 10) === 1) {
        return "напитков";
    }
    if (mod % 10 > 1 && mod % 10 <= 4) {
        return "напитка";
    }
    return "напиток";
}


function removeModalWindow() {
    document.getElementsByClassName("overlay")[0].style.setProperty("display", "none");
    document.querySelector('input[type="time"]').style.background = '';
}

document.getElementById("modalWindowCloseButton" + "").addEventListener("click", () => removeModalWindow());
document.getElementsByClassName("overlay")[0].style.setProperty("display", "none");
document.getElementsByClassName("submit-button")[0].addEventListener("click", () => callModalWindow());
document.getElementsByClassName("orderButton")[0].addEventListener("click", () => {
    let time = document.getElementById('time').value.split(':');
    let h = time[0];
    let m = time[1];
    let nH = new Date().getHours();
    let nM = new Date().getMinutes();

    if (h > nH || m > nM) {
        if (h > nH)
            removeModalWindow();
        else if (h === nH && m >= nM)
            removeModalWindow();
    } else {
        document.querySelector('input[type="time"]').style.background = 'red';
    }
});