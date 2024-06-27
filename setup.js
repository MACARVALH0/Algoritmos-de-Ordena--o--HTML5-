window.addEventListener("load", () =>
{
    const canvas_list = document.querySelectorAll(".canvas-wrapper");

    for(let item of canvas_list) item.querySelector("input").addEventListener("click", () => main(item));

});