import type { LoaderDefinitionFunction } from "webpack";

export interface GLTFLoaderOptions {
  /**
   * A Boolean value indicating what to export. If `true`, the glTF data itself will be exported;
   * if `false`, the asset URL will be exported instead. The default value is `false`.
   */
  inline?: boolean;
  /**
   * A Boolean value indicating whether to use paths relative to the glTF file when replacing its asset URIs.
   * The default value is `true`.
   */
  useRelativePaths?: boolean;
  /**
   * A function used to derive the asset's URI from its imported module.
   *
   * Typically, this should just return the given module's default value, as Webpack
   * exports the output file path itself when importing an `asset/resource` type — however,
   * for custom loaders that return something more complex (e.g. `next-image-loader`),
   * you'll need to provide a way to derive this value.
   *
   * @see https://webpack.js.org/guides/asset-modules/#resource-assets
   */
  uriResolver?: (module: unknown) => string;
  /**
   * The file name to use for the output. May contain tokens for interpolation.
   * The default value is `[name].[hash:8].[ext]`
   */
  fileName?: string;
  /**
   * The URL path (relative to `publicPath`) under which assets should be output. The default is `/static/media`
   */
  filePath?: string;
  /**
   * The base path of the output files' URL address when referenced in a browser. The default value is whatever the value of `outputOptions.publicPath` is.
   */
  publicPath?: string;
  /**
   * The source directory where the glTF assets live. The default value is set to `this.context`,
   * meaning the assets share the same directory as the glTF file itself.
   *
   * @see https://webpack.js.org/api/loaders/#thiscontext
   */
  context?: string;
}

export type GLTFLoaderDefinition = LoaderDefinitionFunction<GLTFLoaderOptions>;

export const gltfLoader: GLTFLoaderDefinition;

export = gltfLoader;
