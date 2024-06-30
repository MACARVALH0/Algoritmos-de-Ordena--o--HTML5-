async function main(canvas_wrapper, animation)
{
    if(animation.loop)
    {
        console.log("O algoritmo já está em execução")
    }

    const canvas_element = canvas_wrapper.querySelector("canvas");
    const canvas_obj =
    {
        algorithm_name: canvas_wrapper.dataset.algorithm,
        width: canvas_element.width,
        height: canvas_element.height < 255 ? canvas_element.height : 255,
        ctx: canvas_element.getContext("2d"),
        opInterval: 5
    }

    const graph = new Graph(canvas_obj);
    graph.populateBars(350);
    // console.log(Array.from(graph.bars).map(x => x.value));

    graph.beginAnimation(renderGraph, animation);

    await graph.runAlgorithm();
    await graph.repaint();
    graph.endAnimation();
}