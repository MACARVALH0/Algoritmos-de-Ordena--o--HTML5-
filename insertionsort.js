async function insertionsort(graph, array)
{
    const len = array.length;

    for(let i = 1; i<len; i++)
    {
        let pos = await findPos(graph, array, i);
        array[i].highlight(true);

        if(pos != i)
        {
            graph.insertBefore(i, pos);
            await graph.sleep();
        }

        array[pos].highlight(false);
    }
}

async function findPos(graph, array, right)
{
    pos = right;

    for(let j = right-1; j >= 0; j--)
    {
        if(array[right].value <= array[j].value || array[j] === undefined)
        {
            pos = j;
        }
        
        else return pos;
        
        graph.comparisonCount++;
        // await graph.sleep();
    }

    return pos;
}