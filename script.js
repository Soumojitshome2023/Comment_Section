
load();

// ==============================================================================
// ===============================Button Disabled===============================
setInterval(() => {
    if (document.getElementById("cmnt").value.trim() != "") {

        document.getElementById("submit-btn").disabled = false;

    }
    else {
        document.getElementById("submit-btn").disabled = true;

    }

}, 1000);

// ============================================================================
// ================================Message Add================================

function cmntadd() {

    let a = document.getElementById("cmnt").value;
    // console.log(a)


    let b = `<div class="comment">
    <span class="comment_message">${a}</span>
</div>`


    // document.querySelectorAll(".all_comments")[0].innerHTML += b

    document.getElementById("cmnt").style.display = "none";
    document.getElementById("submit-btn").style.display = "none";
    document.getElementById("wait_mess").style.display = "block";

    setTimeout(() => {
        document.querySelectorAll(".all_comments")[0].innerHTML += b

    }, 3000);
    setTimeout(() => {
        document.getElementById("wait_mess").style.display = "none";
        document.getElementById("tnx_mess").style.display = "block";


    }, 4000);

    setTimeout(() => {
        // document.getElementById("tnx_messs").style.display = "none";
        // document.getElementById("cmnt").value = "";
        // document.getElementById("cmnt").style.display = "block";
        // document.getElementById("submit-btn").style.display = "block";

        location.reload();
        
    }, 7000);


    myFunction();



}
// ==========================================================================
// ===============================Dtat Submit===============================

function myFunction() {
    const scriptURL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfl3wyaxh7fzfbbWXDSlw9dvyNwAvXJQ2W_ZBJr9G2c8eboVQ/formResponse'
    const form = document.forms['submit-to-google-sheet']
    // const success = document.getElementById('success');
    form.addEventListener('submit', e => {
        e.preventDefault()
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => console.log('Success!', response))


            .catch(error => console.error('Error!', error.message))

    })

}

// ==========================================================================
// ===============================Message Load===============================


function load() {

    let SHEET_ID = '1a09KB_mVac2ydFubqh4mvYfK-2VXiYG1_8_N8Gy4gUs'
    let SHEET_TITLE = 'Form responses 1';
    let SHEET_RANGE = 'A1:B100'

    let FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);

    fetch(FULL_URL)
        .then(res => res.text())
        .then(rep => {
            let data = JSON.parse(rep.substr(47).slice(0, -2));


            let length = data.table.rows.length;

            // console.log(data);
            // console.log(data.table.rows[2].c[0].v);

            // document.getElementById("abc").innerHTML = data.table.rows[2].c[0].v;

            let j = 1;

            for (let i = 0; i < length; i++) {


                let b = `<div class="comment">
    <span class="comment_message">${j + '. ' + data.table.rows[i].c[1].v}</span>
</div>`

                document.querySelectorAll(".all_comments")[0].innerHTML += b

                j++;

            }
        })
}


// ======================================================================================