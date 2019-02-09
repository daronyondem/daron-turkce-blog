'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BackgroundImage = function () {
  function BackgroundImage() {
    _classCallCheck(this, BackgroundImage);

    this.uniforms = {
      resolution: {
        type: 'v2',
        value: new THREE.Vector2(window.innerWidth, window.innerHeight)
      },
      imageResolution: {
        type: 'v2',
        value: new THREE.Vector2(2048, 1356)
      },
      texture: {
        type: 't',
        value: null
      }
    };
    this.obj = null;
  }

  BackgroundImage.prototype.init = function init(src, callback) {
    var _this = this;

    var loader = new THREE.TextureLoader();
    loader.crossOrigin = '*';
    loader.load(src, function (tex) {
      tex.magFilter = THREE.NearestFilter;
      tex.minFilter = THREE.NearestFilter;
      _this.uniforms.texture.value = tex;
      _this.obj = _this.createObj();
      callback();
    });
  };

  BackgroundImage.prototype.createObj = function createObj() {
    return new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: 'attribute vec3 position;\n          attribute vec2 uv;\n\n          varying vec2 vUv;\n\n          void main(void) {\n            vUv = uv;\n            gl_Position = vec4(position, 1.0);\n          }\n        ',
      fragmentShader: 'precision highp float;\n\n          uniform vec2 resolution;\n          uniform vec2 imageResolution;\n          uniform sampler2D texture;\n\n          varying vec2 vUv;\n\n          void main(void) {\n            vec2 ratio = vec2(\n                min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0),\n                min((resolution.y / resolution.x) / (imageResolution.y / imageResolution.x), 1.0)\n              );\n\n            vec2 uv = vec2(\n                vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,\n                vUv.y * ratio.y + (1.0 - ratio.y) * 0.5\n              );\n            gl_FragColor = texture2D(texture, uv);\n          }\n        '
    }));
  };

  BackgroundImage.prototype.resize = function resize() {
    this.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
  };

  return BackgroundImage;
}();

