/*
 * Copyright 2014 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * @fileoverview Externs for Projecessing.js API.
 *
 * @see http://processingjs.org/reference/
 *
 * @externs
 */

var Processing = {};
var Processing = function(aCanvas, aCode, aFunctions){};

Processing.name;
Processing.prototype.getInstanceById = function(id){};

// Structure
Processing.draw;
Processing.prototype.exit = function(){};
Processing.prototype.loop = function(){};
Processing.prototype.noLoop = function(){};
Processing.prototype.pushStyle = function(){};
Processing.prototype.popStyle = function(){};
Processing.prototype.redraw = function(){};
Processing.setup;
Processing.prototype.size = function(x, y){};
Processing.prototype.size = function(x, y, z){};
Processing.touchStart;
Processing.touchEnd;
Processing.touchMove;
Processing.touchCancel;

// Environment
Processing.prototype.cursor = function(){};
Processing.prototype.cursor = function(mode){};
Processing.prototype.cursor = function(image, x, y){};

Processing.focused;
Processing.frameCount;
Processing.prototype.frameRate = function(fps){};
Processing.__frameRate;
Processing.height;
Processing.prototype.noCursor = function(){};
Processing.width;


// Color Setting
Processing.prototype.background = function(gray){};
Processing.prototype.background = function(gray, alpha){};
Processing.prototype.background = function(value1, value2, value3){};
Processing.prototype.background = function(value1, value2, value3, alpha){};
Processing.prototype.colorMode = function(mode){};
Processing.prototype.colorMode = function(mode, range1){};
Processing.prototype.colorMode = function(mode, range1, range2, range3){};
Processing.prototype.colorMode = function(mode, range1, range2, range3, range4){};
Processing.prototype.fill = function(arg1){};
Processing.prototype.fill = function(arg1, arg2){};
Processing.prototype.fill = function(arg1, arg2, arg3){};
Processing.prototype.fill = function(arg1, arg2, arg3, alpha){};
Processing.prototype.noFill = function(){};
Processing.prototype.noStroke = function(){};
Processing.prototype.stroke = function(arg1){};
Processing.prototype.stroke = function(arg1, arg2){};
Processing.prototype.stroke = function(arg1, arg2, arg3){};
Processing.prototype.stroke = function(arg1, arg2, arg3, alpha){};

// Color Creating & Reading
Processing.prototype.alpha = function(color){};
Processing.prototype.blendColor = function(c1, c2, mode){};
Processing.prototype.blue = function(color){};
Processing.prototype.brightness = function(color){};
Processing.prototype.color = function(arg1){};
Processing.prototype.color = function(arg1, arg2){};
Processing.prototype.color = function(arg1, arg2, arg3){};
Processing.prototype.color = function(arg1, arg2, arg3, alpha){};
Processing.prototype.green = function(color){};
Processing.prototype.hue = function(color){};
Processing.prototype.lerpColor = function(c1, c2, amt){};
Processing.prototype.red = function(color){};
Processing.prototype.saturation = function(color){};

// PImage
var PImage = {};
var PImage = function(){};
var PImage = function(width, height){};
var PImage = function(width, height, format){};
var PImage = function(img){};

PImage.pixels;

PImage.prototype.blend = function(srcImg, x, y, width, height, dx, dy, dwidth, dheight, MODE){};
PImage.prototype.blend = function(x, y, width, height, dx, dy, dwidth, dheight, MODE){};
PImage.prototype.updatePixels = function(){};
PImage.prototype.loadPixels = function(){};
PImage.prototype.get = function(x, y, w, h){};
PImage.prototype.set = function(x, y, c){};
PImage.prototype.copy = function(srcImg, sx, sy, swidth, sheight, dx, dy, dwidth, dheight){};
PImage.prototype.copy = function(sx, sy, swidth, sheight, dx, dy, dwidth, dheight){};
PImage.prototype.filter = function(mode, param){};
PImage.prototype.filter = function(mode){};
PImage.prototype.save = function(file){};
PImage.prototype.resize = function(w, h){};
PImage.prototype.mask = function(mask){};

Processing.prototype.createImage = function(w, h, mode){};

var pixels = {};
pixels.prototype.getLength = function(){};
pixels.prototype.getPixel = function(i){};
pixels.prototype.setPixel = function(i, c){};
pixels.prototype.toArray = function(){};
pixels.prototype.set = function(arr){};

