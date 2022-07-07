import {css, html, LitElement} from "lit"
import {ref, createRef} from 'lit/directives/ref.js'
import styles from "#styles"

export class DragScroll extends LitElement {
    events = {
        mousedown: {dragging: true},
        mouseup: {target: window, dragging: true},
        mousemove: {target: window, dragging: true},
        scroll: {options: {passive: true}},
        wheel: {handler: 'cancelMomentumTracking', options: {passive: true}, dragging: true},
        contextmenu: {handler: 'mouseup', target: window, options: {passive: true}, dragging: true}
    }
    startX
    velX = 0
    speed = 2
    momentumID
    _scrollLeft
    isScrolling
    targetScroll
    isDown = false
    scrollContainer = createRef()
    scrollPrevButton = createRef()
    scrollNextButton = createRef()

    static get properties() {
        return {
            dragging: {type: Boolean}
        }
    }

    static get styles() {
        return [styles, css`

          :host {
            display: block;
            position: relative;
            --gap: var(--root-padding);
            --padding-left: var(--root-padding-left);
            --padding-right: var(--root-padding-right);
            /*--padding-bottom: var(--root-padding-bottom);*/
          }

          [part="container"] {
            display: flex;
            gap: var(--gap);
            user-select: none;
            -ms-user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            overflow-x: scroll;
            scrollbar-width: none;
            will-change: scroll-position;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            padding-left: var(--padding-left);
            /*padding-right: var(--padding-right);*/
            /*padding-bottom: var(--padding-bottom);*/
          }

          :host([dragging="true"]) [part="container"] {
            cursor: grab;
          }

          :host([dragging="true"]) [part="container"]:active {
            cursor: grabbing;
          }

          [part="container"]::-webkit-scrollbar {
            display: none;
          }

          [part="container"]:after {
            content: '';
            height: 1px;
            display: block;
            min-width: 1px;
            margin-left: -1px;
          }

          [part="container"] slot {
            display: contents;
          }

          ::slotted(*) {
            scroll-snap-align: center;
            -webkit-user-drag: none;
            min-width: 100%;
          }

          [part="container"].dragging::slotted(*),
          [part="container"].dragging slot::slotted(*) {
            pointer-events: none;
          }

          .navigation {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            position: absolute;
            align-items: center;
            pointer-events: none;
            justify-content: space-between;
          }

          button {
            display: none;
            cursor: pointer;
            pointer-events: all;
            transition: opacity .2s;
            -webkit-appearance: none;
          }

          button:disabled {
            opacity: 0;
            pointer-events: none;
          }

          @media (hover: hover) {
            :host(:not([dragging="true"])) [part="container"].allow-scroll {
              will-change: scroll-position;
            }

            [part="container"] {
              scroll-snap-type: none;
            }

            [part="container"]:not(.allow-scroll) {
              touch-action: none;
              overflow: hidden;
            }

            :host([dragging="true"]) [part="container"] {
              touch-action: pan-x pan-y;
              overflow: auto;
            }

            button {
              --size: 70px;
              --padding: var(--root-padding);
              --backdrop-filter: blur(25px) saturate(3);
              z-index: 2;
              border: none;
              font-size: 0;
              line-height: 0;
              display: block;
              color: transparent;
              width: var(--size);
              position: absolute;
              border-radius: 100%;
              height: var(--size);
              right: var(--padding);
              background-size: 15px;
              background-position: center;
              background-repeat: no-repeat;
              backdrop-filter: var(--backdrop-filter);
              background-color: rgba(255, 255, 255, 0.7);
              box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
              -webkit-backdrop-filter: var(--backdrop-filter);
              background-image: url("/assets/images/arrow.svg");
            }

            button[part="prev"] {
              right: unset;
              left: var(--padding);
              transform: scaleX(-1);
            }

            :host(:not(:hover)) button {
              opacity: 0;
            }

            button:hover {
              pointer-events: all;
            }
          }
        `]
    }

    firstUpdated() {
        const {dragging} = this
        this.setEventHandlers({dragging})
        this.scroll()
    }

    scrollToPrevNode() {
        this.cancelMomentumTracking()
        this.targetScroll = (this.targetScroll || this.scrollContainer.value.scrollLeft) - this.getScrollWidth()
        this.scrollContainer.value.scrollTo({left: this.targetScroll, behavior: 'smooth'})
    }

    scrollToNextNode() {
        this.cancelMomentumTracking()
        this.targetScroll = (this.targetScroll || this.scrollContainer.value.scrollLeft) + this.getScrollWidth()
        this.scrollContainer.value.scrollTo({left: this.targetScroll, behavior: 'smooth'})
    }

