class GridModel {
	constructor(x, y, w, h) {
        if (new.target === GridModel) {
            throw new Error('本类只用于继承，无法实例化');
        }
    	this.x = x;
    	this.y = y;
    	this.w = w;
    	this.h = h;
	}
    renderAxis() {
        ctx.beginPath();
        ctx.save();
        ctx.translate(this.x, this.y + this.h);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -this.h);
        ctx.moveTo(0, 0);
        ctx.lineTo(this.w, 0);
        ctx.stroke();
    }
    isPos(x, y) {
        if (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h) {
            return this;
        } else {
            return null;
        }
    }
    zoomIn() {
        this.w = this.w + 50;
        this.h = this.h + 50;
    }
    zoomOut(x, y) {
        this.w = this.w - 50;
        this.h = this.h - 50; 
    }
    createDom(className) {
        const dom = document.createElement('div');
        dom.style.position = 'absolute';
        if (className === 'markLine') {
            dom.style.right = width - this.x - this.w + 'px';
        } else if (className === 'markBar') {
            dom.style.left = this.x + 1 + 'px';
        }
        dom.style.top = this.y + 'px';
        dom.style.width = this.w + 'px';
        dom.style.height = this.h - 1 + 'px';
        dom.style.backgroundColor = '#fff';
        dom.className = className;
        containerDom.appendChild(dom);
        dom.addEventListener("webkitAnimationEnd", () => {
            containerDom.removeChild(dom);
        });
    }
}

class Line extends GridModel {
    #name = 'Line';
    [Symbol.hasInstance] (name) {
        return Object.is(this.#name, name);
    }
    set data(value) {
        this.yData = value;
    }
    get data() {
        return this.yData;
    }
	constructor(x, y, w, h) {
    	super(x, y, w, h);
        this.xData = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'];
        this.yData = (() => {
            let arr = [];
            for (let i = 0, len = this.xData.length; i < len; i++) {
                arr.push(Math.floor(Math.random() * 8));
            }
            return arr;
        })();
        this.index = 0;
        this.createDom('markLine');
        this.render();
	}
	render() {
		this.renderAxis();
        let xg = this.w / (this.xData.length - 1);
        let yg = this.h / Math.max(...this.yData);
        ctx.beginPath();
        ctx.strokeStyle = '#2980B9';
        for (let i = 0, len = this.xData.length - 1; i < len; i++) {
            let lastIndex = i + 1;
            ctx.moveTo(i * xg, -this.yData[i] * yg);
            ctx.lineTo(lastIndex * xg, -this.yData[lastIndex] * yg);
        }
        ctx.stroke();
        ctx.restore();
	}
}

class Bar extends GridModel {
    #name = 'Bar';
    [Symbol.hasInstance] (name) {
        return Object.is(this.#name, name);
    }
    set data(value) {
        this.yData = value;
    }
    get data() {
        return this.yData;
    }
	constructor(x, y, w, h) {
    	super(x, y, w, h);
        this.xData = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'];
        this.yData = (() => {
            let arr = [];
            for (let i = 0, len = this.xData.length; i < len; i++) {
                arr.push(Math.floor(Math.random() * 7) + 1);
            }
            return arr;
        })();
        this.createDom('markBar');
        this.render();
	}
	render() {
		this.renderAxis();
        let xg = this.w / (this.xData.length - 1);
        let yg = this.h / (Math.max(...this.yData));
        ctx.fillStyle = '#D35400';
        for (let i = 0, len = this.xData.length; i < len; i++) {
            ctx.fillRect(i * xg, -this.yData[i] * yg, 14, this.yData[i] * yg);
        }
        ctx.restore();
	}
}