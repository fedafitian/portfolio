// Select all chevrons and their parent container
const chevrons = document.querySelectorAll('.chevron');
const chevronContainer = document.querySelector('.chevron-container');
const titles = document.querySelectorAll('.title');
const descriptions = document.querySelectorAll('.description');

// Add hover effect to chevrons
chevrons.forEach((chevron, index) => {
  // Add hover class when mouse enters
  chevron.addEventListener('mouseover', () => {
    chevronContainer.classList.add('hover-dim');
  });

  // Remove hover class when mouse leaves
  chevron.addEventListener('mouseout', () => {
    chevronContainer.classList.remove('hover-dim');
  });

  // Ensure titles and descriptions trigger the same hover effect
  const title = titles[index];
  const description = descriptions[index];

  title.addEventListener('mouseover', () => {
    chevronContainer.classList.add('hover-dim');
  });

  title.addEventListener('mouseout', () => {
    chevronContainer.classList.remove('hover-dim');
  });

  description.addEventListener('mouseover', () => {
    chevronContainer.classList.add('hover-dim');
  });

  description.addEventListener('mouseout', () => {
    chevronContainer.classList.remove('hover-dim');
  });
});

// Add click event listener to each chevron
chevrons.forEach((chevron, index) => {
  chevron.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event bubbling

    // If clicked chevron is already selected, unselect it
    if (chevron.classList.contains('selected')) {
      chevron.classList.remove('selected');
      titles[index].classList.remove('selected-title');
      descriptions[index].classList.remove('selected-description');
      chevronContainer.classList.remove('dimmed');
    } else {
      // Remove "selected" class from all chevrons
      chevrons.forEach((c) => c.classList.remove('selected'));
      titles.forEach((t) => t.classList.remove('selected-title'));
      descriptions.forEach((d) => d.classList.remove('selected-description'));

      // Add "selected" to the clicked chevron
      chevron.classList.add('selected');
      titles[index].classList.add('selected-title');
      descriptions[index].classList.add('selected-description');
      chevronContainer.classList.add('dimmed');
    }
  });
});

// Deselect all chevrons when clicking outside
document.addEventListener('click', (e) => {
  if (!chevronContainer.contains(e.target)) {
    chevrons.forEach((chevron) => chevron.classList.remove('selected'));
    titles.forEach((title) => title.classList.remove('selected-title'));
    descriptions.forEach((desc) => desc.classList.remove('selected-description'));
    chevronContainer.classList.remove('dimmed');
  }
});
