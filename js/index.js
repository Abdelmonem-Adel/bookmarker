
var siteNameInbut = document.getElementById("siteName");
var siteUrlInbut = document.getElementById("siteUrl");

var sitesList = []


if(localStorage.getItem("sitesContainer") !== null) {
    sitesList  =  JSON.parse( localStorage.getItem("sitesContainer") );
    desplayData();

}



// ------------------------------------------x  


function submitBtn(){

if( validationInputs( siteNameInbut , "msgName") && validationInputs( siteUrlInbut , "msgUrl") ) {

    var task = {
        name : siteNameInbut.value,
        url : siteUrlInbut.value,
    };

    sitesList.push(task)

localStorage.setItem( "sitesContainer"   , JSON.stringify(sitesList)   )

desplayData()

clearForm()

}
else{

    showAlert()
}
        
}


function desplayData() {


    var container = ""

    for( var i = 0    ; i <  sitesList.length        ;  i++   ) {

        container += `

        <tr>
                            <th>${i + 1}</th>
                            <th>${ sitesList[i].name }</th>
                            <th>
                                <button onclick="visiteSite('${sitesList[i].url}')" type="button" class="visitBtn btn btn-danger"><i class="fa-solid fa-eye"></i>  Visit</button>
                            </th>
                            <th>
                                <button onclick="delSite(${i})" type="button" class="delBtn btn btn-danger"><i class="fa-solid fa-trash-can"></i>  Delete</button>
                            </th>
                        </tr>

        `

    };

    document.getElementById("tableData").innerHTML = container;
}

function clearForm() {
    siteNameInbut.value = null
    siteUrlInbut.value = null
}


function visiteSite(visitUrl){
    
    window.open("https://" + visitUrl,'_blank')

}

function delSite(index) {

    sitesList.splice(index  ,  1 );

    localStorage.setItem( "sitesContainer"   , JSON.stringify(sitesList)   )

    desplayData()

}


function showAlert() {
    Swal.fire({
        title: 'Warning!',
        html: `
            <p>Site name or URL is invalid. Please check the following requirements:</p>
            <ul style="text-align: left; margin-left: 20px;">
                <li>Site name must contain at least 3 characters. </li>
                <li>Site URL must be a valid one.</li>
            </ul>
        `,
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3498db',
    });
}



function validationInputs( element , msgId) {
    var text = element.value;

    var regex = {
        siteName : /^[a-zA-Z\s]{3,20}$/,
        siteUrl : /^www\.[a-z]{3,30}\.(com|net|io)$/
    }

    var msg = document.getElementById(msgId);

    if(regex[element.id].test(text) == true) {

        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        msg.classList.add("d-none");
        return true;
    } 
    else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        msg.classList.remove("d-none");
        return false;
    }
}

