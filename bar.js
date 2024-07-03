class Bar
{
    constructor(value, graphicWidth, color, canvasContext, canvasHeight, i)
    {
        this.value = value;
        this.pivot = false;

        this.width = graphicWidth;

        this.x = i*this.width;
        this.y = canvasHeight - this.value;

        this.originalColor = color;
        this.color = this.originalColor;
        this.ctx = canvasContext;
    }


    highlight(on, color){ this.color = on ? color || "rgb(30, 30, 30)" : this.originalColor; }


    draw(index)
    {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(index*this.width, this.y, this.width, this.value);
    }
}