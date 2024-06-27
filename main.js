function main(canvas_wrapper)
{
    console.log("Iniciando operações.");

    const canvas_element = canvas_wrapper.querySelector("canvas");
    const canvas_obj =
    {
        algorithm_name: canvas_wrapper.dataset.algorithm,
        width: canvas_element.width,
        height: canvas_element.height < 255 ? canvas_element.height : 255,
        ctx: canvas_element.getContext("2d"),
        opInterval: 50
    }

    const graph = new Graph(canvas_obj);
    graph.populateBars(100);
    // console.log(graph);

    // const animationIntervalTimer = 10;
    // const animationInterval = setInterval(() => { graph.update(); }, canvas_obj.opInterval/10);
    render(graph, 5);

    const algo_functions =
    {
        "quicksort": quicksort,
        "mergesort": undefined,
        "bubblesort": undefined,
        "bogosort": undefined
    };

    console.log(Array.from(graph.bars).map(x => x.value));
    // graph.bars.forEach(x => console.log(x.value));


    const current_algorithm = algo_functions[canvas_obj.algorithm_name] || algo_functions["quicksort"];
    current_algorithm(graph, graph.bars, 0, graph.bars.length-1);

}



function render(graph_obj, min_update_time)
{
    const graph = graph_obj;
    const timer = min_update_time;

    var initial_time = null, elapsed_time;

    var finished = false;


    function step(timestamp)
    {
        if(initial_time === null) initial_time = timestamp;

        elapsed_time = timestamp - initial_time;

        if(elapsed_time > timer)
        {
            graph.drawBars();
            // Lógica de desenhar

            initial_time = null;
            elapsed_time = 0;

        }

        if(!finished) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

