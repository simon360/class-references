import { getClassReferences, setClassReferences } from "./element";
import {
  newObjectWithoutReferenceToToken,
  newObjectWithReferenceToClass
} from "./referenceObject";

/**
 * Add {className} to {el}, if it wasn't previously added, and return a unique
 * token for the transaction.
 *
 * @param el the element to add a class to
 * @param className the class to add
 */
export const requestTokenForClass = (el: HTMLElement, className: string) => {
  const newReferences = newObjectWithReferenceToClass(
    getClassReferences(el),
    className
  );

  el.classList.add(className);
  setClassReferences(el, newReferences);

  return newReferences.lastToken;
};

/**
 * Release a previously claimed token. Removes the associated class name if all
 * the tokens have been released.
 *
 * @param el the element to release a reference on
 * @param token the token to release
 */
export const releaseToken = (el: HTMLElement, token: number) => {
  const newReferences = newObjectWithoutReferenceToToken(
    getClassReferences(el),
    token
  );

  // `newObjectWithoutReferenceToId` won't immediately remove empty lists
  // from `classes`.
  const removable = Object.entries(newReferences.classes)
    .filter(([_, values]) => values.length === 0)
    .map(([key]) => key);

  el.classList.remove(...removable);
  setClassReferences(el, newReferences);
};
