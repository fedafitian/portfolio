const gridItems = Array.from(document.querySelectorAll(".grid-item"));
    const viewportHeight = window.innerHeight;
  
    // Helper: Group items into rows (2 items per row)
    function groupItemsIntoRows(items, itemsPerRow = 2) {
      const rows = [];
      for (let i = 0; i < items.length; i += itemsPerRow) {
        rows.push(items.slice(i, i + itemsPerRow));
      }
      return rows;
    }
  
    // Apply overlay logic on scroll
    function applyOverlayLogic() {
      const viewportWidth = window.innerWidth;
      const scrollTop = window.scrollY || document.documentElement.scrollTop; // Get current scroll position
  
      // Exclude logic for window sizes greater than 1024px
      if (viewportWidth > 1024) {
        gridItems.forEach((item) => {
          item.classList.remove("scrolled-past", "scrolled-fade");
        });
        return;
      }
  
      // Do not apply overlay if scroll is at the top for screen sizes ≤ 1024px
      if (scrollTop === 0) {
        gridItems.forEach((item) => {
          item.classList.remove("scrolled-past", "scrolled-fade");
        });
        return;
      }
  
      // Logic for tablet sizes (768px < Width ≤ 1024px)
      if (viewportWidth > 768 && viewportWidth <= 1024) {
        const rows = groupItemsIntoRows(gridItems, 2);
        let mostRelevantRow = null;
        let maxVisiblePercentage = 0;
  
        rows.forEach((row) => {
          const visiblePercentages = row.map((item) => {
            const rect = item.getBoundingClientRect();
            const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
            return (visibleHeight / rect.height) * 100; // Percentage visibility
          });
  
          const rowAverageVisibility = visiblePercentages.reduce((a, b) => a + b, 0) / row.length;
  
          if (rowAverageVisibility > maxVisiblePercentage) {
            maxVisiblePercentage = rowAverageVisibility;
            mostRelevantRow = row;
          }
        });
  
        // Check for special logic at the bottom of the page
        const isAtPageEnd =
          Math.ceil(window.scrollY + viewportHeight) >= document.documentElement.scrollHeight;
  
        if (isAtPageEnd && rows.length > 1) {
          const lastRow = rows[rows.length - 1];
          const secondToLastRow = rows[rows.length - 2];
          const lastRowVisiblePercentages = lastRow.map((item) => {
            const rect = item.getBoundingClientRect();
            const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
            return (visibleHeight / rect.height) * 100;
          });
  
          const secondToLastRowVisiblePercentages = secondToLastRow.map((item) => {
            const rect = item.getBoundingClientRect();
            const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
            return (visibleHeight / rect.height) * 100;
          });
  
          const isLastRowLessThan20 = Math.min(...lastRowVisiblePercentages) < 20;
          const isSecondToLastRow100Visible = secondToLastRowVisiblePercentages.every(
            (percentage) => percentage === 100
          );
  
          if (isLastRowLessThan20 && isSecondToLastRow100Visible) {
            mostRelevantRow = secondToLastRow; // Highlight second-to-last row
          } else {
            mostRelevantRow = lastRow; // Highlight last row
          }
        }
  
        // Reset all overlays
        gridItems.forEach((item) => {
          item.classList.remove("scrolled-past", "scrolled-fade");
        });
  
        // Apply overlay effect to the most relevant row
        if (mostRelevantRow) {
          mostRelevantRow.forEach((item) => item.classList.add("scrolled-past"));
        }
  
        return; // Skip logic for smaller screens
      }
  
      // Logic for mobile devices (Width ≤ 768px)
      let mostRelevantItem = null;
      let minDistanceToScroll = Infinity;
  
      gridItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const visibilityPercentage = (visibleHeight / rect.height) * 100;
  
        // Check for "scroll at end" logic for mobile
        const isAtPageEnd =
          Math.ceil(window.scrollY + viewportHeight) >= document.documentElement.scrollHeight;
  
        if (isAtPageEnd && index === gridItems.length - 1) {
          if (visibilityPercentage < 45 && index > 0) {
            mostRelevantItem = gridItems[index - 1]; // Highlight second-to-last item
          } else {
            mostRelevantItem = item; // Highlight last item
          }
          return; // Skip further processing for this condition
        }
  
        // Determine the most relevant item based on visibility and distance to the center
        if (visibilityPercentage > 0.5) {
          const distanceToCenter = Math.abs(
            rect.top + rect.height / 2 - viewportHeight / 2
          );
          if (distanceToCenter < minDistanceToScroll) {
            mostRelevantItem = item;
            minDistanceToScroll = distanceToCenter;
          }
        }
      });
  
      // Reset all overlays
      gridItems.forEach((item) => {
        item.classList.remove("scrolled-past", "scrolled-fade");
      });
  
      // Apply overlay effect to the most relevant item
      if (mostRelevantItem) {
        mostRelevantItem.classList.add("scrolled-past");
      }
    }
  
    // Handle hover logic
    gridItems.forEach((item) => {
      item.addEventListener("mouseover", () => {
        if (window.innerWidth > 1024) return;
  
        gridItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("scrolled-past");
            otherItem.classList.add("scrolled-fade");
          }
        });
  
        item.classList.add("scrolled-past");
        item.classList.remove("scrolled-fade");
      });
  
      item.addEventListener("mouseout", () => {
        if (window.innerWidth > 1024) return;
        applyOverlayLogic();
      });
    });
  
    // Apply logic on scroll
    window.addEventListener("scroll", applyOverlayLogic);
  
    // Initial logic on page load
    document.addEventListener("DOMContentLoaded", () => {
      gridItems.forEach((item) => {
        item.classList.remove("scrolled-past", "scrolled-fade");
      });
      applyOverlayLogic();
    });
  
    // Reapply logic on resize
    window.addEventListener("resize", applyOverlayLogic);