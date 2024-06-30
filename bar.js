class Bar
{
    constructor(value, graphicWidth, color, canvasContext, canvasHeight, i)
    {
        this.value = value;
        this.pivot = false;

        this.width = graphicWidth;
        this.index = 0;

        this.x = i*this.width;
        this.y = canvasHeight - this.value;

        this.originalColor = color;
        this.color = this.originalColor;
        this.ctx = canvasContext;
    }


    updatePos(index)
    {
        // console.log(`Updating ${this.value}, from ${this.index} to ${index}\n`);
        this.index = index;
        this.x = this.index*this.width;
    }


    highlight(on, color){ this.color = on ? color : this.originalColor; }


    draw()
    {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.value);
    }
}