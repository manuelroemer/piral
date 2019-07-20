import { VirtualPackager } from './VirtualPackager';

export function modifyBundlerForPiral(proto: any) {
  const name = '/lib/shared-dependencies.js';
  const ra = proto.getLoadedAsset;
  proto.getLoadedAsset = function(path: string) {
    if (path.endsWith(name)) {
      path = `/shared-dependencies.vm`;
    }

    return ra.call(this, path);
  };
}

export function extendBundlerForPiral(bundler: any) {
  bundler.parser.registerExtension('vm', require.resolve('./SharedDependenciesAsset'));
  bundler.packagers.add('vm', VirtualPackager);
}
