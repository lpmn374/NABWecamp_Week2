const selectBoxes = document.querySelectorAll(".select-box");

selectBoxes.forEach((box) => {
  const flag = box.querySelector(".flag-icon");
  const select = box.querySelector("select");

  const updateFlag = () => {
    const selectedOption = select.options[select.selectedIndex];
    flag.src = selectedOption.dataset.flag;
    flag.alt = `${selectedOption.value} flag`;
  };

  select.addEventListener("change", updateFlag);
  updateFlag();
});
