async function quicksort(graph, array, left, right)
{
    graph.updateCurrentBlock(left, right);

    if(left < right)
    {
        let pivot_index = await partition(graph, array, left, right);

        await quicksort(graph, array, left, pivot_index-1);
        await quicksort(graph, array, pivot_index+1, right);
    }
}


/// Particionamento de Lomuto
async function partition(graph, array, left, right)
{
    let pivot_value = array[left].value;
    graph.highlightBar(left);

    let i = left;

    for(j = left+1; j <= right; j++)
    {
        if(array[j].value <= pivot_value)
        {
            i+=1;
            if(i === j) continue;

            graph.swap(i, j);
            await graph.sleep();
        }
        
        graph.comparisonCount++;

    }

    await graph.swap(left, i);
    await graph.sleep();

    return i;
}