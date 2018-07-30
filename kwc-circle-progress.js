import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@webcomponents/shadycss/entrypoints/apply-shim.js';

/**
 * `kwc-circle-progress`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class KwcCircleProgress extends PolymerElement {
	static get template() {
		return html`
			<style>
				:host {
					display: block;
				}
				#circle-full {
					fill: transparent;
					stroke-linecap: round;
					@apply --kwc-circle-progress-back;
				}
				#circle {
					fill: transparent;
					stroke: white;
					transition: stroke-dashoffset linear 200ms;
					stroke-linecap: round;
					@apply --kwc-circle-progress;
					display: none;
				}
			</style>
			<svg xmlns="http://www.w3.org/2000/svg" id="svg">
				<circle id="circle-full"></circle>
				<circle id="circle"></circle>
			</svg>
		`;
	}
	static get properties() {
		return {
			/**
			 * Radius of the circle
			 */
			radius: {
				type: Number,
			},
			/**
			 * Defines the stroke width of the circle.
			 */
			strokeWidth: {
				type: Number,
				value: 4,
				observer: '_update',
			},
			/**
			 * Current value of the progress circle. Between 0 and 1.
			 */
			value: {
				type: Number,
				value: 0,
				observer: '_computeDashoffset',
			},
		};
	}
	connectedCallback () {
		super.connectedCallback();
		this.radius = this.radius || this.offsetWidth;
		this._update();
		this._computeDashoffset(0);
	}
	_computeDashoffset (value) {
		var circle = this.$.circle,
			r = circle.getAttribute('r'),
			c = Math.PI * (r * 2),
			val = Math.max(0, Math.min(1, this.value));
  
		circle.setAttributeNS(null, 'stroke-dashoffset', (1 - val) * c);
	}
	_update () {
		var svg = this.$.svg,
			circle = this.$.circle,
			circleFull = this.$['circle-full'],
			width = this.radius,
			r = width / 2 - this.strokeWidth / 2,
			c = Math.PI * (r * 2);
		if (!this.radius) {
			return;
		}
		svg.setAttribute('width', width);
		svg.setAttribute('height', width);
		svg.setAttribute('viewBox', `0 0 ${width} ${width}`);
		circle.setAttributeNS(null, 'cx', width / 2);
		circle.setAttributeNS(null, 'cy', width / 2);
		circle.setAttributeNS(null, 'r', r);
		circle.setAttributeNS(null, 'stroke-width', `${this.strokeWidth}px`);
		circle.setAttributeNS(null, 'stroke-dasharray', c);
		circle.setAttributeNS(null, 'stroke-dashoffset', c);
		circle.setAttributeNS(null, 'transform', `rotate(270, ${width / 2}, ${width / 2})`);
		circle.style.display = 'block';
		circleFull.setAttributeNS(null, 'cx', width / 2);
		circleFull.setAttributeNS(null, 'cy', width / 2);
		circleFull.setAttributeNS(null, 'r', r);
		circleFull.setAttributeNS(null, 'stroke-width', `${this.strokeWidth}px`);
		circleFull.setAttributeNS(null, 'stroke-dasharray', c);
	}
}

window.customElements.define('kwc-circle-progress', KwcCircleProgress);
