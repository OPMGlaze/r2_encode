let tl = gsap.timeline({ delay: 0 });

tl.to(".col", {
  top: 0,
  duration: 2.75,
  ease: "power4.inOut",
});

tl.to(".c-1 .item", {
  top: 0,
  stagger: 0.25,
  duration: 2.75,
  ease: "power4.inOut",
}, "-=2");

tl.to(".c-2 .item", {
  top: 0,
  stagger: -0.25,
  duration: 2.75,
  ease: "power4.inOut",
}, "-=4");

tl.to(".c-3 .item", {
  top: 0,
  stagger: 0.25,
  duration: 2.75,
  ease: "power4.inOut",
}, "-=4");

tl.to(".c-4 .item", {
  top: 0,
  stagger: -0.25,
  duration: 2.75,
  ease: "power4.inOut",
}, "-=4");

tl.to(".c-5 .item", {
  top: 0,
  stagger: 0.25,
  duration: 2.75,
  ease: "power4.inOut",
}, "-=4");

tl.to(".container", {
  scale: 6,
  duration: 3,
  ease: "power4.inOut",
}, "-=2");

tl.to(".container", {
  opacity: 0,
  duration: 1,
  delay: 0.5,
  ease: "power2.out",
});

tl.to("svg#svg1", {
  filter: "blur(0px)",
  duration: 0,
});

tl.to("svg#svg1", {
  filter: "blur(3.5px)",
  duration: 2,
  ease: "power2.out",
}, "+=1.5");

window.addEventListener("DOMContentLoaded", () => {
  gsap.to("#title", {
    opacity: 1,
    y: -20,
    duration: 1.2,
    ease: "power2.out",
    delay: 6,
  });

  gsap.to("#questionBox", {
    opacity: 1,
    y: -10,
    duration: 1.4,
    ease: "power2.out",
    delay: 6,
  });

  // Question navigation
  const questions = document.querySelectorAll(".question");
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");
  const questionBox = document.querySelector("#questionBox");
  let currentIndex = 0;

  function updateBoxHeight() {
    const activeQuestion = questions[currentIndex];
    questionBox.style.height = "auto";
    const newHeight = Math.max(activeQuestion.offsetHeight + 120, 300); // Ensure minimum height
    gsap.to(questionBox, {
      height: newHeight,
      duration: 0.5,
      ease: "power2.inOut",
    });
  }

  function updateButtons() {
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === questions.length - 1;
  }

  function showQuestion(newIndex, direction) {
    if (newIndex < 0 || newIndex >= questions.length) return;

    const currentQuestion = questions[currentIndex];
    const newQuestion = questions[newIndex];

    gsap.to(currentQuestion, {
      opacity: 0,
      x: direction === "next" ? -50 : 50,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        currentQuestion.classList.remove("active");
        newQuestion.classList.add("active");
        gsap.fromTo(
          newQuestion,
          { opacity: 0, x: direction === "next" ? 50 : -50 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.in" }
        );
        currentIndex = newIndex;
        updateButtons();
        updateBoxHeight();
      },
    });
  }

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      showQuestion(currentIndex - 1, "prev");
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < questions.length - 1) {
      showQuestion(currentIndex + 1, "next");
    }
  });

  // Initial height setup
  updateBoxHeight();
  updateButtons();

  // Update height on window resize
  window.addEventListener("resize", updateBoxHeight);
});

// Fallback to ensure visibility if GSAP fails
setTimeout(() => {
  document.querySelector("#title").style.opacity = "1";
  document.querySelector("#questionBox").style.opacity = "1";
}, 7000);
