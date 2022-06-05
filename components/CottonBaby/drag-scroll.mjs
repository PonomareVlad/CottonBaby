import {css, html, LitElement} from "lit"
import {ref, createRef} from 'lit/directives/ref.js'

export class DragScroll extends LitElement {
    events = {
        mousedown: {},
        scroll: {options: {passive: true}},
        mouseup: {target: window, temp: true},
        mousemove: {target: window, temp: true},
        // mouseenter: {options: {passive: true}},
        // mouseleave: {options: {passive: true}},
        wheel: {handler: 'cancelMomentumTracking', options: {passive: true}},
        contextmenu: {handler: 'mouseup', target: window, options: {passive: true}}
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

    static get styles() {
        return css`
          :host {
            display: block;
            position: relative;
            --gap: var(--root-padding);
            --padding-left: var(--root-padding-left);
            --padding-right: var(--root-padding-right);
            /*--padding-bottom: var(--root-padding-bottom);*/
          }

          [part="container"] {
            cursor: grab;
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
            padding-left: var(--padding-right);
            padding-right: var(--padding-left);
            /*padding-bottom: var(--padding-bottom);*/
          }

          [part="container"]:active {
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

          ::slotted(*) {
            scroll-snap-align: center;
            -webkit-user-drag: none;
            min-width: 100%;
          }

          [part="container"].dragging::slotted(*) {
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
          }

          button:disabled {
            opacity: 0;
          }

          @media (hover: hover) {
            [part="container"] {
              scroll-snap-type: none;
            }

            button {
              --size: 70px;
              --padding: var(--root-padding);
              --backdrop-filter: blur(25px) saturate(3);
              z-index: 2;
              border: none;
              display: block;
              overflow: hidden;
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
          }
        `
    }

    firstUpdated() {
        this.setEventHandlers()
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
        const childElement = this.scrollContainer.value.assignedElements().shift()
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

    /*mouseenter(e) {
        this.isOver = true;
        if (!this.isDown) this.setEventHandlers({temp: true})
    }*/

    /*mouseleave(e) {
        this.isOver = false;
        if (!this.isDown) this.setEventHandlers({temp: true}, true)
    }*/

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
        this.isScrolling = setTimeout(() => this.targetScroll = null, 66);
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

    leaveEvent(e) {
        this.cancelEvent(e);
        this.isDown = false;
    }

    cancelEvent(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    }

    setEventHandlers(/*filter = {}, remove = false,*/ target = this.scrollContainer.value) {
        const method = /*remove ? 'removeEventListener' :*/ 'addEventListener'
        const eventsList = Object.entries(this.events)
        /*const targetEvents = Object.keys(filter).length ?
            eventsList.filter(([, event]) => this.objectIncludes(event, filter)) : eventsList*/
        // console.debug({filter, remove, target, targetEventsLength: targetEvents.length})
        eventsList.forEach(([name, event]) => {
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

    /*objectIncludes(target, compare) {
        return !Object.entries(compare).some(([key, value]) => value !== target[key])
    }*/

    render() {
        return html`
            <slot part="container" ${ref(this.scrollContainer)}></slot>
            <div class="navigation">
                <button part="prev" ${ref(this.scrollPrevButton)} @click="${this.scrollToPrevNode.bind(this)}">
                    Назад
                </button>
                <button part="next" ${ref(this.scrollNextButton)} @click="${this.scrollToNextNode.bind(this)}">
                    Вперед
                </button>
            </div>
        `
    }
}

customElements.define('drag-scroll', DragScroll)
