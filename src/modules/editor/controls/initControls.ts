import * as fabric from "fabric";
import { defaultControls, textboxControls } from "./drawControls";
import {
	cornerSize,
	cornerStrokeColor,
	inBorder,
} from "../config/controlStyle";

/**
 * Initializes default controls for FabricObjects and extends specific object controls.
 */
const initControls = () => {
    /**
     * Disable object caching for better performance.
     */
	fabric.Object.ownDefaults.objectCaching = false;

    /**
     * Set default border and corner colors.
     */
	fabric.Object.ownDefaults.borderColor = inBorder;
	fabric.Object.ownDefaults.cornerColor = inBorder;

    /**
     * Set default corner stroke color, border opacity, scale factor, and size.
     */
	fabric.Object.ownDefaults.cornerStrokeColor = cornerStrokeColor;
	fabric.Object.ownDefaults.borderOpacityWhenMoving = 1;
	fabric.Object.ownDefaults.borderScaleFactor = 1;
	fabric.Object.ownDefaults.cornerSize = cornerSize;

    /**
     * Set default corner style to 'circle'.
     */
	fabric.Object.ownDefaults.cornerStyle = "circle";

    /**
     * Disable centered scaling and enable centered rotation.
     */
	fabric.Object.ownDefaults.centeredScaling = false;
	fabric.Object.ownDefaults.centeredRotation = true;

    /**
     * Disable transparent corners and set rotating point offset.
     */
	fabric.Object.ownDefaults.transparentCorners = false;
	fabric.Object.ownDefaults.rotatingPointOffset = 1;

    /**
     *  Lock uniform scaling and disable rotating point.
     */
	fabric.Object.ownDefaults.lockUniScaling = true;
	fabric.Object.ownDefaults.hasRotatingPoint = false;

    /**
     * Set default controls for Objects.
     */
	fabric.Object.ownDefaults.controls = defaultControls();

	/**
     * Extend controls for TextBox objects.
     */
	Object.assign(fabric.Textbox.ownDefaults, { controls: textboxControls() });

    /**
     * Extend mixin for additional object dimension properties.
     */

	const mixin = {
		getWidthHeight(noFixed = false): fabric.Point {
			// @ts-ignore
			const objScale = this.getObjectScaling();
			// @ts-ignore
			const point = this._getTransformedDimensions({
				scaleX: objScale.x,
				scaleY: objScale.y,
			});
			if (!noFixed) {
				point.setX(point.x);
				point.setY(point.y);
			}
			return point;
		},
		getHeight() {
			return this.getWidthHeight().y;
		},
		getWidth() {
			return this.getWidthHeight().x;
		},
	};

    /**
     * Apply the mixin to the prototype of Object.
     */
	Object.assign(fabric.Object.prototype, mixin);
};

export default initControls;