var PostEffect = function () {
  function PostEffect(texture) {
    _classCallCheck(this, PostEffect);

    this.uniforms = {
      time: {
        type: 'f',
        value: 0
      },
      resolution: {
        type: 'v2',
        value: new THREE.Vector2(window.innerWidth, window.innerHeight)
      },
      texture: {
        type: 't',
        value: texture
      }
    };
    this.obj = this.createObj();
  }

  PostEffect.prototype.createObj = function createObj() {
    return new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: 'attribute vec3 position;\n          attribute vec2 uv;\n          \n          varying vec2 vUv;\n          \n          void main() {\n            vUv = uv;\n            gl_Position = vec4(position, 1.0);\n          }\n        ',
      fragmentShader: 'precision highp float;\n        \n          uniform float time;\n          uniform vec2 resolution;\n          uniform sampler2D texture;\n          \n          varying vec2 vUv;\n          \n          float random(vec2 c){\n            return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);\n          }\n\n          //\n          // Description : Array and textureless GLSL 2D/3D/4D simplex\n          //               noise functions.\n          //      Author : Ian McEwan, Ashima Arts.\n          //  Maintainer : ijm\n          //     Lastmod : 20110822 (ijm)\n          //     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n          //               Distributed under the MIT License. See LICENSE file.\n          //               https://github.com/ashima/webgl-noise\n          //\n\n          vec3 mod289(vec3 x) {\n            return x - floor(x * (1.0 / 289.0)) * 289.0;\n          }\n\n          vec4 mod289(vec4 x) {\n            return x - floor(x * (1.0 / 289.0)) * 289.0;\n          }\n\n          vec4 permute(vec4 x) {\n               return mod289(((x*34.0)+1.0)*x);\n          }\n\n          vec4 taylorInvSqrt(vec4 r)\n          {\n            return 1.79284291400159 - 0.85373472095314 * r;\n          }\n\n          float snoise3(vec3 v)\n            {\n            const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n            const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n          // First corner\n            vec3 i  = floor(v + dot(v, C.yyy) );\n            vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n          // Other corners\n            vec3 g = step(x0.yzx, x0.xyz);\n            vec3 l = 1.0 - g;\n            vec3 i1 = min( g.xyz, l.zxy );\n            vec3 i2 = max( g.xyz, l.zxy );\n\n            //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n            //   x1 = x0 - i1  + 1.0 * C.xxx;\n            //   x2 = x0 - i2  + 2.0 * C.xxx;\n            //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n            vec3 x1 = x0 - i1 + C.xxx;\n            vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n            vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n          // Permutations\n            i = mod289(i);\n            vec4 p = permute( permute( permute(\n                       i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n                     + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n                     + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n          // Gradients: 7x7 points over a square, mapped onto an octahedron.\n          // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n            float n_ = 0.142857142857; // 1.0/7.0\n            vec3  ns = n_ * D.wyz - D.xzx;\n\n            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n            vec4 x_ = floor(j * ns.z);\n            vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n            vec4 x = x_ *ns.x + ns.yyyy;\n            vec4 y = y_ *ns.x + ns.yyyy;\n            vec4 h = 1.0 - abs(x) - abs(y);\n\n            vec4 b0 = vec4( x.xy, y.xy );\n            vec4 b1 = vec4( x.zw, y.zw );\n\n            //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n            //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n            vec4 s0 = floor(b0)*2.0 + 1.0;\n            vec4 s1 = floor(b1)*2.0 + 1.0;\n            vec4 sh = -step(h, vec4(0.0));\n\n            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n            vec3 p0 = vec3(a0.xy,h.x);\n            vec3 p1 = vec3(a0.zw,h.y);\n            vec3 p2 = vec3(a1.xy,h.z);\n            vec3 p3 = vec3(a1.zw,h.w);\n\n          //Normalise gradients\n            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n            p0 *= norm.x;\n            p1 *= norm.y;\n            p2 *= norm.z;\n            p3 *= norm.w;\n\n          // Mix final noise value\n            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n            m = m * m;\n            return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                          dot(p2,x2), dot(p3,x3) ) );\n            }\n                    \n          const float interval = 3.0;\n          \n          void main(void){\n            float strength = smoothstep(interval * 0.5, interval, interval - mod(time, interval));\n            vec2 shake = vec2(strength * 8.0 + 0.5) * vec2(\n              random(vec2(time)) * 2.0 - 1.0,\n              random(vec2(time * 2.0)) * 2.0 - 1.0\n            ) / resolution;\n          \n            float y = vUv.y * resolution.y;\n            float rgbWave = (\n                snoise3(vec3(0.0, y * 0.01, time * 400.0)) * (2.0 + strength * 32.0)\n                * snoise3(vec3(0.0, y * 0.02, time * 200.0)) * (1.0 + strength * 4.0)\n                + step(0.9995, sin(y * 0.005 + time * 1.6)) * 12.0\n                + step(0.9999, sin(y * 0.005 + time * 2.0)) * -18.0\n              ) / resolution.x;\n            float rgbDiff = (6.0 + sin(time * 500.0 + vUv.y * 40.0) * (20.0 * strength + 1.0)) / resolution.x;\n            float rgbUvX = vUv.x + rgbWave;\n            float r = texture2D(texture, vec2(rgbUvX + rgbDiff, vUv.y) + shake).r;\n            float g = texture2D(texture, vec2(rgbUvX, vUv.y) + shake).g;\n            float b = texture2D(texture, vec2(rgbUvX - rgbDiff, vUv.y) + shake).b;\n          \n            float whiteNoise = (random(vUv + mod(time, 10.0)) * 2.0 - 1.0) * (0.15 + strength * 0.15);\n          \n            float bnTime = floor(time * 20.0) * 200.0;\n            float noiseX = step((snoise3(vec3(0.0, vUv.x * 3.0, bnTime)) + 1.0) / 2.0, 0.12 + strength * 0.3);\n            float noiseY = step((snoise3(vec3(0.0, vUv.y * 3.0, bnTime)) + 1.0) / 2.0, 0.12 + strength * 0.3);\n            float bnMask = noiseX * noiseY;\n            float bnUvX = vUv.x + sin(bnTime) * 0.2 + rgbWave;\n            float bnR = texture2D(texture, vec2(bnUvX + rgbDiff, vUv.y)).r * bnMask;\n            float bnG = texture2D(texture, vec2(bnUvX, vUv.y)).g * bnMask;\n            float bnB = texture2D(texture, vec2(bnUvX - rgbDiff, vUv.y)).b * bnMask;\n            vec4 blockNoise = vec4(bnR, bnG, bnB, 1.0);\n          \n            float bnTime2 = floor(time * 25.0) * 300.0;\n            float noiseX2 = step((snoise3(vec3(0.0, vUv.x * 2.0, bnTime2)) + 1.0) / 2.0, 0.12 + strength * 0.5);\n            float noiseY2 = step((snoise3(vec3(0.0, vUv.y * 8.0, bnTime2)) + 1.0) / 2.0, 0.12 + strength * 0.3);\n            float bnMask2 = noiseX2 * noiseY2;\n            float bnR2 = texture2D(texture, vec2(bnUvX + rgbDiff, vUv.y)).r * bnMask2;\n            float bnG2 = texture2D(texture, vec2(bnUvX, vUv.y)).g * bnMask2;\n            float bnB2 = texture2D(texture, vec2(bnUvX - rgbDiff, vUv.y)).b * bnMask2;\n            vec4 blockNoise2 = vec4(bnR2, bnG2, bnB2, 1.0);\n          \n            float waveNoise = (sin(vUv.y * 1200.0) + 1.0) / 2.0 * (0.15 + strength * 0.2);\n          \n            gl_FragColor = vec4(r, g, b, 1.0) * (1.0 - bnMask - bnMask2) + (whiteNoise + blockNoise + blockNoise2 - waveNoise);\n          }\n        '
    }));
  };

  PostEffect.prototype.render = function render(time) {
    this.uniforms.time.value += time;
  };

  PostEffect.prototype.resize = function resize() {
    this.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
  };

  return PostEffect;
}();

