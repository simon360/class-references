import { getClassReferences, setClassReferences } from "./element";
import {
  newObjectWithoutReferenceToId,
  newObjectWithReferenceToClass
} from "./referenceObject";

/**
 * Add {className} to {el}, if it wasn't previously added, and return a unique
 * token for the transaction.
 *
 * @param el the element to add a class to
 * @param className the class to add
 */
export const claimForClass = (el: HTMLElement, className: string) => {
  const newReferences = newObjectWithReferenceToClass(
    getClassReferences(el),
    className
  );

  el.classList.add(className);
  setClassReferences(el, newReferences);

  return newReferences.lastToken;
};

/**
 *
 * @param el the element to release a reference on
 * @param token the token to release
 */
export const release = (el: HTMLElement, token: number) => {
  const newReferences = newObjectWithoutReferenceToId(
    getClassReferences(el),
    token
  );

  // `newObjectWithoutReferenceToId` won't immediately remove empty lists
  // from `classes`.
  for (const className of Object.keys(
    Object.entries(newReferences.classes)
      .filter(([_, values]) => values.length === 0)
      .map(([key]) => key)
  )) {
    el.classList.remove(className);
  }

  setClassReferences(el, newReferences);
};