// PImage Loading & Displaying
Processing.prototype.image = function(img, x, y){};
Processing.prototype.image = function(img, x, y, width, height){};
Processing.prototype.imageMode = function(MODE){};
Processing.prototype.loadImage = function(filename){};
Processing.prototype.noTint = function(){};
Processing.prototype.requestImage = function(filename){};
Processing.prototype.requestImage = function(filename, extension){};
Processing.prototype.tint = function(arg1){};
Processing.prototype.tint = function(arg1, arg2){};
Processing.prototype.tint = function(arg1, arg2, arg3){};
Processing.prototype.tint = function(arg1, arg2, arg3, alpha){};

// PImage Pixels is a part of PImage class

// Rendering
var PGraphics = {};
var PGraphics = function(){};
var PGraphics = function(width, height){};
var PGraphics = function(width, height, applet){};

PGraphics.prototype.beginDraw = function(){};
PGraphics.prototype.endDraw = function(){};

Processing.prototype.createGraphics = function(width, height, renderer){};
Processing.prototype.createGraphics = function(width, height, renderer, filename){};

PGraphics.prototype.hint = function(item){};

// Typography Creating & Displaying

Processing.prototype.createFont = function(name, size){};
Processing.prototype.loadFont = function(fontname){};

Processing.prototype.text = function(data, x, y){};
Processing.prototype.text = function(data, x, y, z){};
Processing.prototype.text = function(data, x, y, width, height){};
Processing.prototype.text = function(data, x, y, width, height, z){};

Processing.prototype.textFont = function(pfont, size){};
Processing.prototype.textFont = function(pfont){};

// Typography Attributes
Processing.prototype.textAlign = function(align){};
Processing.prototype.textAlign = function(align, yalign){};
Processing.prototype.textLeading = function(dist){};
Processing.prototype.textMode = function(mode){};
Processing.prototype.textSize = function(size){};
Processing.prototype.textWidth = function(data){};

// Typography Mertics
Processing.prototype.textAscent = function(){};
Processing.prototype.textDescent = function(){};

// Math Calculation
Processing.prototype.abs = function(arg){};
Processing.prototype.ceil = function(arg){};
Processing.prototype.constrain = function(value, max, min){};
Processing.prototype.dist = function(x1, y1, x2,y2){};
Processing.prototype.dist = function(x1, y1, z1, x2, y2, z2){};
Processing.prototype.exp = function(arg){};
Processing.prototype.floor = function(arg){};
Processing.prototype.lerp = function(value1, value2, amt){};
Processing.prototype.log = function(arg){};
Processing.prototype.mag = function(a, b){};
Processing.prototype.mag = function(a, b, c){};
Processing.prototype.map = function(value, low1, high1, low2, high2){};

Processing.prototype.max = function(value1, value2){};
Processing.prototype.max = function(value1, value2, value3){};
Processing.prototype.max = function(array){};

Processing.prototype.min = function(value1, value2){};
Processing.prototype.min = function(value1, value2, value3){};
Processing.prototype.min = function(array){};

Processing.prototype.norm = function(value, low, high){};
Processing.prototype.pow = function(num, exponent){};
Processing.prototype.round = function(value){};
Processing.prototype.sq = function(value){};
Processing.prototype.sqrt = function(value){};

// Math Trigonometry
Processing.prototype.acos = function(value){};
Processing.prototype.asin = function(value){};
Processing.prototype.atan = function(value){};
Processing.prototype.atan2 = function(x, y){};
Processing.prototype.cos = function(angle){};
Processing.prototype.degrees = function(angle){};
Processing.prototype.radians = function(angle){};
Processing.prototype.sin = function(rad){};
Processing.prototype.tan = function(angle){};

// Math Random
Processing.prototype.noise = function(x){};
Processing.prototype.noise = function(x, y){};
Processing.prototype.noise = function(x, y, z){};

Processing.prototype.noiseDetail = function(octaves, fallout){};
Processing.prototype.noiseDetail = function(octaves){};
Processing.prototype.noiseSeed = function(seed){};

Processing.prototype.random = function(high){};
Processing.prototype.random = function(high, low){};
Processing.prototype.randomSeed = function(seed){};

