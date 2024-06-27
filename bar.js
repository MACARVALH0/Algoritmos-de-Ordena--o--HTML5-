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

        this.color = color;
        this.ctx = canvasContext;
    }

    updatePos(index)
    {
        // console.log(`Updating ${this.value}, from ${this.index} to ${index}\n`);
        this.index = index;
        this.x = this.index*this.width;
    }

    setPivot()
    {
        this.pivot = true;
        this.color = "rgb(30, 30, 30)";
    }


    move()
    {
        // if (this.x < this.pos) this.x += this.width;
        // else if (this.x > this.pos) this.x -= this.width;
        // console.log("Bar position: ", this.x);
        return;
        // else throw new Error("A barra está numa situação esquisita...");
    }

    draw()
    {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.value);
        this.ctx.fillStyle = "rgb(255, 255, 255)";
        this.ctx.fillText(this.value, this.x+2, this.y+10);
    }

    test(){ console.log("A barra existe e tem o seguinte valor:", this.value); }
}