    getScrollWidth() {
        const childElement = this.scrollContainer.value.querySelector('slot').assignedElements().shift()
        return childElement ? (childElement.clientWidth + parseInt(window.getComputedStyle(childElement).marginRight)) : 0
    }

    mousedown(e) {
        e.preventDefault();
        this.isDown = true;
        this.scrollContainer.value.classList.toggle('dragging', false);
        this.startX = e.pageX - this.scrollContainer.value.offsetLeft;
        this._scrollLeft = this.scrollContainer.value.scrollLeft;
        this.cancelMomentumTracking();
    }

    mouseup(e) {
        if (!this.isDown) return;
        e.preventDefault();
        this.isDown = false;
        this.beginMomentumTracking();
        this.scrollContainer.value.classList.toggle('dragging', false)
        // if (!this.isOver) this.setEventHandlers({temp: true}, true)
    }

    mousemove(e) {
        if (!this.isDown) return;
        e.preventDefault();
        const x = e.pageX - this.scrollContainer.value.offsetLeft;
        const walk = (x - this.startX) * this.speed;
        const prevScrollLeft = this.scrollContainer.value.scrollLeft;
        this.scrollContainer.value.scrollLeft = this._scrollLeft - walk;
        this.velX = this.scrollContainer.value.scrollLeft - prevScrollLeft;
        this.scrollContainer.value.classList.toggle('dragging', true)
    }

    scroll(e) {
        this.scrollPrevButton.value.disabled = this.scrollContainer.value.scrollLeft <= 0;
        this.scrollNextButton.value.disabled = this.scrollContainer.value.scrollWidth - this.scrollContainer.value.clientWidth - this.scrollContainer.value.scrollLeft <= 0;
        clearTimeout(this.isScrolling);
        this.isScrolling = setTimeout(this.scrollEnd.bind(this), 66);
    }

    scrollEnd() {
        this.isScrolling = null
        this.targetScroll = null
    }

    toggleScroll(state = true) {
        if (!state && this.isScrolling) return requestAnimationFrame(() => this.toggleScroll(state))
        requestAnimationFrame(() => this.scrollContainer.value.classList.toggle('allow-scroll', state))
    }

    beginMomentumTracking() {
        this.cancelMomentumTracking();
        this.momentumID = requestAnimationFrame(this.momentumLoop.bind(this));
    }

    cancelMomentumTracking() {
        cancelAnimationFrame(this.momentumID);
    }

    momentumLoop() {
        this.scrollContainer.value.scrollLeft += this.velX;
        this.velX *= 0.95;
        if (Math.abs(this.velX) > 0.5) this.momentumID = requestAnimationFrame(this.momentumLoop.bind(this))
    }

    setEventHandlers(filter = {}, remove = false, target = this.scrollContainer.value) {
        const method = remove ? 'removeEventListener' : 'addEventListener'
        const eventsList = Object.entries(this.events)
        const targetEvents = Object.keys(filter).length ?
            eventsList.filter(([, event]) => this.objectIncludes(event, filter)) : eventsList
        targetEvents.forEach(([name, event]) => {
            let handler = name, targetNode = target, options = {}
            if (typeof event === 'object') {
                if (event.name) name = event.name
                if (event.options) options = event.options
                if (event.handler) handler = event.handler; else handler = name
                if (event.target) targetNode = event.target; else targetNode = target
            }
            if (this[handler]) targetNode[method](name, this[handler].bind(this), options)
        })
    }

    objectIncludes(target, compare) {
        return !Object.entries(compare).some(([key, value]) => target[key] !== undefined ? value !== target[key] : false)
    }

    render() {
        return html`
            <div part="container" ${ref(this.scrollContainer)}>
                <slot></slot>
            </div>
            <div class="navigation">
                <button part="prev" ${ref(this.scrollPrevButton)} @click="${this.scrollToPrevNode.bind(this)}"
                        title="Назад" @mouseenter="${this.toggleScroll.bind(this, true)}"
                        @mouseleave="${this.toggleScroll.bind(this, false)}">Назад
                </button>
                <button part="next" ${ref(this.scrollNextButton)} @click="${this.scrollToNextNode.bind(this)}"
                        title="Вперед" @mouseenter="${this.toggleScroll.bind(this, true)}"
                        @mouseleave="${this.toggleScroll.bind(this, false)}">Вперед
                </button>
            </div>
        `
    }
}

customElements.define('drag-scroll', DragScroll)