// Shape 2D Primitives
Processing.prototype.arc = function(x, y, width, height, start, stop){};
Processing.prototype.ellipse = function(x, y, width, height){};
Processing.prototype.line = function(x1, y1, x2, y2){};
Processing.prototype.line = function(x1, y1, z1, x2, y2, z2){};
Processing.prototype.point = function(x, y){};
Processing.prototype.point = function(x, y, z){};
Processing.prototype.quad = function(x1, y1, x2, y2, x3, y3, x4, y4){};
Processing.prototype.rect = function(x, y, width, height){};
Processing.prototype.rect = function(x, y, width, height, radius){};
Processing.prototype.rect = function(x, y, width, height, tlradius, trradius, brradius, blradius){};
Processing.prototype.triangle = function(x1, y1, x2, y2, x3, y3){};

// Shape 3D Primitives
Processing.prototype.box = function(size){};
Processing.prototype.box = function(width, height, depth){};
Processing.prototype.sphere = function(radius){};
Processing.prototype.sphereDetail = function(res){};
Processing.prototype.sphereDetail = function(ures, vres){};

// Shape PShare
var PShare = {};
var PShare = function(family){};

PShare.width;
PShare.height;

PShare.prototype.isVisible = function(){};
PShare.prototype.setVisible = function(visible){};
PShare.prototype.disableStyle = function(){};
PShare.prototype.enableStyle = function(){};
PShare.prototype.getChild = function(target){};
PShare.prototype.translate = function(x, y){};
PShare.prototype.translate = function(x, y, z){};
PShare.prototype.rotate = function(angle){};
PShare.prototype.rotateX = function(angle){};
PShare.prototype.rotateY = function(angle){};
PShare.prototype.rotateZ = function(angle){};
PShare.prototype.scale = function(size){};
PShare.prototype.scale = function(x, y){};
PShare.prototype.scale = function(x, y, z){};

// Shape Curves
Processing.prototype.bezier = function(x1, y1, cx1, cy1, cx2, cy2, x2, y2){};
Processing.prototype.bezier = function(x1, y1, z1, cx1, cy1, cz1, cx2, cy2, cz2, x2, y2, z2){};
Processing.prototype.bezierDetail = function(detail){};
Processing.prototype.bezierPoint = function(a, b, c, d, t){};
Processing.prototype.bezierTangent = function(a, b, c, d, t){};

Processing.prototype.curve = function(x1, y1, x2, y2, x3, y3, x4, y4){};
Processing.prototype.curve = function(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4){};
Processing.prototype.curveDetail = function(detail){};
Processing.prototype.curvePoint = function(a, b, c, d, t){};
Processing.prototype.curveTangent = function(a, b, c, d, t){};
Processing.prototype.curveTightness = function(squishy){};

// Shape Attributes
Processing.prototype.ellipseMode = function(mode){};
Processing.prototype.noSmooth = function(){};
Processing.prototype.rectMode = function(mode){};
Processing.prototype.smooth = function(){};
Processing.prototype.strokeCap = function(mode){};
Processing.prototype.strokeJoin = function(mode){};
Processing.prototype.strokeWeight = function(weight){};

// Shape Vertex
Processing.prototype.beginShape = function(mode){};
Processing.prototype.bezierVertex = function(cx1, cy1, cx2, cy2, x, y){};
Processing.prototype.bezierVertex = function(cx1, cy1, cz1, cx2, cy2, cz2, x, y, z){};
Processing.prototype.curveVertex = function(x, y){};
Processing.prototype.curveVertex = function(x, y, z){};
Processing.prototype.endShape = function(){};
Processing.prototype.endShape = function(mode){};
Processing.prototype.texture = function(image){};
Processing.prototype.textureMode = function(mode){};

Processing.prototype.vertex = function(x, y){};
Processing.prototype.vertex = function(x, y, z){};
Processing.prototype.vertex = function(x, y, u, v){};
Processing.prototype.vertex = function(x, y, z, u, v){};

// Shape Loading & Displaying
Processing.prototype.loadShape = function(filename){};
Processing.prototype.shape = function(sh){};
Processing.prototype.shape = function(sh, x, y){};
Processing.prototype.shape = function(sh, x, y, width, height){};
Processing.prototype.shapeMode = function(mode){};

// Input Mouse
Processing.mouseButton;
Processing.mouseClicked;
Processing.mouseDragged;
Processing.mouseMoved;
Processing.mouseOut;
Processing.mouseOver;
Processing.mousePressed;
Processing.mouseReleased;
Processing.mouseX;
Processing.mouseY;
Processing.pmouseX;
Processing.pmouseY;

// not in offical reference
Processing.mouseScroll;
Processing.mouseScrolled;

Processing.__mousePressed;
Processing.__keyPressed;

// Input Keyboard
Processing.key;
Processing.keyCode;
Processing.keyPressed;
Processing.keyReleased;
Processing.keyTyped;

