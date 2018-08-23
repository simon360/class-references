interface IClassTokenList {
  [propName: string]: number[];
}

type ClassTokenListEntry = [string, number[]];

/**
 * The data structure that is used to store and check references.
 */
export interface IReferenceObject {
  readonly lastToken: number;
  readonly classes: IClassTokenList;
}

/**
 * Create an empty reference object.
 */
export const newObject = (): IReferenceObject => ({
  classes: {},
  lastToken: 0
});

/**
 * Create a new reference object by removing the id from the provided reference
 * object.
 *
 * @param obj a previous reference object
 * @param id the reference id that needs removing
 */
export const newObjectWithoutReferenceToId = (
  obj: IReferenceObject,
  id: number
): IReferenceObject => ({
  classes: {
    ...(Object.entries(obj) as ClassTokenListEntry[])
      // Remove old, empty references.
      .filter(([_, values]) => values.length > 0)
      // Remove the requested id.
      .map(
        ([key, values]): ClassTokenListEntry => [
          key,
          values.filter(v => v !== id)
        ]
      )
      // Convert back to object from entries
      .reduce(
        (acc, [key, val]) => ({
          ...acc,
          [key]: val
        }),
        {}
      )
  },
  lastToken: obj.lastToken || 0
});

/**
 * Create a new reference object by:
 * 1. generating and adding a new token for the provided class name, to
 *    the provided reference object.
 * 2. saving the new token as lastToken
 *
 * @param obj a previous reference object
 * @param className the class name to claim a reference for
 */
export const newObjectWithReferenceToClass = (
  obj: IReferenceObject,
  className: string
): IReferenceObject => ({
  classes: {
    ...obj.classes,
    [className]: [...(obj.classes[className] || []), obj.lastToken + 1]
  },
  lastToken: obj.lastToken + 1
});
