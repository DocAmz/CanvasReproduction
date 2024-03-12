import * as fabric from "fabric";
// import JsBarcode from "jsbarcode"
import { OptionKey } from "@/modules/modeManager/config/keys";
import { ColorStop } from "./elements";
import { CanvasOption } from "./option";

export type LineOption = [number, number, number, number];
export type TPatternRepeat = "repeat" | "repeat-x" | "repeat-y" | "no-repeat";
export type ImageSource =
	| HTMLImageElement
	| HTMLVideoElement
	| HTMLCanvasElement;
export type QRCodeType =
	"A1"
	| "A2"
	| "A3"
	| "SP1"
	| "SP2"
	| "SP3"
	| "B1"
	| "C1"
	| "A_a1"
	| "A_a2"
	| "A_b1"
	| "A_b2";
export interface QRCodeOption {
	codeStyle: QRCodeType;
	codeSpace: boolean;
	codeError: number;
}

export interface BarcodeProps extends fabric.FabricImage {
	type: string
	codeContent: string
	codeOption: JsBarcode.BaseOptions
}

export interface QRCodeProps extends fabric.FabricImage {
	type: string
	codeContent: string
	codeOption: QRCodeOption
}

export const enum ImageFormat {
	jpeg = "jpeg",
	jpg = "jpeg",
	png = "png",
}

export interface GradientElement extends fabric.Gradient<"linear" | "radial"> {
	gradientName: string;
}

export interface Modele {
	id: string;
	version: string;
	background?: string;
	display_name: string;
	name: string;
	zoom: number;
	width: number;
	height: number;
	objects: fabric.FabricObject[];
	workSpace: WorkSpaceElement;
	references: ReferencesElement;
	has_clip: boolean;
	has_safe: boolean;
	clip: number;
	safe: number;
	Default_DPI: number;
	Default_Ratio: number;

	// viewportTransform?: number[]
}

export interface ReferencesElement {
	ref_model?: string | number | undefined;
	ref_format: number | undefined;
}

export interface WorkSpaceElement {
	workarea: number;
	workspace_name: string;
	fill?: string | fabric.Gradient<"linear" | "radial"> | fabric.Pattern;
	fillType: number;
	left: number;
	top: number;
	angle: number;
	width: number;
	height: number;
	scaleX: number;
	scaleY: number;
	color?: string;
	opacity?: number;
	imageURL?: string;
	imageSize?: "cover" | "contain" | "repeat";
	gaidImageURL?: string;
	gaidImageMode?: string;
	shadingImageURL?: string;
	gradientType?: "linear" | "radial";
	gradientName?: string;
	gradientColor?: ColorStop[];
	gradientRotate?: number;
	backgroundColor?: string;
}

export interface BackgroundElement {
	fill: string | fabric.Gradient<"linear" | "radial"> | fabric.Pattern;
	color: string;
	fillType: number;
	opacity: number;
	imageURL?: string;
	imageSize?: "cover" | "contain" | "repeat";
	gaidImageURL?: string;
	gaidImageMode?: string;
	shadingImageURL?: string;
	gradientType?: "linear" | "radial";
	gradientName?: string;
	gradientColor?: ColorStop[];
	gradientRotate?: number;
	gradientOffsetX?: number;
	gradientOffsetY?: number;
	backgroundColor?: string;
}

export interface TextboxElement extends fabric.FabricText {
	text: string;
	id: string;
	name: string;
	workspaceElement: boolean;
	workspace: number;
	left: number;
	top: number;
	isRotate?: boolean;
	background?: BackgroundElement;
	isInside: "in" | "out" | "half" | "empty";
	fontFamily: string;
	color: string;
	fillRepeat: TPatternRepeat;
	fillURL: string;
	isCheck?: boolean;
	isForm?: boolean;
	formData?: TFormData;
	isEditing?: boolean;
}

export interface TFormData {
	type: string;
	name: string;
	autoFill: boolean;
	placeHolder: string;
	editable: boolean;
	options: OptionKey[];
}

export interface PathElement extends fabric.Path {
	id: string;
	name: string;
	workspaceElement: boolean;
	workspace: number;
	left: number;
	top: number;
	isRotate?: boolean;
	background?: BackgroundElement;
	isInside: "in" | "out" | "half";
	fill: string | fabric.Gradient<"linear"> | fabric.Gradient<"radial">;
}

export interface RectElement extends fabric.Rect {
	id: string;
	name: string;
	rx: number;
	ry: number;
	workspaceElement: boolean;
	workspace: number;
	left: number;
	top: number;
	isRotate?: boolean;
	background?: BackgroundElement;
	isInside: "in" | "out" | "half";
}

export interface LineElement extends fabric.Line {
	id: string;
	name: string;
	workspaceElement: boolean;
	workspace: number;
	left: number;
	top: number;
	isRotate?: boolean;
	background?: BackgroundElement;
	isInside: "in" | "out" | "half";
	startStyle?: string | null;
	endStyle?: string | null;
}

export interface PolygonElement extends fabric.Polygon {
	id: string;
	name: string;
	workspaceElement: boolean;
	workspace: number;
	left: number;
	top: number;
	isRotate?: boolean;
	background?: BackgroundElement;
	isInside: "in" | "out" | "half";
	points: fabric.Point[];
}

export interface QRCodeElement extends fabric.FabricImage {
	id: string;
	name: string;
	workspaceElement: boolean;
	workspace: number;
	left: number;
	top: number;
	isRotate?: boolean;
	background?: BackgroundElement;
	isInside: "in" | "out" | "half";
	codeStyle: string;
	codeContent?: string;
	codeSpace?: boolean;
	codeError?: number;
}

export interface BarCodeElement extends fabric.FabricImage {
	id: string;
	name: string;
	workspaceElement: boolean;
	workspace: number;
	left: number;
	top: number;
	isRotate?: boolean;
	background?: BackgroundElement;
	isInside: "in" | "out" | "half";
	codeContent: string;
	codeOption: JsBarcode.BaseOptions;
}

export interface ImageElement extends fabric.FabricImage {
  [x: string]: number;
	id: string;
	name: string;
	workspaceElement: boolean;
	workspace: number;
	left: number;
	top: number;
	isRotate?: boolean;
	background?: BackgroundElement;
	isInside: "in" | "out" | "half";
}

export interface CropElement extends fabric.Rect {
	id: string;
	name: string;
	isRotate?: boolean;
	workspaceElement: boolean;
	workspace: number;
	left: number;
	top: number;
	imageId: string;
	background?: BackgroundElement;
	isInside: "in" | "out" | "half";
	isCropping?: boolean;
	originId?: string;
	cropPath?: fabric.FabricObject;
	originLeft?: number;
	originTop?: number;
	originCropX?: number;
	originCropY?: number;
}

export interface GroupElement extends fabric.Group {
	id: string;
	name: string;
	workspaceElement: boolean;
	workspace: number;
	left: number;
	top: number;
	isRotate?: boolean;
	background?: BackgroundElement;
	isInside: "in" | "out" | "half";
	isShow: boolean;
	objects: CanvasOption[];
	_objects: fabric.FabricObject[];
}

export type CanvasElement =
	| TextboxElement
	| LineElement
	| QRCodeElement
	| BarCodeElement
	| ImageElement
	| PathElement
	| GroupElement
	| CropElement
	| PolygonElement
	| RectElement;
