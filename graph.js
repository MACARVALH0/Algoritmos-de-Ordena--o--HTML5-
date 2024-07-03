class Graph
{
    constructor(canvas)
    {
        this.algorithm = canvas.algorithm;
        this.w = canvas.width;
        this.h = canvas.height;
        this.ctx = canvas.ctx;
        this.opInterval = canvas.opInterval;

        this.bars = [];
        this.bars_len = 0;
        this.bar_width = 1;
        this.highlightedIndex = 0;
        this.highlightColor = "rgb(30, 30, 30)";

        this.currentGroup = {x: 0, width: 0};
        this.comparisonCount = 0;

        this.animationFinished = true;
        this.animationLoop = undefined;
        this.animationInterval = 1000/120;
    }


    populateBars(amount)
    {
        if(this.bars.length > 0) this.bars.splice(0, this.bars.length);

        const expected_amount = Math.abs(amount);
        const min_bar_width = .2;
        const final_bar_width = this.w/expected_amount > min_bar_width ? this.w/expected_amount : min_bar_width; // bar graphic width value
        const final_amount = final_bar_width * expected_amount <= this.w ? expected_amount : Math.floor(this.w/final_bar_width); // Actual amount of bars
        this.bar_width = final_bar_width;

        if(final_amount != amount) console.warn("A população sugerida ultrapassa os limites estabelecidos. A quantidade corrigida é de " + final_amount + " barras.");

        const colors = new Uint8ClampedArray(3);
        colors[0] = 0;
        colors[1] = 50;
        colors[2] = 255;

        var bar_value = 0;
        var color = "rgb(30, 30, 30)";

        const test_array =
        [80, 30, 14, 16, 9, 31, 20, 12, 23, 100, 125, 240, 255, 240, 206, 204, 250, 147, 13, 19];

        const bars = Array.from( {length: final_amount}, (_, index) =>
        {
            bar_value = test_array[index];
            bar_value = Math.floor(Math.random()*this.h);
            color = `rgb(${bar_value}, ${colors[1]}, ${colors[2] - bar_value})`;
            return new Bar(bar_value > 10 ? bar_value : bar_value+10, final_bar_width, color, this.ctx, this.h, index);
        });

        this.bars.push(...bars);
        this.bars_len = this.bars.length;
        // console.log(Array.from(this.bars).map(x => x.value));
    }


    sleep(){ return new Promise( resolve => setTimeout(resolve, this.opInterval) ); }

    async runAlgorithm(){ await this.algorithm(this, this.bars, 0, this.bars.length-1); }


    updateCurrentBlock(a, b)
    {
        this.currentGroup.x = a*this.bar_width;
        this.currentGroup.width = (b-a+1)*this.bar_width;
    }


    insertBefore(a, b)
    {
        // a: Índice do elemento que vai mudar de lugar.
        // b: Índice do elemento antes do qual outro elemento será adicionado.

        // console.log(`Inserindo ${this.bars[a].value} (posição ${a})\nantes de ${this.bars[b].value} (posição ${b}).`)
        let temp = this.bars.splice(a, 1)[0];
        this.bars.splice(b, 0, temp);
        // console.log(Array.from(this.bars).map(x => x.value));

        // await this.sleep();
    }


    swap(a, b)
    {
        // console.log("\tTrocando " + this.bars[b].value + " de posição com " + this.bars[a].value);
        [this.bars[a], this.bars[b]] = [this.bars[b], this.bars[a]]
        
        // console.log(Array.from(this.bars).map(x => x.value));
    }
    

    highlightBar(index)
    {
        this.bars[this.highlightedIndex].highlight(false);
        this.highlightedIndex = index;
        this.bars[index].highlight(true, this.highlightColor);

        // Para caso haja necessidade de múltiplas barras destacadas no futuro...
        // this.highlightedIndexes.forEach((bar_index) =>
        //     this.bars[bar_index].highlight(false));

        // this.highlightedIndexes = [...indexes];
        
        // this.highlightedIndexes.forEach((bar_index) =>
        //     this.bars[bar_index].highlight(true, this.highlightColor));
    }


    async repaint()
    {
        function sleep(ms){ return new Promise(resolve => setTimeout(resolve, ms)); }

        for(let bar of this.bars)
        {
            if(bar.color === bar.originalColor) continue;

            bar.color = bar.originalColor;
            await sleep(1);
        }
    }


    beginAnimation(renderFunction, canvas)
    {
        this.animationFinished = false;
        renderFunction(this, canvas);
    }

    endAnimation(){ this.animationFinished = true; }


    render()
    {
        this.ctx.clearRect(0, 0, this.w, this.h);

        this.ctx.fillStyle = "rgba(0, 200, 50, .2)";
        this.ctx.fillRect(this.currentGroup.x, 0, this.currentGroup.width, this.h);

        for(let i = 0; i < this.bars_len; i++) this.bars[i].draw(i);

        this.ctx.fillStyle = "rgb(30, 30, 30)";
        this.ctx.font = "15px Consolas";
        this.ctx.fillText(`Atraso: ${this.opInterval}ms`, 5, 15);
        this.ctx.fillText(`População: ${this.bars_len}`, 5, 30);
        this.ctx.fillText(`N° de comparações: ${this.comparisonCount}`, 5, 45);
    }
}