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
    // console.log("\nMesclando listas");
    // console.log("Left: "+left + ", Mid: "+mid +  ", Right: "+right);

    let i = 0, j = 0, k = left;
    let len_i = mid-left+1 // Isso tá certo
    let len_j = right-mid; // Isso também tá certo

    let [L, R] = [[],[]];

    // Populando os sub-arrays do array principal.
    for(let a = 0; a < len_i; a++) L.push(arr[left+a]); // Correto
    for(let b = 0; b < len_j; b++) R.push(arr[mid+b+1]); // Correto

    // console.log("Grupo: {" + Array.from(L.concat(R)).map(x => " "+x.value) + " }");

    // console.log("Esquerda:", arr_i);
    // console.log("Esquerda: {" + Array.from(L).map(x => x.value) + "}");
    // console.log("Direita:", arr_j);
    // console.log("Direita: {" + Array.from(R).map(x => x.value) + "}");

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
    // console.log("Adicionando itens restantes...");
    while(i < len_i)
    {
        // console.log("Subvetor à esquerda");
        graph.set(k, L[i]);
        // arr[k] = L[i];
        i++;
        k++;
    }

    while(j < len_j)
    {
        // console.log("Subvetor à direita");
        graph.set(k, R[j]);
        // arr[k] = R[j];
        j++;
        k++;
    }
    
}