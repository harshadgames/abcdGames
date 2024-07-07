const triggerDiv = document.getElementById("notifyMe");
let popupForm = document.getElementById("popupForm");
const closeBtn = document.getElementById("closeBtn");
let feedbackForm = document.getElementById("feedbackForm");
let formContent = document.getElementsByClassName("form-content");
let thankContent = document.getElementsByClassName("thank-content");
let contactForm = document.getElementById("contactForm");

function handleButtonClick(event) {
  console.log(event.target.classList);
  // Check if the clicked element has the class 'specific-class'
  if (event.target.classList.contains("notifyMe")) {
    // Take action if the element has the specific class
    console.log("An element with the specific class was clicked!");
    popupForm.style.display = "flex";
    // Add your custom action here
  }
}

document.addEventListener("click", handleButtonClick);

//document.addEventListener("click", handleNotifyClick);

// Hide the popup form when the close button is clicked
closeBtn.addEventListener("click", () => {
  popupForm.style.display = "none";
  feedbackForm.style.display = "inline";
  document.getElementById("popup-header").querySelector("h3").innerHTML =
    "Notify Me";
});

// Hide the popup form when clicking outside the form content

let url =
  "https://script.google.com/macros/s/AKfycbzQiuRNhFaJxtp7Bl-8ws_dXVJlmFTC7kLULFS2F5hZgv69NMi26BOM6YEJSWDDHQQM/exec";

// Handle form submission
feedbackForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission

  e.target.btn.innerHTML = "Submitting...";

  // Create a FormData object from the feedback form
  let d = new FormData(feedbackForm);

  /*
  // Append additional data to the FormData object
  const currentDate = new Date().toISOString();
  d.append("time", currentDate);
*/

  const formId = feedbackForm.className;
  d.append("time", formId);

  // Send the FormData object using fetch
  fetch(url, { method: "POST", body: d })
    .then((res) => res.text())
    .then((finalResp) => {
      e.target.btn.innerHTML = "Submit";
      feedbackForm.reset();
      document.getElementById("popup-header").querySelector("h3").innerHTML =
        "Thank You";
      console.log(finalResp);

      feedbackForm.style.display = "none";
    })
    .catch((error) => {
      console.error("Error:", error);
      e.target.btn.innerHTML = "Submit";
    });
});

// Handle contact us submission //

contactForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission

  e.target.btn.innerHTML = "Submitting...";

  // Create a FormData object from the feedback form
  let d = new FormData(feedbackForm);

  /*
  // Append additional data to the FormData object
  const currentDate = new Date().toISOString();
  d.append("time", currentDate);
*/

  const formId = contactForm.className;
  d.append("time", formId);

  // Send the FormData object using fetch
  fetch(url, { method: "POST", body: d })
    .then((res) => res.text())
    .then((finalResp) => {
      e.target.btn.innerHTML = "Submit";
      feedbackForm.reset();
      document
        .getElementById("contact-form-header")
        .querySelector("h3").innerHTML = "Thank You";
      console.log(finalResp);

      feedbackForm.style.display = "none";
    })
    .catch((error) => {
      console.error("Error:", error);
      e.target.btn.innerHTML = "Submit";
    });
});

document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
  });
});
