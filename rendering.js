function renderGraph(graph_obj, canvas)
{
    const graph = graph_obj;
    const timer = graph_obj.animationInterval;

    const draw = graph_obj.render.bind(graph);

    var initial_time = null, elapsed_time;

    function step(timestamp)
    {
        if(initial_time === null) initial_time = timestamp;

        elapsed_time = timestamp - initial_time;

        if(elapsed_time > timer)
        {
            draw();

            initial_time = null;
            elapsed_time = 0;
        }


        if(graph_obj.animationFinished)
        {
            canvas.render = undefined;
            draw();
            return;
        }

        canvas.render = requestAnimationFrame(step);
    }

    canvas.render = requestAnimationFrame(step);
}