// Input Files
Processing.prototype.loadBytes = function(filename){};
Processing.prototype.loadStrings = function(filename){};

// Input Web
Processing.prototype.link = function(url){};
Processing.prototype.link = function(url, target){};
Processing.prototype.status = function(text){};

// Input Time & Date
Processing.prototype.day = function(){};
Processing.prototype.hour = function(){};
Processing.prototype.millis = function(){};
Processing.prototype.minute = function(){};
Processing.prototype.month = function(){};
Processing.prototype.second = function(){};
Processing.prototype.year = function(){};

// Output Text Area
Processing.prototype.print = function(message){};
Processing.prototype.println = function(message){};

// Output Image
Processing.prototype.save = function(filename){};
Processing.prototype.saveFrame = function(){};
Processing.prototype.saveFrame = function(filename){};

// Output Files
Processing.prototype.saveStrings = function(filename, strings){};

// Transform
Processing.prototype.applyMatrix = function(n00, n01, n02, n03,
					    n04, n05, n06, n07,
					    n08, n09, n10, n11,
					    n12, n13, n14, n15){};
Processing.prototype.popMatrix = function(){};
Processing.prototype.printMatrix = function(){};
Processing.prototype.pushMatrix = function(){};
Processing.prototype.resetMatrix = function(){};
Processing.prototype.rotate = function(angle){};
Processing.prototype.rotateX = function(angle){};
Processing.prototype.rotateY = function(angle){};
Processing.prototype.rotateZ = function(angle){};

Processing.prototype.scale = function(size){};
Processing.prototype.scale = function(x, y){};
Processing.prototype.scale = function(x, y, z){};

Processing.prototype.translate = function(x, y){};
Processing.prototype.translate = function(x, y, z){};

// Lights, Camera Ligths
Processing.prototype.ambientLight = function(v1, v2, v3){};
Processing.prototype.ambientLight = function(v1, v2, v3, x, y, z){};
Processing.prototype.directionalLight = function(v1, v2, v3, nx, ny, nz){};
Processing.prototype.lightFalloff = function(constant, linear, quadratic){};
Processing.prototype.lightSpecular = function(v1, v2, v3){};
Processing.prototype.lights = function(){};
Processing.prototype.noLights = function(){};
Processing.prototype.pointLight = function(v1, v2, v3, nx, ny, nz){};
Processing.prototype.spotLight = function(v1, v2, v3, nx, ny, nz, angle, concentration){};
Processing.prototype.normal = function(nx, ny, nz){};

// Lights, Camera Camera
Processing.prototype.beginCamera = function(){};
Processing.prototype.camera = function(){};
Processing.prototype.camera = function(eyeX, eyeY, eyeZ,centerX, centerY, centerZ, upX, upY, upZ){};
Processing.prototype.endCamera = function(){};
Processing.prototype.frustum = function(left, right, bottom,top, near, far){};
Processing.prototype.ortho = function(){};
Processing.prototype.ortho = function(left, right, bottom,top, near, far){};
Processing.prototype.perspective = function(){};
Processing.prototype.perspective = function(fov, aspect, zNear,zFar){};
Processing.prototype.printCamera = function(){};
Processing.prototype.printProjection = function(){};

// Lights, Camera Coordinates
Processing.prototype.modelX = function(x, y, z){};
Processing.prototype.modelY = function(x, y, z){};
Processing.prototype.modelZ = function(x, y, z){};

Processing.prototype.screenX = function(x, y, z){};
Processing.prototype.screenY = function(x, y, z){};
Processing.prototype.screenZ = function(x, y, z){};

// Lights, Camera Material Properties
Processing.prototype.ambient = function(arg){};
Processing.prototype.ambient = function(v1, v2, v3){};

Processing.prototype.emissive = function(arg){};
Processing.prototype.emissive = function(v1, v2, v3){};

Processing.prototype.shininess = function(shine){};

Processing.prototype.specular = function(arg){};
Processing.prototype.specular = function(v1, v2, v3){};


// Conversion
Processing.prototype.binary = function(value){};
Processing.prototype.binary = function(value, digits){};
Processing.prototype.hex = function(value){};
Processing.prototype.hex = function(value, digits){};
Processing.prototype.unbinary = function(str){};
Processing.prototype.unhex = function(str){};


// Unofficial
Processing.prototype.shearX = function(angle){};
Processing.prototype.shearY = function(angle){};
Processing.prototype.randomGaussian = function(){};
