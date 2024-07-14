async function main(canvas)
{
    if(canvas.render)
    {
        console.log("O algoritmo já está em execução");
        return null;
    }

    const canvas_element = canvas.wrapper.querySelector("canvas");
    const canvas_obj =
    {
        algorithm: canvas.algorithm,
        width: canvas_element.width,
        height: canvas_element.height < 255 ? canvas_element.height : 255,
        ctx: canvas_element.getContext("2d"),
        opInterval: 1
    }

    const graph = new Graph(canvas_obj);
    graph.populateBars(1000);

    graph.beginAnimation(renderGraph, canvas);
    await graph.runAlgorithm();
    await graph.repaint();
    graph.endAnimation();
}