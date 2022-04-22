# gltf-loader

A comprehensive Webpack loader for glTF files.

![v5](https://img.shields.io/badge/Webpack-v5-8DD6F9?logo=webpack)
![v2.0](https://img.shields.io/badge/glTF-2.0-87C540?logo=gltf)

## Rationale

> TL;DR: I wanted my glTF assets loaded the same as all my other image assets. :upside_down_face:

By design, glTF files are comprised of multiple assets representing the various components of a 3D scene. Typically, these files contain external references to **binary** files for geometries and animations, and **image** files for textures.

When using a module bundler such as Webpack, [image assets](https://webpack.js.org/guides/asset-modules/#resource-assets) can be optimized, versioned, and then referenced in JavaScript by importing them directly. However, if you're using something like [Three.js](https://threejs.org/) to import glTF files, its assets are requested during runtime and thus won't have any of the optimizations or versioning applied to them in the way they would if they were handled by Webpack.

This loader fixes that problem by iterating through glTF JSON data and loading its assets automatically, replacing any `uri` references with the asset's final output URI.

You can read more about the glTF 2.0 specification [here](https://www.khronos.org/registry/glTF/specs/2.0/glTF-2.0.html).

## Installation

```bash
npm install gltf-loader
```

## Configuration

> All loader options are typed, documented, and available in the declaration file [here](index.d.ts).

**`webpack.config.js`**

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(gltf)$/,
        loader: "gltf-loader",
        /**
         * @type {import("gltf-loader").GLTFLoaderOptions}
         */
        options: {
          // ...
        },
      },
      {
        test: /\.(bin|png|jpe?g)$/,
        type: "asset/resource",
      },
    ],
  },
};
```

### As a path

By default, the loader injects the glTF file path during import. This is especially useful when using [Three.js](https://threejs.org/):

```js
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import myModel from "../assets/my-model.gltf"; // e.g. /dist/static/media/my-model.a1b2c3d4.gltf

const loader = new GLTFLoader();
loader.load(myModel, (gltf) => {
  // ...
});
```

### As JSON data

Alternatively, you can set the loader option `inline: true` if you wish to import the raw JSON data instead:

```js
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import myModel from "../assets/my-model.gltf"; // JSON data

const loader = new GLTFLoader();
loader.parse(JSON.stringify(myModel), window.location.origin + "/", (gltf) => {
  // ...
});
```

### TypeScript

For TypeScript users, adding the following module declaration will fix any `"cannot find module"` errors:

**`modules.d.ts`**

```ts
declare module "*.gltf" {
  const content: string;
  export default content;
}
```

> Note that if you supply the `inline: true` config option, you would want to change the above declaration to something like the following:
>
> ```ts
> declare module "*.gltf" {
>   const content: Record<string, unknown>; // Or a glTF interface if you have/need one
>   export default content;
> }
> ```

**`tsconfig.json`**

```diff
  {
    "compilerOptions": {
      // ...
    }.
    "include": [
+     "modules.d.ts",
      "foo.d.ts",
      "bar.d.ts
    ],
    "exclude": []
  }
```
