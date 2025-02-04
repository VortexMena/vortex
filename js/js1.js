
// Security: Block keyboard shortcuts
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && (e.key === 'c' || e.key === 's' || e.key === 'p' || e.key === 'u')) {
        e.preventDefault();
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J'))) {
        e.preventDefault();
    }
});

// Security: Disable right-click
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});
// Calculate the target date (20 days from today)
const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + 20);
    targetDate.setHours(14, 0, 0, 0);
    console.log("Target Date:", targetDate);

    function updateCountdown() {
      const now = new Date().getTime();
      const timeRemaining = targetDate - now;
      console.log("Time remaining (ms):", timeRemaining);

      if (timeRemaining < 0) {
        clearInterval(interval);
        document.querySelector(".count_down").innerHTML = "<h1>التسجيل انتهى!</h1>";
        return;
      }

      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      console.log("Countdown:", days, hours, minutes, seconds);

      const numberElements = document.querySelectorAll(".number");
      if (numberElements.length === 4) {
        numberElements[0].textContent = String(days).padStart(2, "0");
        numberElements[1].textContent = String(hours).padStart(2, "0");
        numberElements[2].textContent = String(minutes).padStart(2, "0");
        numberElements[3].textContent = String(seconds).padStart(2, "0");
      } else {
        console.error("Countdown elements not found!");
      }
    }

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Call it immediately

// Form submission and validation
document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("errors").innerHTML = ""; // Clear previous errors
    document.getElementById("errors").style.display = "none"; // Hide the error div initially

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("number").value.trim();
    const birthdate = document.getElementById("date").value.trim();
    const freefireId = document.getElementById("freefire").value.trim();
    const state = document.getElementById("state").value;

    let errors = [];

    // Validate name (should be a full name)
    if (!name.includes(" ")) errors.push("الرجاء ادخال اسمك الكامل");

    // Validate phone (should be 8 digits)
    if (phone.length !== 8 || isNaN(phone)) errors.push("رقم الهاتف يجب أن يتكون من 8 أرقام.");

    // Validate birthdate (should be more than 9 years ago)
    const birthDate = new Date(birthdate);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (age < 9 || (age === 9 && monthDiff < 0)) errors.push("تاريخ الولادة مرفوض");

    // Validate state (should be selected)
    if (!state) errors.push("يجب اختيار ولاية.");

    // Display errors if any
    if (errors.length > 0) {
        document.getElementById("errors").innerHTML = errors.join("<br>");
        document.getElementById("errors").style.display = "block"; // Show errors if any
        return;
    }

    // If there are no errors, proceed with form submission
    const formData = new FormData(this);
    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redirect to the HTML page after successful submission
            window.location.href = "../html/html.html"; // Redirect to the page you want
        } else {
            document.getElementById("errors").innerHTML = "حدث خطأ أثناء إرسال النموذج.";
            document.getElementById("errors").style.display = "block";
        }
    })
    .catch(error => {
        document.getElementById("errors").innerHTML = "حدث خطأ أثناء إرسال النموذج.";
        document.getElementById("errors").style.display = "block";
    });
});
