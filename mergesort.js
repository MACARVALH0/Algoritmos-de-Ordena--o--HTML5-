async function mergesort(graph, arr, left, right)
{
    if(left < right)
    {
        let mid = parseInt(left + (right - left) / 2);
        
        graph.updateCurrentBlock(left, right);
        await mergesort(graph, arr, left, mid);
        await mergesort(graph, arr, mid+1, right);
        graph.updateCurrentBlock(left, right);

        await merge(graph, arr, left, mid, right);
    }

}

async function merge(graph, arr, left, mid, right)
{
    let i = 0, j = 0, k = left;
    let len_i = mid-left+1;
    let len_j = right-mid;

    let [L, R] = [[],[]];

    // Populando os sub-arrays do array principal.
    for(let a = 0; a < len_i; a++) L.push(arr[left+a]);
    for(let b = 0; b < len_j; b++) R.push(arr[mid+b+1]);

    while(i < len_i && j < len_j) // FIXME
    {
        if(L[i].value <= R[j].value)
        {
            let a = k;
            let b = left+i;
            
            graph.set(a, L[i]);
            i++;
        }

        else
        {
            let a = k;
            let b = mid+j;

            graph.set(a, R[j]);
            j++;
        }

        k++;
        graph.comparisonCount++;
        await graph.sleep();
    }


    // Adicionando os itens que restaram na array.
    while(i < len_i)
    {
        graph.set(k, L[i]);
        i++;
        k++;
    }

    while(j < len_j)
    {
        graph.set(k, R[j]);
        j++;
        k++;
    }
}