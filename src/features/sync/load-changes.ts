import { applyAction, applySerializedActionAndSyncNewModelIds, applySerializedActionAndTrackNewModelIds, deserializeActionCall, isModel, Patch, resolvePath, SerializedActionCallWithModelIdOverrides, WritablePath, } from "mobx-keystone";
import { isObject } from "mobx/dist/internal";
import { eventLog } from "./event-log";

export interface Loader {
  collectionName: string;
  onSubscribe: (onSubscribeListener: (args: { version: number, event: SerializedActionCallWithModelIdOverrides }) => void) => void;
}

const OP_MAP = {
  create: "add",
  update: "replace",
  delete: "remove",
};

export const loadChanges = (subtreeRoot: object, loader: Loader) => {
  loader.onSubscribe(({ version, event }) => {



    console.log({ version, event });

    if (version === eventLog.version) {
      const deserializedAction = deserializeActionCall(event);
      event.modelIdOverrides
      applyAction(subtreeRoot, deserializedAction);
      applySerializedActionAndSyncNewModelIds(subtreeRoot, event);
      const x = applySerializedActionAndTrackNewModelIds(subtreeRoot, event);
      // x.serializedActionCall.
    }
  });
};

// function scanPatchesForModelIdChanges(root: object, modelIdOverrides: Patch[], patches: Patch[]) {
//   const len = patches.length
//   for (let i = 0; i < len; i++) {
//     const patch = patches[i]
//     if (patch.op === "replace" || patch.op === "add") {
//       deepScanValueForModelIdChanges(
//         root,
//         modelIdOverrides,
//         patch.value,
//         patch.path as WritablePath
//       )
//     }
//   }
// }

// function deepScanValueForModelIdChanges(
//   root: object,
//   modelIdOverrides: Patch[],
//   value: any,
//   path: WritablePath
// ) {
//   if (path.length >= 1 && typeof value === "string") {
//     // ensure the parent is an actual model
//     const parent = resolvePath(root, path.slice(0, path.length - 1)).value

//     if (isModel(parent)) {
//       const propertyName = path[path.length - 1]
//       if (propertyName === getModelIdPropertyName(parent.constructor as any)) {
//         // found one
//         modelIdOverrides.push({
//           op: "replace",
//           path: path.slice(),
//           value: value,
//         })
//       }
//     }
//   } else if (Array.isArray(value)) {
//     const len = value.length
//     for (let i = 0; i < len; i++) {
//       path.push(i)
//       deepScanValueForModelIdChanges(root, modelIdOverrides, value[i], path)
//       path.pop()
//     }
//   } else if (isObject(value)) {
//     // skip frozen values
//     if (!value[frozenKey]) {
//       const keys = Object.keys(value)
//       const len = keys.length
//       for (let i = 0; i < len; i++) {
//         const propName = keys[i]
//         const propValue = value[propName]

//         path.push(propName)
//         deepScanValueForModelIdChanges(root, modelIdOverrides, propValue, path)
//         path.pop()
//       }
//     }
//   }
// }

// /**
//  * Returns the associated metadata for a model instance or class.
//  *
//  * @param modelClassOrInstance Model class or instance.
//  * @returns The associated metadata.
//  */
// export function getModelMetadata(
//   modelClassOrInstance: AnyModel | ModelClass<AnyModel>
// ): ModelMetadata {
//   if (isModel(modelClassOrInstance)) {
//     return (modelClassOrInstance as any).constructor[modelMetadataSymbol]
//   } else if (isModelClass(modelClassOrInstance)) {
//     return (modelClassOrInstance as any)[modelMetadataSymbol]
//   } else {
//     throw failure(`modelClassOrInstance must be a model class or instance`)
//   }
// }

// const modelIdPropertyNameCache = new WeakMap<object, string | undefined>()

// /**
//  * @internal
//  */
// export function getModelIdPropertyName(modelClass: ModelClass<AnyModel>): string | undefined {
//   return getOrCreate(
//     modelIdPropertyNameCache,
//     modelClass,
//     () => getModelMetadata(modelClass).modelIdProperty
//   )
// }