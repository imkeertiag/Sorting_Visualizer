async function countSort() {
    console.log('In countSort()');
    const bars = document.querySelectorAll(".bar");
    const n = bars.length;
    let max = 0;
    for (let i = 0; i < n; i++) {
        let barHeight = parseInt(bars[i].style.height);
        if (barHeight > max) {
            max = barHeight;
        }
    }
    let count = new Array(max + 1).fill(0);
    for (let i = 0; i < n; i++) {
        let barHeight = parseInt(bars[i].style.height);
        count[barHeight]++;
        bars[i].style.background = 'blue';
        await waitforme(delay);
        bars[i].style.background = 'cyan';
    }

    // Modify the count array such that each element at each index stores the sum of previous counts
    for (let i = 1; i <= max; i++) {
        count[i] += count[i - 1];
    }

    // Create a temporary array to store sorted elements
    let output = new Array(n);
    for (let i = n - 1; i >= 0; i--) {
        let barHeight = parseInt(bars[i].style.height);
        output[count[barHeight] - 1] = bars[i].style.height;
        count[barHeight]--;
    }

    // Copy the sorted elements back to the original array and visualize the sorting
    for (let i = 0; i < n; i++) {
        bars[i].style.height = output[i];
        bars[i].style.background = 'green'; 
        await waitforme(delay);
        bars[i].style.background = 'cyan';
    }
}
const countSortBtn = document.querySelector(".countSort");
countSortBtn.addEventListener('click', async function() {
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await countSort();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});