// >menu
const menu = document.querySelector(".menu-button");
const nav = document.querySelector("nav");

menu.addEventListener("click", (e) => {
  nav.classList.toggle("open");
  if (nav.classList.contains("open")) {
    e.target.src = "/images/icon-close-menu.svg";
    return;
  }
  e.target.src = "/images/icon-hamburger.svg";
});

// >modal
const modal = document.querySelector(".modal");
const modalCloseButton = modal.querySelector(".close");
const modalOpenButtons = document.querySelectorAll(".block3 .button");

modalOpenButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (!e.target.closest(".card").hasAttribute("data-out-of-stock")) {
      modal.showModal();
    }
  });
});

modalCloseButton.addEventListener("click", () => {
  modal.close();
});

// >pledge plans
const pledgePlans = modal.querySelectorAll(".card");

pledgePlans.forEach((plan) => {
  plan.addEventListener("click", () => {
    const input = plan.querySelector("input");
    const section = plan.getElementsByTagName("div")[0].nextElementSibling;

    if (!plan.hasAttribute("data-out-of-stock")) {
      const pledgeValue = plan.dataset.pledgeValue;

      let selectedPlan = [
        `
          <div>Enter your pledge</div>
          <div class="input">
            <input type="number" value="${pledgeValue}" min="${pledgeValue}" 
          max="${pledgeValue * 3}"/>
          </div>
          <a href="#" class="button button--primary">
            Continue
          </a>
        `,
      ];

      if (!input.checked) {
        section.classList.add("selected__card");
        section.innerHTML = selectedPlan;

        let support = section.querySelector(".button");
        support.addEventListener("click", (e) => {
          e.target.closest(".modal").classList.add("complete");
        });
      }
      input.checked = true;
    }

    pledgePlans.forEach((select) => {
      if (select.querySelector("input").checked)
        select.classList.add("selected");
      else {
        const section =
          select.getElementsByTagName("div")[0].nextElementSibling;
        select.classList.remove("selected");
        section.classList.remove("selected__card");
        section.innerHTML = "";
      }
    });

    const completeButton = modal
      .querySelector(".complete-section")
      .querySelector(".button");

    completeButton.addEventListener("click", (e) => {
      e.target.closest(".modal").classList.remove("complete");
      modal.close();
    });
  });
});
