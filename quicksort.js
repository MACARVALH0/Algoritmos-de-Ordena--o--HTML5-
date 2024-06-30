async function quicksort(graph, array, left, right)
{
    graph.updateCurrentBlock(left, right);
    // console.log(`\nGrupo número ${++group}. \nLeft: ${left}, Right: ${right}`);
    if(left < right)
    {
        let pivot_index = await partition(graph, array, left, right);
        // console.log("Índice do pivô: ", pivot_index);

        await quicksort(graph, array, left, pivot_index-1);
        await quicksort(graph, array, pivot_index+1, right);
    }
}

/// Particionamento de Lomuto
async function partition(graph, array, left, right)
{
    let pivot_value = array[left].value;
    graph.highlightBar(left);
    // array[left].color = "rgb(30, 30, 30)";
    // console.log("\tO pivô é", pivot_value);

    let i = left;

    for(j = left+1; j <= right; j++)
    {
        if(array[j].value <= pivot_value)
        {
            // console.log("\t" + array[j].value + " é menor ou igual ao pivô.")
            i+=1;

            if(i === j) continue;

            await graph.swap(i, j);
        }
    }

    // console.log("left: " + left + " i: " + i);
    await graph.swap(left, i);


    return i;
}

// var group = 0;