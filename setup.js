window.addEventListener("load", () =>
{
    const algorithms = new Map();
    algorithms.set("insertionsort", insertionsort);
    algorithms.set("quicksort", quicksort);

    const canvas = Array.from(document.querySelectorAll(".canvas-wrapper")).map( canvas =>
    { return {wrapper: canvas, algorithm: algorithms.get(canvas.dataset.algorithm), render: undefined} }); // Cada canvas possui seu objeto de contexto

    for(let item of canvas)
        item.wrapper.querySelector("input").addEventListener("click", () => main(item));
});