class BaseElement {
    element;

    /**
     * Set style to element
     * @param {string} property
     * @param {string} value
     */
    setStyle(property, value) {
        this.element.style[property] = value;
    }
}

class Child extends BaseElement{
    element;
    size;

    constructor(size) {
        super();

        this.size = size;
        this.element = document.createElement('div');

        this.addStyles();
        this.bindEvents();
    }

    /**
     * Generates a random color
     * @returns {string}
     */
    randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    /**
     * Remove element from DOM
     */
    removeElement = () => this.element.parentElement.removeChild(this.element);

    /**
     * Apply styles to element
     */
    addStyles() {
        const dimension = `${this.size}px`;

        this.setStyle('background', this.randomColor());
        this.setStyle('width',  dimension);
        this.setStyle('height',  dimension);
        this.setStyle('position',  'absolute');
        this.setStyle('left',  '0');
        this.setStyle('top',  '0');
    }

    /**
     * Bind element events
     */
    bindEvents() {
        let timeout;

        this.element.addEventListener('mouseover', () => {
            this.setStyle('background',  this.randomColor());

            timeout = setTimeout(() => {
                this.removeElement();
            }, 2000);
        })

        this.element.addEventListener('mouseleave', () => {
            clearInterval(timeout);
        })
    }
}

class Container extends BaseElement {
    id = 'mainSquare';
    size;
    numberOfChildren;

    constructor(size, numberOfChildren) {
        super();

        this.size = size;
        this.numberOfChildren = numberOfChildren;
        this.element = document.getElementById(this.id);

        this.addStyles();
        this.addChildren();
        this.addTotal();
    }

    /**
     * Apply styles to element
     */
    addStyles() {
        const dimension = `${this.size}px`;

        this.setStyle('width', dimension);
        this.setStyle('height', dimension);
        this.setStyle('position', 'relative');
    }

    /**
     * Generate and add children to element
     */
    addChildren() {
        for (let i = 0; i < this.numberOfChildren; i++) {
            const maxItems = this.numberOfChildren > 2 ? Math.round(Math.sqrt(this.numberOfChildren)) : this.numberOfChildren;

            const childSize = this.size / maxItems;

            const child = new Child(childSize);

            let size = childSize * i / this.size;

            if (i !== 0) {
                child.setStyle('left', `${(size - parseInt(size)) * 100}%`);
                child.setStyle('top', `${parseInt(size) * childSize}px`);
            }

            if (size < maxItems) {
                this.element.appendChild(child.element);
            }
        }
    }

    /**
     * Present total children rendered.
     * @returns {number}
     */
    addTotal() {
        const message = document.createElement('div');
        message.innerText = `Total of ${this.element.childNodes.length} children rendered.`;

        this.element.parentElement.appendChild(message);
    }
}

const drawContainer = (containerSize, childSize, numberOfChildren) => {
    new Container(containerSize, numberOfChildren);
};

drawContainer(200, 50, 17);
// drawContainer(310, 200, 4);
// drawContainer(413, 42, 30);
// drawContainer(200, 300, 2);