var ConsoleSignature = function () {
  function ConsoleSignature() {
    _classCallCheck(this, ConsoleSignature);

    this.show();
  }

  ConsoleSignature.prototype.show = function show() {
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
      var args = ['\n%c ' + this.message + ' %c%c ' + this.url + ' \n\n', 'color: #fff; background: #222; padding:3px 0;', 'padding:3px 1px;', 'color: #fff; background: #47c; padding:3px 0;'];
      console.log.apply(console, args);
    } else if (window.console) {
      console.log(this.message + ' ' + this.url);
    }
  };

  return ConsoleSignature;
}();

var debounce = function debounce(callback, duration) {
  var timer;
  return function (event) {
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback(event);
    }, duration);
  };
};

var canvas = document.getElementById('canvas-webgl');
var renderer = new THREE.WebGLRenderer({
  antialias: false,
  canvas: canvas
});
var renderBack1 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
var scene = new THREE.Scene();
var sceneBack = new THREE.Scene();
var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
var cameraBack = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
var clock = new THREE.Clock();

//
// process for this sketch.
//

var bgImg = new BackgroundImage();
var postEffect = new PostEffect(renderBack1.texture);
var consoleSignature = new ConsoleSignature();

//
// common process
//
var resizeWindow = function resizeWindow() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cameraBack.aspect = window.innerWidth / window.innerHeight;
  cameraBack.updateProjectionMatrix();
  bgImg.resize();
  postEffect.resize();
  renderBack1.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(window.innerWidth, window.innerHeight);
};
var render = function render() {
  var time = clock.getDelta();
  renderer.render(sceneBack, cameraBack, renderBack1);
  postEffect.render(time);
  renderer.render(scene, camera);
};
var renderLoop = function renderLoop() {
  render();
  requestAnimationFrame(renderLoop);
};

var on = function on() {
  window.addEventListener('resize', debounce(function () {
    resizeWindow();
  }), 1000);
};

var init = function init() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x111111, 1.0);
  cameraBack.position.set(0, 0, 100);
  cameraBack.lookAt(new THREE.Vector3());

  bgImg.init('http://artsoundgroup.com/html/diamond/html/countdown/dark/assets/img/bg5.jpg', function () {
    sceneBack.add(bgImg.obj);
    scene.add(postEffect.obj);
  });

  on();
  resizeWindow();
  renderLoop();
};
init();