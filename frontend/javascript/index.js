import FetchWrapper from "./fetchwrapper.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

if($("#mobile-menu-toggle")) {
mobileMenu();
}
function mobileMenu() {
  const mobileMenu = $(".mobile-menu");
  $("#mobile-menu-toggle").addEventListener("click", () => {
    if (mobileMenu.style.display === "block") {
      mobileMenu.style.display = "none";
    } else {
      mobileMenu.style.display = "block";
    }
  });
  $("section").addEventListener("click", () => {
    mobileMenu.style.display = "none";
  }); 
}

if($("#get-user-button")) {
$("#get-user-button")
.addEventListener("click", (event) => {
    event.target.disabled = true;
    event.target.innerHTML = `
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    `;

    const getUserResult = $("#get-user-result");

    //const API = new FetchWrapper("http://localhost:3000/api/v1/users/"); // For testing on local server
    const API = new FetchWrapper("https://gotousers.herokuapp.com/api/v1/users/");

    API
      .get("getOneUser")
      .then((data) => {
        getUserResult.innerHTML = `
        <pre><code>{
    "name": "${data.record.firstName} ${data.record.lastName}",
    
    "age": "${data.record.age}",
    
    "email": "${data.record.email}",
    
    "phone": "${data.phone}",
    
    "occupation": "${data.jobTitle} at ${data.company}",
}</code></pre>
        `;
      })
      .catch((error) => {
        getUserResult.innerHTML = `
            <pre><code>
            ${error}
            </code></pre>
            `;
      })
      .finally(() => {
        getUserResult.style.height = "354px";
        event.target.disabled = false;
        event.target.innerHTML = "GET USER";
      });

    /* Hardcoded user result
    getUserResult.innerHTML = `
        <pre><code>
{
    "name": "John Doe",
    
    "age": "42",
    
    "email": "johnny37@gmail.com",
    
    "phone": "555-555-5555",
    
    "occupation": "Web Developer"
}
        </code></pre>
    
    <span id="view-docs-link"><a href="./resources/docs/getting-started.html">View Documentation</a></span>
        `;
    */
  });
}